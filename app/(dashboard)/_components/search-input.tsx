"use client";

import { Search } from "lucide-react";
import qs from "query-string";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const debouncedValue = useDebounceValue(value, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue[0],
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}
