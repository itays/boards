"use client";

import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

type ItemProps = {
  id: string;
  name: string;
  imageUrl: string;
};

export function Item({ id, name, imageUrl }: ItemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const handleClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <li className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffset={18}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          onClick={handleClick}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </li>
  );
}
