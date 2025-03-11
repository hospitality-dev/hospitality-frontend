import { Button, createColumnHelper, Icons, ProductsCategories, Table, useLoaderData } from "@hospitality/hospitality-ui";
import { Suspense } from "react";

const columnHelper = createColumnHelper<Pick<ProductsCategories, "id" | "title">>();

const columns = [
  columnHelper.accessor("title", { header: "", cell: (info) => info.getValue() }),

  columnHelper.display({
    id: "isActive",
    header: "",
    cell: () => (
      <div className="flex justify-end">
        <div className="w-24">
          <Button label="Active" onClick={undefined} variant="success" />
        </div>
      </div>
    ),
    minSize: 50,
    size: 50,
    maxSize: 50,
  }),
];

export function ProductSettings() {
  const categories = useLoaderData({ from: "/settings/products" });
  const products: Pick<ProductsCategories, "id" | "title">[] = [
    { id: "1", title: "Chicken" },
    { id: "2", title: "Heineken" },
    { id: "3", title: "Trout" },
    { id: "4", title: "Frozen trout" },
  ];
  return (
    <Suspense fallback="Falling back to you">
      <ul className="flex flex-col gap-y-2">
        {categories?.map((category) => (
          <li className="flex flex-col">
            <Table
              key={category.id}
              action={{
                label: "Create",
                icon: Icons.add,
                onClick: () => {},
                variant: "success",
              }}
              columns={columns}
              data={products}
              isCollapsible
              isInitialOpen={false}
              title={category.title}
            />
          </li>
        ))}
      </ul>
    </Suspense>
  );
}
