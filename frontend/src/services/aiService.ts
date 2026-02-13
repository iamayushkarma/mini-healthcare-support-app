import { server_url } from "../constants";
export async function generateSummary(text: string, urgency: string) {
  const response = await fetch(`${server_url}/api/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      urgency,
    }),
  });

  const data = await response.json();

  console.log("AI RESPONSE:", data);

  return data?.summary_text || "No summary generated.";
}
