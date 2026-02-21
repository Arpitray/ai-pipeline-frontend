export function InputWithSuffix({ id, label, suffix, helperText, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full group">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-stone-700 transition-colors group-focus-within:text-stone-900">
          {label}
        </label>
      )}
      <div className="flex items-center shadow-sm rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-stone-900/10 border border-stone-200 focus-within:border-stone-400 bg-stone-50 focus-within:bg-white">
        <input
          id={id}
          className="flex h-14 w-full bg-transparent px-4 py-3 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none disabled:opacity-50"
          {...props}
        />
        <span className="inline-flex h-14 items-center bg-stone-100 px-4 text-sm font-semibold text-stone-600 border-l border-stone-200">
          {suffix}
        </span>
      </div>
      {helperText && <p className="text-xs text-stone-500 mt-0.5">{helperText}</p>}
    </div>
  );
}
