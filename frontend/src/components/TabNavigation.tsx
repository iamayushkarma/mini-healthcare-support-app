import React from "react";

type FormType = "patient" | "volunteer" | "inquiry";

interface TabNavigationProps {
  activeTab: FormType;
  onTabChange: (tab: FormType) => void;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const tabs = [
    { id: "patient" as FormType, label: "Patient" },
    { id: "volunteer" as FormType, label: "Volunteer" },
    { id: "inquiry" as FormType, label: "General Inquiry" },
  ];

  return (
    <div className="px-6 sm:px-8 pt-6">
      <div className="flex p-1 bg-surface-light rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
              activeTab === tab.id
                ? "bg-surface text-primary shadow-sm ring-1 ring-border"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
