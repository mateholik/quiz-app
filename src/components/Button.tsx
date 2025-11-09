type ButtonProps = {
  handleOnClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
};
export default function Button({ children, handleOnClick }: ButtonProps) {
  return (
    <button
      onClick={handleOnClick}
      className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-[#AA00FF] font-bold text-white"
    >
      {children}
    </button>
  );
}
