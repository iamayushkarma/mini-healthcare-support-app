import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const PORT = process.env.PORT || 8000;

app.post("/api/summarize", async (req, res) => {
  try {
    const { text, urgency } = req.body;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "You are a healthcare assistant. Follow instructions strictly.",
          },
          {
            role: "user",
            content: `
Analyze this healthcare support request.

IMPORTANT:
- The urgency level is already selected by the user.
- You MUST use EXACTLY this urgency level.
- DO NOT change or re-evaluate urgency.

Return EXACT format:

Summary:
[short summary]

Urgency:
${urgency}

Suggested Action:
[short action]

Request:
${text}
`,
          },
        ],
      }),
    });

    const data = await response.json();

    const result =
      data?.choices?.[0]?.message?.content || "No summary generated.";

    res.json({ summary_text: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});
