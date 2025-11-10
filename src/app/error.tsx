"use client";

export default function error({ error }: { error: Error }) {
  return (
    <div className="bg-red-400 p-4">
      App level error: <span className="font-semibold">{error.message}</span>
    </div>
  );
}
