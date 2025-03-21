import {
  Button,
  createColumnHelper,
  Icons,
  ProductCategoriesQuery,
  ProductsWithCount,
  Table,
  Tabs,
  useList,
  useQuery,
} from "@hospitality/hospitality-ui";
import { useState } from "react";

const columnHelper = createColumnHelper<Pick<ProductsWithCount, "id" | "title" | "count">>();

function columns() {
  return [
    columnHelper.accessor("count", { header: "Amount", cell: (info) => info.getValue(), maxSize: 100 }),
    columnHelper.accessor("title", { header: "Title", cell: (info) => info.getValue() }),

    columnHelper.display({
      id: "isActive",
      header: "",
      cell: () => (
        <div className="flex h-full items-center justify-end">
          <div className="w-28">
            {/* <Button
              label={locationsAvailableProducts?.[row.original.id] ? "Active" : "Inactive"}
              onClick={() => {
                if (locationId && !locationsAvailableProducts?.[row.original.id])
                  create({ value: { productId: row.original.id, locationId } });
                else if (locationId && locationsAvailableProducts?.[row.original.id])
                  deleteMutation(locationsAvailableProducts?.[row.original.id]);
              }}
              variant={locationsAvailableProducts?.[row.original.id] ? "success" : "secondary"}
            /> */}
          </div>
        </div>
      ),
      minSize: 50,
      size: 50,
      maxSize: 50,
    }),
  ];
}

export function ProductInventory() {
  const { data } = useQuery(ProductCategoriesQuery);
  const [active, setActive] = useState(data?.[0]?.id || "");
  const { data: products, isLoading } = useList<ProductsWithCount>(
    { model: "products", fields: ["id", "title"] },
    { enabled: !!active, urlSuffix: `category/${active}/active` }
  );
  return (
    <div className="flex flex-col gap-y-2">
      <Tabs active={active} setActive={setActive} tabs={(data || []).map((cat) => ({ id: cat.id, title: cat.title }))} />
      <div className="self-end">
        <Button
          icon={Icons.add}
          items={[
            { id: "1", title: "Manual input", icon: Icons.input },
            { id: "2", title: "Barcode input", icon: Icons.barcode },
          ]}
          label={`Add new`}
          onClick={undefined}
          variant="info"
        />
      </div>
      <Table columns={columns()} data={products || []} isLoading={isLoading} />
    </div>
  );
}
