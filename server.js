require("dotenv").config();
const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// 🎯 System Instruction for Course Generation
const system_instruction = `
You are an AI assistant that provides structured course details in *strict JSON format*. 
For a given course name, return a JSON object with the following keys:

{
  "Course Overview": "<brief description>",
  "Eligibility Criteria": "<who can enroll>",
  "Duration & Structure": "<course length and subjects>",
  "Top Institutions": ["<List of universities>"],
  "Career Opportunities": {
    "Job Roles": ["<List of job roles>"],
    "Industries": ["<List of industries>"]
  },
  "Future Scope in India": "<growth potential and trends>",
  "Further Study Options": ["<List of higher studies and certifications>"]
}

⚠ *Important Guidelines:*
- *Return only valid JSON.* Do not include markdown, backticks, explanations, or any extra text.
- *Ensure the response is well-formed JSON.* Avoid unnecessary escape characters.
- *Be concise and relevant.* Provide accurate course details without redundancy.
`;

// ✅ Generate course details
app.post("/generate-course", async (req, res) => {
    const { course_name } = req.body;

    if (!course_name) {
        return res.status(400).json({ error: "Course name is required" });
    }

    try {
        const chatSession = model.startChat({
            history: [{ role: "user", parts: [{ text: system_instruction }] }]
        });

        const result = await chatSession.sendMessage(course_name);
        let responseText = result.response.text().trim();
        responseText = responseText.replace(/```json|```/g, "").trim();

        let formattedData;
        try {
            formattedData = JSON.parse(responseText);
        } catch (jsonError) {
            console.error("❌ Error parsing JSON response:", jsonError);
            return res.status(500).json({ error: "Invalid JSON format received from AI response." });
        }

        await fs.writeFile("./data/courseData.json", JSON.stringify(formattedData, null, 2));

        res.json({ courseDetails: formattedData });
    } catch (error) {
        console.error("❌ Error generating course details:", error);
        res.status(500).json({ error: "Failed to generate course details" });
    }
});

// ✅ AI Mentor Chatbot Endpoint
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const mentorInstruction = `
        You are an AI mentor designed to guide students from Tier 2 and Tier 3 cities in India. 
        Your role is to provide clear and practical advice on:
        
        - 📌 Career Guidance (Engineering, IT, Government Jobs, etc.)
        - 📌 Skill Development (Online courses, coding, technical skills)
        - 📌 Exam & Scholarship Info (JEE, GATE, UPSC, etc.)
        - 📌 Tech & Coding Help (Programming, web development)
        - 📌 Personal Growth & Motivation

        🎯 Response Guidelines:
        - Keep answers simple, structured, and motivating.
        - Use a friendly tone with relevant examples.
        - If the user writes in Kannada (English script), respond in a mix of Kannada + English.
        `;

        const chatSession = model.startChat({
            history: [{ role: "user", parts: [{ text: mentorInstruction }] }]
        });

        const result = await chatSession.sendMessage(message);
        const responseText = result.response.text().trim();

        res.json({ reply: responseText });
    } catch (error) {
        console.error("❌ Chatbot Error:", error);
        res.status(500).json({ error: "Failed to process chatbot response." });
    }
});

// ✅ Save course data manually
app.post("/save-course", async (req, res) => {
    const courseData = req.body;

    if (!courseData) {
        return res.status(400).json({ error: "No course data provided" });
    }

    try {
        await fs.writeFile("./data/courseData.json", JSON.stringify(courseData, null, 2));
        res.json({ message: "✅ Course data saved successfully" });
    } catch (error) {
        console.error("❌ Error saving course data:", error);
        res.status(500).json({ error: "Failed to save course data" });
    }
});

// ✅ Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
