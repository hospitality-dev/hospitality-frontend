import { FocusEventHandler, useState } from "react";

import { Icons } from "../enums";
import { useSearch } from "../hooks/api/searchHooks";
import { useDebounce } from "../hooks/ui/useDebounce";
import { AvailableSearchableEntities, OptionType } from "../types";
import { formatForOptions } from "../utils";
import { Autocomplete } from "./Autocomplete";

type Props = {
  label: string;
  model: AvailableSearchableEntities;
  onChange: (value: OptionType | null) => void;
  value: string | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onCreateNew?: ({ query, item }: { item: OptionType | null; query: string }) => void;
};

export function Search({ label, model, onChange, value, onBlur, onCreateNew }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const createNewOptions: OptionType[] = onCreateNew
    ? [{ id: "create_new", label: "Create new", value: "ACTION:CREATE_NEW", onClick: onCreateNew, icon: Icons.add }]
    : [];

  const debouncedValue = useDebounce(searchQuery, 350);

  const { data = [], isLoading } = useSearch<{ id: string; title: string }, OptionType>(
    { model, searchQuery: debouncedValue },
    {
      enabled: debouncedValue.length >= 3,
      select: (res) => createNewOptions.concat(formatForOptions(res, false)),
    }
  );
  return (
    <Autocomplete
      isLoading={isLoading}
      isSearch
      label={label}
      onBlur={onBlur}
      onChange={onChange}
      onQueryChange={setSearchQuery}
      options={data}
      placeholder="Enter at least 3 characters"
      value={value}
    />
  );
}
