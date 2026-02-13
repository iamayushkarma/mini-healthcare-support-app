# Mini Healthcare Support Web App

A concept-level healthcare support web application designed to help patients request assistance, volunteers register, and users contact an NGO through an AI-assisted form workflow.

This project demonstrates how AI can improve healthcare support systems by summarizing user requests and helping organizations quickly understand and prioritize incoming cases.

## Tech Stack

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS
- Component-based architecture

### Backend

- Node.js + Express
- REST API
- Environment-based configuration

### AI Integration

- Groq API (Llama 3.3 model)
- AI-powered request summarization
- Structured healthcare analysis output

## Features

- Patient support request form
- Volunteer registration form
- General inquiry form
- Dynamic form fields based on user type
- AI-generated structured summary:
  - Request summary
  - Urgency level (based on user selection)
  - Suggested next actions
- Responsive design
- Clean NGO-focused UI

## AI Idea (Concept)

The application uses AI to:

- Automatically summarize healthcare support requests
- Convert long user descriptions into structured actionable information
- Help NGOs quickly review and understand cases without reading long messages

This improves efficiency and reduces response time for healthcare support teams.

## NGO Use Case

Healthcare NGOs often receive many support requests with detailed descriptions. Manually reading each message can slow down response times.

This system helps by:

- Structuring requests automatically
- Highlighting urgency levels
- Suggesting initial next steps

This allows volunteers or staff to prioritize and respond more effectively.

## Running Locally

### Backend

```bash
cd backend
npm install
node server.js
```

Create `.env`:

```env
GROQ_API_KEY=your_api_key
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Live Demo

[Visit CareConnect AI](https://careconnectai.vercel.app/)

## Author

**Ayush Karma**
