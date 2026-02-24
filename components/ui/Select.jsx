export function Select({ id, label, options = [], ...props }) {
  return (
    <div className="flex flex-col gap-3 w-full group">
      {label && (
        <label htmlFor={id} className="text-[10px] uppercase tracking-[0.2em] text-celestique-dark/60 transition-colors group-focus-within:text-celestique-dark">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className="appearance-none w-full h-12 border-b border-celestique-taupe bg-transparent px-0 py-2 pr-8 text-sm text-celestique-dark placeholder:text-celestique-dark/30 focus:outline-none focus:border-celestique-dark transition-colors duration-300 disabled:opacity-50"
          {...props}
        >
          <option value="" className="text-celestique-dark/30">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
          <svg
            className="h-4 w-4 text-celestique-dark/60 group-hover:text-celestique-dark transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
