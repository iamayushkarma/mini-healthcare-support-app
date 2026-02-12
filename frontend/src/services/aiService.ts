export async function generateSummary(text: string) {
  const response = await fetch("http://localhost:5000/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  const data = await response.json();

  console.log("AI RESPONSE:", data);

  return data?.summary_text || "No summary generated.";
}
