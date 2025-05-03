import { DefaultRawDatum, PieTooltipProps } from "@hospitality/hospitality-charts";
import {
  formatCurrency,
  formatDateStringToFormat,
  getDayDifferenceFromNow,
  getSentenceCase,
  groupBy,
  LocationsProductsGroupedByExpirationType,
  PurchasesPerFrequencyType,
  Spinner,
  useList,
  useStatistics,
} from "@hospitality/hospitality-ui";
import { LineSeries, Point } from "@nivo/line";
import { lazy, ReactNode, Suspense } from "react";

const BarChart = lazy(() =>
  import("@hospitality/hospitality-charts").then((c) => ({
    default: c.BarChart,
  }))
);
const LineChart = lazy(() =>
  import("@hospitality/hospitality-charts").then((c) => ({
    default: c.LineChart,
  }))
);
const PieChart = lazy(() =>
  import("@hospitality/hospitality-charts").then((c) => ({
    default: c.PieChart,
  }))
);

type ProductExpiry = {
  productId: string;
  title: string;
  count: number;
  isAboutToExpireCount: number;
  isExpiredCount: number;
};

const theme = {
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
    wrapper: {
      display: "none",
    },
    container: {
      display: "none",
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

function ChartWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full rounded-md bg-white shadow">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        }>
        {children}
      </Suspense>
    </div>
  );
}

// #region ProductExpiryChart

function ProductExpiryChart() {
  const productNames: Record<string, string> = {};
  const { data = [] } = useList<LocationsProductsGroupedByExpirationType & { title: string }, ProductExpiry>(
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
        }, [] as ProductExpiry[]);
      },
    }
  );
  return (
    <div className="lg:col-span-12 lg:row-span-6">
      <ChartWrapper>
        {/* @ts-expect-error generics with lazy */}
        <BarChart<ProductExpiry>
          animate
          axisBottom={{ legend: "Product", legendOffset: -20, format: (value) => productNames[value] }}
          colorBy="index"
          colors={({ id }) => {
            if (id === "isExpiredCount") return "#ef5350";
            if (id === "isAboutToExpireCount") return "#ffca28";
            if (id === "count") return "#66bb6a";
            return "gray";
          }}
          data={data}
          defs={[
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "isAboutToExpireCount",
              },
              id: "lines",
            },
          ]}
          indexBy="productId"
          indexScale={{ type: "band", round: true }}
          keys={["count", "isAboutToExpireCount", "isExpiredCount"]}
          layout="vertical"
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
          margin={{ top: 10, right: 130, bottom: 45, left: 60 }}
          padding={0.2}
          theme={theme}
          title="Inventory stock"
          tooltip={() => null}
          tooltipLabel={({ id }) => `${getSentenceCase(id.toString())}`}
        />
      </ChartWrapper>
    </div>
  );
}
// #endregion ProductExpiryChart

// #region Spending
function SpendingChartTooltip({ point }: { point: Point<LineSeries> }) {
  return (
    <div className="rounded-md border border-gray-300 bg-white p-2 shadow">
      <strong>Date:</strong> {point.data.xFormatted}
      <br />
      <strong>Total:</strong> {formatCurrency(Number(point.data.yFormatted))}
    </div>
  );
}
function SpendingChart() {
  const { data: stats = [] } = useStatistics<PurchasesPerFrequencyType>({ type: "purchases", frequency: "month" });
  let max = 0;
  const formatted = stats.reduce(
    (prev, curr) => {
      if (curr.total > max) max = curr.total;
      prev.data.push({
        x: formatDateStringToFormat(curr.purchasedAt),
        y: curr.total,
      });

      return prev;
    },
    { id: "spending", data: [] } as { id: string; data: { x: string; y: number }[] }
  );

  return (
    <div className="row-span-6 lg:col-span-5">
      <ChartWrapper>
        <LineChart
          axisLeft={{
            legend: "RSD",
            legendOffset: -60,
            legendPosition: "middle",
            style: {
              legend: {
                text: {
                  fontWeight: 600,
                  fontSize: 18,
                },
              },
            },
          }}
          data={[formatted]}
          margin={{ right: 30, left: 80, bottom: 40, top: 5 }}
          pointSize={10}
          theme={{
            tooltip: {
              container: { borderRadius: "6px", border: "gray solid 1px" },
              basic: { fontSize: 10, maxWidth: 150, textWrap: "wrap" },
            },
          }}
          title="Spending (last 30 days)"
          tooltip={SpendingChartTooltip}
          xScale={{ type: "point" }}
          yFormat=">.2f"
          yScale={{
            type: "linear",
            min: 0,
            max: max + 4000,
            stacked: false,
            reverse: false,
          }}
        />
      </ChartWrapper>
    </div>
  );
}
// #endregion Spending

// #region Category_breakdown
function CategoryTooltip(props: PieTooltipProps<DefaultRawDatum>) {
  return (
    <div className="rounded-md border border-gray-300 bg-white p-2 shadow">
      <strong>{props.datum.label}:</strong> {formatCurrency(Number(props.datum.value))}
    </div>
  );
}

function CategoryBreakdownChart() {
  const { data: stats = [] } = useStatistics<{ title: string; total: number }, { id: string; label: string; value: number }>(
    { type: "purchases", frequency: "month" },
    { urlSuffix: "suppliers", select: (data) => data.map((item) => ({ id: item.title, label: item.title, value: item.total })) }
  );
  return (
    <div className="lg:col-span-7 lg:row-span-6">
      <ChartWrapper>
        <PieChart
          arcLabel={({ id }) => id.toString()}
          arcLabelsRadiusOffset={0.5}
          arcLabelsSkipAngle={10}
          arcLinkLabel={({ data }) => formatCurrency(data.value)}
          arcLinkLabelsDiagonalLength={0}
          colors={{ scheme: "nivo" }}
          data={stats}
          margin={{ top: 40, bottom: 55 }}
          theme={{ labels: { text: { fontSize: 14, fontWeight: 600 } } }}
          title="Spending (per store, last 30 days)"
          tooltip={CategoryTooltip}
        />
      </ChartWrapper>
    </div>
  );
}
// #endregion Category_breakdown

export function Dashboard() {
  return (
    <div className="grid h-full w-full grid-cols-1 gap-2 overflow-x-hidden py-2 lg:grid-cols-12 lg:grid-rows-12">
      <ProductExpiryChart />
      <SpendingChart />
      <CategoryBreakdownChart />
    </div>
  );
}
