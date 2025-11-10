import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-blue-100 p-4">QUIZ header</div>
      {children}
      <div className="bg-blue-100 p-4">QUIZ footer</div>
    </>
  );
}
