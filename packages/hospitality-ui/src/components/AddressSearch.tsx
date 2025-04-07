import { useState } from "react";

import { useSearch } from "../hooks/api/searchHooks";
import { useDebounce } from "../hooks/ui/useDebounce";
import { AddressesType, ContactType, OptionType } from "../types";
import { formatAddressesForOptions } from "../utils";
import { Autocomplete } from "./Autocomplete";
type Props = {
  label?: string;
  isDisabled?: boolean;
  isAutofocused?: boolean;
  onChange: (item: OptionType<Pick<ContactType, "latitude" | "longitude" | "boundingBox">> | null) => void;
  value: string | null;
};

export function AddressSearch({ label = "Address", onChange, isDisabled, value, isAutofocused }: Props) {
  const [searchQuery, setQuery] = useState("");
  const debouncedValue = useDebounce<typeof searchQuery>(searchQuery);
  const { data = [], isFetched } = useSearch<AddressesType>(
    { model: "addresses", searchQuery: debouncedValue },
    { enabled: !!debouncedValue }
  );

  return (
    <Autocomplete
      helperText="Enter the full address e.g. Jurija Gagarina 25 / Ugrinovacka 17 Zemun"
      isAutofocused={isAutofocused}
      isDisabled={isDisabled}
      isSearch
      label={label}
      onChange={onChange}
      onQueryChange={(value) => setQuery(value)}
      options={
        isFetched && !data.length
          ? [{ label: "No results", value: "NO_RESULTS", isDisabled: true }]
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
