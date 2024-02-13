import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="grid place-items-center">
      <div>This is a screen for authenticated users only</div>
      <UserButton />
    </div>
  );
}
