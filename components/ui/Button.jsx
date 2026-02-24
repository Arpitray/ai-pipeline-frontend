export function Button({
  type = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center text-[10px] uppercase tracking-[0.2em] transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-12 px-8 w-full";
  
  const variants = {
    primary: "bg-celestique-dark text-celestique-cream hover:bg-celestique-dark/90",
    outline:
      "border border-celestique-dark bg-transparent text-celestique-dark hover:bg-celestique-dark hover:text-celestique-cream",
    ghost: "hover:bg-celestique-taupe/20 text-celestique-dark",
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
