export function InputWithSuffix({ id, label, suffix, ...props }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex items-center">
        <input
          id={id}
          className="flex h-12 w-full rounded-l-md border border-r-0 border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent disabled:opacity-50"
          {...props}
        />
        <span className="inline-flex h-12 items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 font-medium">
          {suffix}
        </span>
      </div>
    </div>
  );
}
