import Image from "next/image";

export function Loading() {
  return (
    <div className="h-full w-full grid place-items-center">
      <Image
        src="/logo.svg"
        alt="logo"
        width={120}
        height={120}
        className="animate-pulse"
      />
    </div>
  );
}
