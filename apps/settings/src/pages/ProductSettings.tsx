import {
  Button,
  createColumnHelper,
  Icons,
  LocationsAvailableProductsInitalizerType,
  LocationsAvailableProductsQuery,
  ProductsCategoriesType,
  ProductsType,
  Table,
  useAuth,
  useBarcodeScanner,
  useCreate,
  useDelete,
  useDrawer,
  useList,
  useLoaderData,
  UseMutateFunction,
  useQuery,
  useTable,
} from "@hospitality/hospitality-ui";
import { useState } from "react";

const columnHelper =
  createColumnHelper<Pick<ProductsType, "id" | "title" | "weight" | "weightUnit" | "volume" | "volumeUnit">>();

function columns({
  create,
  deleteMutation,
  locationId,
  locationsAvailableProducts,
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
  locationId: string | null | undefined;
  locationsAvailableProducts: Record<string, string>;
}) {
  return [
    columnHelper.accessor("title", {
      header: "",
      cell: (info) => <div className="truncate">{info.getValue()}</div>,
      maxSize: 250,
    }),
    columnHelper.display({
      id: "measure",
      header: "",
      cell: ({ row: { original } }) =>
        original.volume || original.weight
          ? `${original.volume || original.weight || ""}${original.volumeUnit || original.weightUnit || ""}`
          : null,
    }),

    columnHelper.display({
      id: "isActive",
      header: "",
      cell: ({ row }) => (
        <div className="flex h-full items-center justify-end">
          <div className="w-28">
            <Button
              label={locationsAvailableProducts?.[row.original.id] ? "Active" : "Inactive"}
              onClick={() => {
                if (locationId && !locationsAvailableProducts?.[row.original.id])
                  create({ value: { productId: row.original.id } });
                else if (locationId && locationsAvailableProducts?.[row.original.id])
                  deleteMutation(locationsAvailableProducts?.[row.original.id]);
              }}
              variant={locationsAvailableProducts?.[row.original.id] ? "success" : "secondary"}
            />
          </div>
        </div>
      ),
      maxSize: 125,
    }),
  ];
}

function ProductSettingsCategory({ id, title, isDefault }: Pick<ProductsCategoriesType, "id" | "title" | "isDefault">) {
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { openDrawer: openProductDrawer } = useDrawer("create_products");
  const [state, dispatch] = useTable<ProductsType>();

  // #region queries
  const { data } = useQuery(LocationsAvailableProductsQuery);

  const query = useList<ProductsType>(
    { model: "products", fields: ["id", "title", "weight", "weightUnit", "volume", "volumeUnit"] },
    { enabled: isOpen, urlSuffix: `category/${id}` }
  );

  // #endregion queries

  // #region mutations
  const { mutate: create } = useCreate<LocationsAvailableProductsInitalizerType>("locations_available_products", {
    invalidateModels: ["products"],
  });
  const { mutate: deleteMutation } = useDelete("locations_available_products", { invalidateModels: ["products"] });
  // #endregion mutations

  return (
    <li className={`flex flex-col ${isDefault ? "rounded-md border border-gray-300" : ""}`}>
      <Table
        action={{
          icon: Icons.add,
          onClick: () => openProductDrawer("Create product", { categoryId: id }),
          label: "",
          variant: "info",
        }}
        columns={columns({ create, locationId: auth.user?.locationId, locationsAvailableProducts: data || {}, deleteMutation })}
        data={query?.data || []}
        dispatch={dispatch}
        hasNoHeader
        isCollapsible
        isInitialOpen={isOpen}
        isLoading={query.isPending}
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
  const { setOnResult } = useBarcodeScanner();
  const { openDrawer: openProductCategoriesDrawer } = useDrawer("products_categories");
  const { openDrawer: openProductDrawer } = useDrawer("create_products");
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
            {
              id: "2",
              title: "Scan barcode",
              icon: Icons.barcode,
              onClick: () => {
                setOnResult((result) => {
                  openProductDrawer("Create product", { barcode: result.getText() });
                });
              },
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
