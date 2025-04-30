import {
  Button,
  createColumnHelper,
  Icons,
  LocationsAvailableProductsInitalizerType,
  ProductsCategoriesType,
  ProductsType,
  Table,
  useBarcodeScanner,
  useCreate,
  useDelete,
  useDrawer,
  useList,
  useLoaderData,
  UseMutateFunction,
  useScreenSize,
  useTable,
} from "@hospitality/hospitality-ui";
import { useState } from "react";

const columnHelper = createColumnHelper<ProductsType>();

function columns({
  create,
  deleteMutation,
}: {
  create: UseMutateFunction<
    unknown,
    unknown,
    {
      value: {
        productId: string;
      };
    },
    unknown
  >;
  deleteMutation: UseMutateFunction<unknown, Error, string, unknown>;
}) {
  return [
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => <div className="w-full truncate">{info.getValue()}</div>,
      meta: {
        alignment: "left",
      },
      minSize: 150,
    }),
    columnHelper.accessor("brandTitle", {
      header: "Brand",
      cell: (info) => info.getValue(),
      minSize: 100,
    }),
    columnHelper.accessor("manufacturerTitle", {
      header: "Manufacturer",
      cell: (info) => <div className="truncate">{info.getValue()}</div>,
      minSize: 150,
    }),
    columnHelper.display({
      id: "measure",
      header: "Measure",
      cell: ({ row: { original } }) =>
        original.volume || original.weight
          ? `${original.volume ? `${original.volume}${original.volumeUnit}` : `${original.weight}${original.weightUnit}`}`
          : null,
      maxSize: 100,
    }),

    columnHelper.accessor("availabilityId", {
      header: "",
      cell: ({ row }) => (
        <div className="flex w-28 justify-end">
          <Button
            label={row.original.availabilityId ? "Enabled" : "Disabled"}
            onClick={() => {
              if (row.original.availabilityId) deleteMutation(row.original.availabilityId);
              else create({ value: { productId: row.original.id } });
            }}
            variant={row.original.availabilityId ? "success" : "secondary"}
          />
        </div>
      ),
      meta: {
        alignment: "right",
      },
      maxSize: 125,
    }),
  ];
}

function ProductSettingsCategory({ id, title, isDefault }: Pick<ProductsCategoriesType, "id" | "title" | "isDefault">) {
  const [isOpen, setIsOpen] = useState(false);
  const { openDrawer: openProductDrawer } = useDrawer("create_products");
  const [state, dispatch] = useTable<ProductsType>();
  const { isMd } = useScreenSize();

  const { data, isPending } = useList<ProductsType>(
    {
      model: "products",
      fields: ["id", "title", "weight", "weightUnit", "volume", "volumeUnit", "brandTitle", "availabilityId"],
    },
    { enabled: isOpen, urlSuffix: `category/${id}` }
  );

  // #endregion queries

  // #region mutations
  const { mutate: create } = useCreate<LocationsAvailableProductsInitalizerType>("locations_available_products", {
    invalidateModels: ["products"],
  });
  const { mutate: deleteMutation } = useDelete("locations_available_products", { invalidateModels: ["products"] });
  // #endregion mutations
  const { setOnResult } = useBarcodeScanner();

  return (
    <li className={`flex flex-col ${isDefault ? "rounded-md border border-gray-300" : ""}`}>
      <Table
        actions={[
          {
            id: "add",
            icon: Icons.add,
            onClick: () => openProductDrawer("Create product", { categoryId: id }),
            label: "",
            variant: "info",
            tooltip: "Add product",
          },
          {
            id: "add_barcode",
            icon: Icons.barcode,
            onClick: () => {
              setOnResult((result) => {
                openProductDrawer("Create product", { barcode: result.getText() });
              });
            },

            label: "",
            tooltip: "Add product (scan barcode)",
          },
        ]}
        columnVisibility={{ manufacturerTitle: isMd }}
        columns={columns({ create, deleteMutation })}
        data={data || []}
        dispatch={dispatch}
        isCollapsible
        isInitialOpen={isOpen}
        isLoading={isPending}
        meta={state}
        onExpand={() => setIsOpen(!isOpen)}
        title={title}
        titleVariant="primary"
      />
    </li>
  );
}

export function ProductSettings() {
  const { categories: placeholderData, productCategoryFields } = useLoaderData({ from: "/settings/products" });

  const { data: categories } = useList<ProductsCategoriesType>({
    model: "products_categories",
    placeholderData,
    fields: productCategoryFields,
  });
  const { openDrawer: openProductCategoriesDrawer } = useDrawer("products_categories");
  return (
    <div className="flex flex-col gap-y-2">
      <div className="ml-auto w-fit">
        <Button
          icon={Icons.add}
          items={[
            {
              id: "1",
              title: "Create product category",
              icon: Icons.add,
              onClick: () => openProductCategoriesDrawer("Create product category"),
            },
          ]}
          label="Create"
          onClick={undefined}
          variant="info"
        />
      </div>
      <ul className="flex flex-col gap-y-2">
        {categories?.map((category) => (
          <ProductSettingsCategory key={category.id} id={category.id} isDefault={category.isDefault} title={category.title} />
        ))}
      </ul>
    </div>
  );
}
