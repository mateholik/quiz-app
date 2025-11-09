import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto space-y-4 px-4">
      <h2 className="text-2xl">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="underline" href="/">
        Return Home
      </Link>
    </div>
  );
}
