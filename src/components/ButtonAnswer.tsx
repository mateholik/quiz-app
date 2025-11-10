"use client";

type ButtonAnswerProps = {
  handleOnClick?: () => void;
  children: React.ReactNode;
  selected: boolean;
  className?: string;
};
export default function ButtonAnswer({
  children,
  handleOnClick,
  selected,
  className,
}: ButtonAnswerProps) {
  return (
    <button
      onClick={handleOnClick}
      className={`flex w-full items-center justify-between rounded-lg border-2 p-4 font-semibold ${
        selected ? "border-[#AA00FF]" : "border-gray-200"
      } ${className}`}
    >
      {children}
    </button>
  );
}
