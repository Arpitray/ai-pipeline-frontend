export function Button({
  type = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 w-full";
  
  const variants = {
    primary: "bg-gray-900 text-gray shadow hover:bg-gray-900/90",
    outline:
      "border border-gray-300 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
