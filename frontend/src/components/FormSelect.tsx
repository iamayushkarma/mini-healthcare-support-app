import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

export default function FormSelect({
  id,
  name,
  label,
  value,
  onChange,
  options,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none appearance-none text-text-primary cursor-pointer hover:border-primary/50"
          style={{
            backgroundImage: "none",
          }}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-surface text-text-primary py-2"
            >
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary pointer-events-none"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
