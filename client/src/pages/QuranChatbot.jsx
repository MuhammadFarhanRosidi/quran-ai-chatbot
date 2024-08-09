import React, { useState } from "react";
import instance from "../config/axiosInstance";

const QuranChatbot = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessage = { type: "user", content: userInput };
    setChatMessages([...chatMessages, newMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const { data: response } = await instance({
        url: "/quran-chatbot",
        method: "POST",
        data: { message: userInput.trim() },
        timeout: 10000,
      });

      const botMessage = { type: "bot", content: response };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error mengirim pesan:", error);
      if (error.response) {
        console.error("Data:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      }
      const errorMessage = {
        type: "bot",
        content: `Maaf, terjadi kesalahan: ${
          error.response?.data?.message || error.message
        }`,
      };
      setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="navbar-chatbot">
      <button
        className="chatbot-button"
        onClick={toggleChatbot}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          zIndex: 1000,
        }}
      >
        <i className="fas fa-robot"></i>
      </button>
      {isChatbotOpen && (
        <div
          className="chatbot-window"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "1490px",
            height: "590px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          <div
            className="chat-header"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Quran Chatbot
          </div>
          <div
            className="chat-messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px",
            }}
          >
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.type}`}
                style={{
                  padding: "5px 10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  maxWidth: "80%",
                  alignSelf:
                    message.type === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    message.type === "user" ? "#007bff" : "#f0f0f0",
                  color: message.type === "user" ? "white" : "black",
                }}
              >
                {message.type}: {message.content}
              </div>
            ))}
            {isLoading && (
              <div
                className="message bot"
                style={{
                  padding: "5px 10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  maxWidth: "80%",
                  alignSelf: "flex-start",
                  backgroundColor: "#f0f0f0",
                  color: "black",
                }}
              >
                Sedang mengetik...
              </div>
            )}
          </div>
          <div
            className="chat-input"
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ketik pesan..."
              style={{
                flex: 1,
                marginRight: "10px",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Kirim
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranChatbot;
