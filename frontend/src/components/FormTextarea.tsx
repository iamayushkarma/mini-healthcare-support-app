import React from "react";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  showAIBadge?: boolean;
}

export default function FormTextarea({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  showAIBadge = false,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-primary"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm outline-none resize-none text-text-primary placeholder:text-text-tertiary"
        required={required}
      />

      {showAIBadge && (
        <div className="flex items-center gap-2 mt-2 px-1">
          <div className="flex items-center gap-1.5 py-1 px-2.5 bg-primary/10 border border-primary/20 rounded-full">
            <svg
              className="w-3.5 h-3.5 text-primary"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
              AI will automatically summarize your request
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
