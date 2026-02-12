import React, { useState } from "react";
import TabNavigation from "./components/TabNavigation";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextarea from "./components/FormTextarea";
import { SendHorizontal, Sparkles } from "lucide-react";
import {
  URGENCY_OPTIONS,
  AVAILABILITY_OPTIONS,
  SUBJECT_OPTIONS,
  FORM_PLACEHOLDERS,
} from "./components/constants/formConfig";
import { generateSummary } from "./services/aiService";

type FormType = "patient" | "volunteer" | "inquiry";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  urgency?: string;
  availability?: string;
  skills?: string;
  subject?: string;
}

export default function App() {
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<FormType>("patient");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    description: "",
    urgency: "low",
    availability: "weekends",
    skills: "",
    subject: "general",
  });

  function parseAIResponse(text: string) {
    const summaryMatch = text.match(/Summary:\s*([\s\S]*?)Urgency:/i);

    const urgencyMatch = text.match(/Urgency:\s*([\s\S]*?)Suggested Action:/i);

    const actionMatch = text.match(/Suggested Action:\s*([\s\S]*)/i);

    return {
      summary: summaryMatch?.[1]?.trim() || "",
      urgency: urgencyMatch?.[1]?.trim() || "",
      action: actionMatch?.[1]?.trim() || "",
    };
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      type: activeTab,
      data: formData,
      summary: aiSummary,
    });
    // Add your actual submission logic here
    alert("Form submitted successfully!");
  };

  const handleSummarize = async () => {
    if (!formData.description.trim()) {
      alert("Please enter a description first!");
      return;
    }

    setLoading(true);
    try {
      const summary = await generateSummary(formData.description);
      setAiSummary(summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setAiSummary("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getDescriptionLabel = () => {
    switch (activeTab) {
      case "patient":
        return "Describe support needed";
      case "volunteer":
        return "Why do you want to volunteer?";
      case "inquiry":
        return "Your message";
    }
  };

  const getDescriptionPlaceholder = () => {
    switch (activeTab) {
      case "patient":
        return FORM_PLACEHOLDERS.patient;
      case "volunteer":
        return FORM_PLACEHOLDERS.volunteer;
      case "inquiry":
        return FORM_PLACEHOLDERS.inquiry;
    }
  };
  const parsedAI = aiSummary ? parseAIResponse(aiSummary) : null;
  console.log(aiSummary);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Decorative background elements */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          CareConnect <span className="text-primary italic">AI</span>
        </h1>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-surface rounded-xl shadow-xl shadow-slate-200/50 border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Support Request
          </h2>
          <p className="text-text-secondary text-sm">
            Please fill out the form below. Our team and AI-assisted routing
            will ensure your request reaches the right specialist quickly.
          </p>
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              id="fullName"
              name="fullName"
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={FORM_PLACEHOLDERS.fullName}
              required
            />

            <FormInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={FORM_PLACEHOLDERS.email}
              required
            />

            <FormInput
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder={FORM_PLACEHOLDERS.phone}
              required
            />

            {/* Conditional Field based on active tab */}
            {activeTab === "patient" && (
              <FormSelect
                id="urgency"
                name="urgency"
                label="Urgency Level"
                value={formData.urgency || "low"}
                onChange={handleInputChange}
                options={URGENCY_OPTIONS}
              />
            )}

            {activeTab === "volunteer" && (
              <FormSelect
                id="availability"
                name="availability"
                label="Availability"
                value={formData.availability || "weekends"}
                onChange={handleInputChange}
                options={AVAILABILITY_OPTIONS}
              />
            )}

            {activeTab === "inquiry" && (
              <FormSelect
                id="subject"
                name="subject"
                label="Subject"
                value={formData.subject || "general"}
                onChange={handleInputChange}
                options={SUBJECT_OPTIONS}
              />
            )}
          </div>

          {/* Location Field */}
          <FormInput
            id="location"
            name="location"
            label="Location"
            type="text"
            value={formData.location}
            onChange={handleInputChange}
            placeholder={FORM_PLACEHOLDERS.location}
            required
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />

          {/* Volunteer-specific Skills Field */}
          {activeTab === "volunteer" && (
            <FormInput
              id="skills"
              name="skills"
              label="Skills & Experience"
              type="text"
              value={formData.skills || ""}
              onChange={handleInputChange}
              placeholder={FORM_PLACEHOLDERS.skills}
            />
          )}

          {/* Description Field */}
          <FormTextarea
            id="description"
            name="description"
            label={getDescriptionLabel()}
            value={formData.description}
            onChange={handleInputChange}
            placeholder={getDescriptionPlaceholder()}
            required
            rows={4}
            showAIBadge={false}
          />

          {/* AI Summarize Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSummarize}
              disabled={loading || !formData.description.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary rounded-lg hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                {loading ? "Summarizing..." : "AI Summarize"}
              </span>
            </button>
            <p className="text-xs text-text-tertiary">
              Click to get an AI-powered summary of your request
            </p>
          </div>

          {parsedAI && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3">
              <div>
                <p className="font-semibold text-primary">Summary</p>
                <p className="text-sm">{parsedAI.summary}</p>
              </div>

              <div>
                <p className="font-semibold text-primary">Urgency</p>
                <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs">
                  {parsedAI.urgency}
                </span>
              </div>

              <div>
                <p className="font-semibold text-primary">Suggested Action</p>
                <p className="text-sm">{parsedAI.action}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-text-on-primary font-semibold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              Submit Request
              <SendHorizontal className="size-4 md:size-5" />
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-[12px] text-text-tertiary">
            Your data is protected by industry-standard encryption. By
            submitting, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
