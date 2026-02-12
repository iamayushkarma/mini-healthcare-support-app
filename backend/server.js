import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

app.post("/api/summarize", async (req, res) => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a healthcare assistant.",
          },
          {
            role: "user",
            content: `
Analyze this healthcare support request.

Return EXACT format:

Summary:
[short summary]

Urgency:
Low / Medium / High

Suggested Action:
[short action]

Request:
${req.body.text}
`,
          },
        ],
      }),
    });

    const data = await response.json();

    const result = data.choices[0].message.content;

    res.json({ summary_text: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
