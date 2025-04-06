import { useState } from "react";

import { useSearch } from "../hooks/api/searchHooks";
import { useDebounce } from "../hooks/ui/useDebounce";
import { AddressesType } from "../types";
import { formatAddressesForOptions } from "../utils";
import { Autocomplete } from "./Autocomplete";
type Props = {
  isDisabled?: boolean;
  onChange: (value: string) => void;
  value: string | null;
};

export function AddressSearch({ onChange, isDisabled, value }: Props) {
  const [searchQuery, setQuery] = useState("");
  const debouncedValue = useDebounce<typeof searchQuery>(searchQuery);
  const { data = [], isFetched } = useSearch<AddressesType>(
    { model: "addresses", searchQuery: debouncedValue },
    { enabled: !!debouncedValue }
  );
  return (
    <Autocomplete
      isDisabled={isDisabled}
      isSearch
      label="Address"
      onChange={onChange}
      onQueryChange={(value) => setQuery(value)}
      options={
        isFetched && !data.length
          ? [{ label: "No results", value: "", isDisabled: true }]
          : formatAddressesForOptions(data).toSorted((a, b) => {
              if (a < b) return -1;
              if (a > b) return 1;
              return 0;
            })
      }
      query={searchQuery}
      value={value || ""}
    />
  );
}
