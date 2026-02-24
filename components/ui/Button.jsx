export function Button({
  type = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-12 px-8 w-full";
  
  const variants = {
    primary: "bg-celestique-dark text-celestique-cream hover:bg-[#FF1E1E] shadow-lg hover:shadow-[#FF1E1E]/20",
    outline:
      "border border-celestique-dark/20 bg-transparent text-celestique-dark hover:border-celestique-dark hover:bg-celestique-dark hover:text-celestique-cream",
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
