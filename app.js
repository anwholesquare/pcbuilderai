const express = require('express');
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

// Define delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
app.use(express.json());
app.use('/assets', express.static('assets'));

// Initialize OpenAI API configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
    const { msg, token } = req.body;

    // Validate input
    if (!msg) {
        return res.status(400).send('Missing required fields');
    }

    try {
        let threadId = token;

        // Check if token is provided, otherwise create a new thread
        if (!threadId) {
            const thread = await openai.beta.threads.create();
            threadId = thread.id;
            res.set('X-Token', threadId);  // Set token in header for easy access
        }

        // Send user's message to the assistant
        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: msg
        });

        // Run the assistant
        const runResponse = await openai.beta.threads.runs.create(threadId, {
            assistant_id: process.env.ASSISTANT_ID
        });

        // Wait for completion
        let run = await openai.beta.threads.runs.retrieve(threadId, runResponse.id);
        while (run.status !== "completed") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            run = await openai.beta.threads.runs.retrieve(threadId, runResponse.id);
        }

        // Retrieve assistant's responses
        const messagesResponse = await openai.beta.threads.messages.list(threadId);
        const assistantMessages = messagesResponse.data.filter(m => m.role === 'assistant');
        const response = assistantMessages[0]?.content[0]?.text?.value || "No response from assistant.";

        // Send response back to client
        res.json({ response, token: threadId });
    } catch (error) {
        console.error("Error processing chat:", error.message || error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/chathistory', async (req, res) => {
    const { token } = req.body;

    try {
        // Check if token is provided
        if (!token) {
            return res.status(400).json({ error: "No valid token provided" });
        }

        const threadId = token;

        // Retrieve the list of all messages in the thread
        const messagesResponse = await openai.beta.threads.messages.list(threadId);

        // Map messages to an array with each entry containing the role and message content
        const chatHistory = messagesResponse.data.map(m => ({
            role: m.role, // "user" or "assistant"
            content: m.content[0]?.text?.value || "No content available" // Assumes content is in this structure
        })).reverse(); // Reverse the order to get last to first

        // Send back the chat history to the client
        res.json({ history: chatHistory });
    } catch (error) {
        console.error("Error processing chat history:", error.message || error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/', async (req, res) => {
    fs.readFile(path.join(__dirname, 'chat.html'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading chat.html:', err);
            res.status(500).send('Error loading chat page');
            return;
        }
        // Send the HTML content as a string
        res.send(data);
    });
});

cors = require('cors');
app.use(cors());
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
