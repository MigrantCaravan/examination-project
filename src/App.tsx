import { useState, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Avatar,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./App.css";

// CORS (Cross-Origin Resource Sharing) issue. This happens when your front-end application (running on http://localhost:5173) makes a request to a back-end server (http://www.backup-backend.readychatai.com/messages_json)
const MESSAGES_ENDPOINT = "api/messages_json";

// Transform fetched messages to match the required format
interface RawMessage {
  message_date: string;
  message_text: string;
  sender_name: string;
  sender_number: string;
}

interface Message {
  message: string;
  sender: string | number;
  direction: "incoming" | "outgoing";
  sentTime: string;
}

function App() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch messages from the backend on component mount
  //this fetch obviously should be in another component
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(MESSAGES_ENDPOINT);

        if (!response.ok) {
          throw new Error("Failed to fetch messages from the server.");
        }
        const data = await response.json();

        const formattedMessages: Message[] = data.map((msg: RawMessage) => ({
          message: msg.message_text,
          sender:
            msg.sender_name !== "unknown"
              ? msg.sender_name
              : msg.sender_number.toString(),
          direction: msg.sender_name !== "bot" ? "outgoing" : "incoming",
          sentTime: new Date(msg.message_date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages([...formattedMessages]);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false); // Stop showing the loading indicator
      }
    };

    fetchMessages();
    setIsTyping(false);
  }, []);
  /// early return for a loadinf state. Def i would implement it in a different component
  /// I would like a nice smooth loading wheel.
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#666",
          width: "100vw",
          height: "100vh",
        }}
      >
        Loading messages...
      </div>
    );
  }

  ///the whole chat bot can also be in its own component
  return (
    <div className="App">
      <div style={{ position: "relative", height: "500px" }}>
        <h1> Chatbot </h1>
        <MainContainer responsive={true}>
          <ChatContainer>
            <ConversationHeader></ConversationHeader>
            <MessageList
              autoScrollToBottom={false}
              autoScrollToBottomOnMount={false}
              loadingMorePosition={"top"}
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Someone is writting..." />
                ) : null
              }
            >
              {messages.map((msg, index) => {
                return (
                  <Message key={index} model={msg}>
                    {msg.direction === "incoming" && (
                      <Avatar name="Name" src="/vite.svg" />
                    )}
                    <Message.Header>{<span>{msg.sender}</span>}</Message.Header>
                    <Message.Footer>
                      {msg.sentTime && <span>{msg.sentTime}</span>}
                    </Message.Footer>
                  </Message>
                );
              })}
            </MessageList>
            <MessageInput
              attachButton={true}
              placeholder="Aks something..."
              onChange={() => setIsTyping(true)}
              //this function would be connected to a POST
              // onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
