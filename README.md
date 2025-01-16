# Chat Application - examination-project - README

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install Dependencies:**
   Ensure you have Node.js and npm installed. Then run:

   ```bash
   npm install
   ```

3. **Configure the Backend Endpoint:**

   - Update the `MESSAGES_ENDPOINT` variable in the code if your backend URL is different.
   - Example:
     ```js
     const MESSAGES_ENDPOINT = "http://your-backend-url/api/messages_json";
     ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   ```

5. **Access the Application:**
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Assumptions Made

1. **Backend API Response Format:**
   The API is expected to return an array of messages with the following structure:

   ```json
   [
     {
       "message_date": "2025-01-01T12:00:00Z",
       "message_text": "Hello, world!",
       "sender_name": "bot",
       "sender_number": "12345"
     }
   ]
   ```

2. **Cross-Origin Requests:**
   The backend is assumed to support CORS to handle requests from `http://localhost:5173`.

3. **Default Behavior:**

   - If the sender's name is "unknown," the sender's number is displayed instead.
   - Messages from the sender "bot" are treated as incoming; others are outgoing.

4. **Styling:**
   The application uses `@chatscope/chat-ui-kit-react` for pre-styled components.

---

## List of Implemented Features

1. **Message Fetching:**

   - Fetches messages from a backend API on component mount.
   - Transforms raw messages to a format compatible with the chat UI.

2. **Typing Indicator:**

   - Displays a typing indicator when the bot is typing.

3. **Early Return for Loading State:**

   - A full-screen loading screen is displayed while messages are being fetched.

4. **Responsive Chat UI:**

   - Chat components adapt to different screen sizes using `@chatscope/chat-ui-kit-react`.

5. **Message Input:**
   - Includes an input box with an attach button.
   - Placeholder text: "Ask something..."

---

## Technical Decisions and Their Rationale

1. **Use of `@chatscope/chat-ui-kit-react`:**

   - Chosen for its comprehensive, pre-styled chat components, allowing rapid development.

2. **Early Return Pattern for Loading State:**

   - Simplifies component logic by isolating loading behavior from the main chat rendering logic.

3. **State Management:**

   - Used `useState` to manage `messages`, `isTyping`, and `isLoading` states for simplicity and React hooks compatibility.

4. **Message Transformation:**

   - Transforming raw API data ensures compatibility with the chat UI and provides flexibility for future backend changes.

5. **Error Handling:**
   - Implemented basic error logging for API failures.

---

## Known Limitations or Areas for Improvement

1. **Hardcoded Backend Endpoint:**

   - The `MESSAGES_ENDPOINT` is hardcoded. Consider using environment variables to make it configurable.

2. **Error Handling:**

   - Currently logs errors to the console. A user-friendly error message should be displayed.

3. **Loading Indicator:**

   - The loading indicator is static. A smoother animated spinner could enhance the user experience.

4. **Component Decomposition:**

   - The chat functionality and API fetching logic should be refactored into separate components for better modularity.

5. **Typing Indicator:**

   - The current implementation uses `isTyping` as a placeholder. Implementing real-time typing detection would improve usability.

6. **Testing:**

   - No unit or integration tests are implemented. Adding tests would improve reliability.

7. **Message Sending:**

   - The `MessageInput` component lacks functionality for sending messages. Implementing a `POST` request to the backend is recommended.

8. **Styling Customization:**
   - The current design relies on default styles. Additional customization could improve branding and user experience.

---

This document serves as a starting point for understanding the project and its architecture. Future improvements can build on the current foundation to deliver a robust and feature-rich chat application.
