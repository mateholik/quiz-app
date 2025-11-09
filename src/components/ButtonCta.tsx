type ButtonCtaProps = {
  handleOnClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};
export default function ButtonCta({
  children,
  handleOnClick,
  type = "button",
}: ButtonCtaProps) {
  return (
    <button
      onClick={handleOnClick}
      type={type}
      className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-[#AA00FF] font-bold text-white"
    >
      {children}
    </button>
  );
}
