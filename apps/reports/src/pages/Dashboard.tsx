import {
  getDayDifferenceFromNow,
  getSentenceCase,
  groupBy,
  LocationsProductsGroupedByExpirationType,
  useList,
} from "@hospitality/hospitality-ui";
import { lazy, Suspense } from "react";

const BarChart = lazy(() =>
  import("@hospitality/hospitality-charts").then((c) => ({
    default: c.BarChart,
  }))
);

type FormattedEntity = {
  productId: string;
  title: string;
  count: number;
  isAboutToExpireCount: number;
  isExpiredCount: number;
};

const theme = {
  background: "#ffffff",
  text: {
    fontSize: 24,
    fill: "#333333",
    outlineWidth: 0,
    outlineColor: "#ffffff",
  },
  axis: {
    domain: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fontSize: 12,
        fill: "#333333",
        outlineWidth: 0,
        outlineColor: "#ffffff",
      },
    },
    ticks: {
      line: {
        stroke: "#777777",
        strokeWidth: 1,
      },
      text: {
        fontSize: 18,
        fill: "#333333",
        outlineWidth: 0,
        outlineColor: "#ffffff",
      },
    },
  },
  grid: {
    line: {
      stroke: "#dddddd",
      strokeWidth: 1,
    },
  },
  legends: {
    title: {
      text: {
        fontSize: 11,
        fill: "#333333",
        outlineWidth: 0,
        outlineColor: "#ffffff",
      },
    },
    text: {
      fontSize: 14,
      fill: "#333333",
      outlineWidth: 0,
      outlineColor: "#ffffff",
    },
    ticks: {
      line: {},
      text: {
        fontSize: 10,
        fill: "#333333",
        outlineWidth: 0,
        outlineColor: "#ffffff",
      },
    },
  },
  annotations: {
    text: {
      fontSize: 13,
      fill: "#333333",
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    link: {
      stroke: "#000000",
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    outline: {
      stroke: "#000000",
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
    symbol: {
      fill: "#000000",
      outlineWidth: 2,
      outlineColor: "#ffffff",
      outlineOpacity: 1,
    },
  },
  tooltip: {
    wrapper: {},
    container: {
      background: "#ffffff",
      color: "#333333",
      fontSize: 12,
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
};

function ProductExpiryChart() {
  const productNames: Record<string, string> = {};
  const { data = [] } = useList<LocationsProductsGroupedByExpirationType & { title: string }, FormattedEntity>(
    { model: "locations_products", fields: ["expirationDate", "count"] },
    {
      urlSuffix: "grouped/expiration-date",
      staleTime: 60 * 60 * 1000,
      select: (data) => {
        const grouped = groupBy(data, "productId");

        return Object.entries(grouped).reduce((prev, curr) => {
          if (curr?.[0]) {
            const newProduct = {
              productId: curr[0],
              title: curr?.[1][0].title,
              count: 0,
              isAboutToExpireCount: 0,
              isExpiredCount: 0,
            };
            productNames[curr[0]] = newProduct.title;

            for (let index = 0; index < curr?.[1]?.length || 0; index++) {
              const product = curr[1][index];

              const differenceInDays = getDayDifferenceFromNow(curr[1][index].expirationDate);
              if (differenceInDays === null) continue;
              const isExpired = differenceInDays < 0;
              const isAboutToExpire = !isExpired && differenceInDays <= 7;
              if (isExpired) newProduct.isExpiredCount += product.count;
              else if (isAboutToExpire) newProduct.isAboutToExpireCount += product.count;
              else newProduct.count += product.count;
            }
            prev.push(newProduct);
          }
          return prev;
        }, [] as FormattedEntity[]);
      },
    }
  );
  return (
    <div className="col-span-6 row-span-4 overflow-hidden rounded-md shadow-md">
      <Suspense>
        {/* @ts-expect-error generics with lazy */}
        <BarChart<FormattedEntity>
          axisBottom={{ legend: "Product", legendOffset: -20, format: (value) => productNames[value] }}
          colors={({ id }) => {
            if (id === "isExpiredCount") return "#ef5350";
            if (id === "isAboutToExpireCount") return "#ffca28";
            if (id === "count") return "#66bb6a";
            return "gray";
          }}
          data={data}
          indexBy="productId"
          indexScale={{ type: "band", round: true }}
          keys={["count", "isAboutToExpireCount", "isExpiredCount"]}
          legends={[
            {
              dataFrom: "keys",
              anchor: "top-right",
              direction: "column",
              justify: false,
              // translateY: 30,
              itemWidth: 50,
              itemHeight: 30,
              symbolSize: 14,
              symbolShape: "circle",
              data: [
                { id: "isExpiredCount", label: "Expired", color: "#e53935" },
                { id: "isAboutToExpireCount", label: "In stock (close to expiry)", color: "#fdd835" },
                { id: "count", label: "In stock", color: "#43a047" },
              ],
            },
          ]}
          padding={0.2}
          theme={theme}
          tooltipLabel={({ id }) => `${getSentenceCase(id.toString())}`}
        />
      </Suspense>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="grid h-full w-full grid-cols-6 grid-rows-12 py-2">
      <ProductExpiryChart />
    </div>
  );
}
