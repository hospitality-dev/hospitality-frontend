import React, { useState } from "react";

import { Input } from "./Input";

type Props = {
  label: string;
};

export function AddressSearch({ label = "Address" }: Props) {
  const [query, setQuery] = useState("");
  return <Input label={label} name="address" onChange={(e) => setQuery(e.target.value)} value={query} />;
}
