import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export default function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${icon ? "pl-10 pr-4" : "px-4"} py-2.5 bg-surface-light border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none text-text-primary placeholder:text-text-tertiary`}
          required={required}
        />
      </div>
    </div>
  );
}
