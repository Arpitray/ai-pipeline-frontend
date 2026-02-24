export function Input({
  id,
  label,
  type = "text",
  placeholder,
  ...props
}) {
  return (
    <div className="flex flex-col gap-2 w-full group">
      {label && (
        <label
          htmlFor={id}
          className="text-[9px] uppercase tracking-[0.3em] text-celestique-dark/40 font-bold transition-all duration-500 group-focus-within:text-celestique-dark group-focus-within:translate-x-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="flex h-12 w-full border-b border-celestique-dark/10 bg-transparent px-0 py-2 text-[11px] uppercase tracking-widest text-celestique-dark placeholder:text-celestique-dark/20 focus:outline-none focus:border-celestique-dark transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
