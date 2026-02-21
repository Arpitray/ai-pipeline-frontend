"use client";

export function Toggle({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between group">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-stone-700 transition-colors group-hover:text-stone-900 cursor-pointer" onClick={() => onChange(!checked)}>
          {label}
        </label>
      )}
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-2 ${
          checked ? "bg-stone-900" : "bg-stone-200 hover:bg-stone-300"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
