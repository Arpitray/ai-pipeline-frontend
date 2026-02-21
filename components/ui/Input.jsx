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
          className="text-sm font-semibold text-stone-700 transition-colors group-focus-within:text-stone-900"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="flex h-14 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 focus:bg-white transition-all duration-200 ease-out shadow-sm hover:border-stone-300 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
