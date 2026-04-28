type Variant = "primary" | "secondary" | "ghost";

type Props = {
  variant?: Variant;
  size?: "sm" | "md";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  children: React.ReactNode;
  className?: string;
};

const styles: Record<Variant, string> = {
  primary: "bg-green-700 text-white hover:bg-green-800 disabled:bg-green-300",
  secondary:
    "border border-green-700 text-green-700 hover:bg-green-50 disabled:opacity-40",
  ghost: "text-stone-500 hover:text-stone-700 disabled:opacity-40",
};

const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm" };

export function Button({
  variant = "primary",
  size = "md",
  disabled,
  onClick,
  type = "button",
  children,
  className = "",
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${styles[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
