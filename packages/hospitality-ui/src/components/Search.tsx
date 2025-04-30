import { FocusEventHandler, useState } from "react";

import { useSearch } from "../hooks/api/searchHooks";
import { AvailableSearchableEntities, OptionType } from "../types";
import { formatForOptions } from "../utils";
import { Autocomplete } from "./Autocomplete";

type Props = {
  label: string;
  model: AvailableSearchableEntities;
  onChange: (value: OptionType | null) => void;
  value: string | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

export function Search({ label, model, onChange, value, onBlur }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data = [] } = useSearch<{ id: string; title: string }>({ model, searchQuery }, { enabled: searchQuery.length >= 3 });

  return (
    <Autocomplete
      label={label}
      onBlur={onBlur}
      onChange={onChange}
      onQueryChange={setSearchQuery}
      options={formatForOptions(data, false)}
      placeholder="Enter at least 3 characters"
      value={value}
    />
  );
}
