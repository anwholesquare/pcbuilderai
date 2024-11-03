# PC Builder AI Chatbot

A simple chatbot application designed to help users build custom PCs using OpenAI's assistant capabilities. This project utilizes Node.js and Express for the backend and HTML, CSS, and JavaScript for the frontend interface.

## Features

- **Interactive Chat Interface**: Engage in a natural conversation with the PC Builder AI chatbot, which provides suggestions for components based on user requirements.
- **Persistent Chat Sessions**: Chat sessions are saved and can be retrieved to continue where the conversation left off.
- **Message Animation and Styling**: Smooth animations and message styling for an engaging user experience.
- **Responsive Design**: The chat interface is designed to be responsive and accessible across devices.

## Technologies

- **Node.js**: Backend server and API handling
- **Express**: Web framework for building RESTful services
- **OpenAI API**: Utilized for conversation processing
- **HTML, CSS, JavaScript**: Frontend interface with Bootstrap for responsive design
- **Cors**: To handle cross-origin requests
- **Bootstrap**: For styling and layout structure
- **Inter Font**: Modern font styling for better readability and visual appeal

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **OpenAI API Key**: Sign up and get an API key from [OpenAI](https://platform.openai.com/signup).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/pc-builder-ai.git
    cd pc-builder-ai
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory:

    ```plaintext
    OPENAI_API_KEY=your_openai_api_key
    ASSISTANT_ID=your_assistant_id
    PORT=3000
    ```

4. Start the server:

    ```bash
    node app.js
    ```

   The server will run on `http://localhost:3000`.

### Usage

1. Open a browser and go to `http://localhost:3000`.
2. Interact with the PC Builder AI chatbot by entering text into the chatbox. The chatbot will provide recommendations for custom PC builds.
3. To print or view chat history, use the "Print" button in the chat interface.

## Folder Structure

```plaintext
.
├── app.js               # Node.js/Express server file
├── chat.html            # Chat interface HTML
├── assets/              # Static assets like icons and images
├── .env                 # Environment variables (do not commit this file!)
└── README.md            # Project documentation
```

## API Endpoints

- **POST /chat**: Send a message to the assistant and receive a response.
- **POST /chathistory**: Retrieve chat history for a session.

## Troubleshooting

- Ensure that your OpenAI API key and Assistant ID are correctly set in the `.env` file.
- If you encounter CORS issues, ensure that the `cors` module is configured correctly in `app.js`.

## License

This project is licensed under the MIT License.