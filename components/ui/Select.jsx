export function Select({ id, label, options = [], ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full group">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-stone-700 transition-colors group-focus-within:text-stone-900">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className="appearance-none w-full h-14 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 pr-10 text-base text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400 focus:bg-white transition-all duration-200 ease-out shadow-sm hover:border-stone-300 disabled:opacity-50"
          {...props}
        >
          <option value="" className="text-stone-400">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <svg
            className="h-5 w-5 text-stone-500 group-hover:text-stone-800 transition-colors"
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
