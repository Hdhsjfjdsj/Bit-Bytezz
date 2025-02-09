import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const chatBoxRef = useRef(null);

    useEffect(() => {
        chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
    }, [messages]);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        const newMessages = [...messages, { text: userInput, sender: "user" }];
        setMessages(newMessages);
        setUserInput("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/chat", {
                message: userInput,
            });
            setMessages([...newMessages, { text: response.data.reply, sender: "ai" }]);
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages([...newMessages, { text: "Error fetching response.", sender: "ai" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.chatBox} ref={chatBoxRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.message,
                            ...(msg.sender === "user" ? styles.userMessage : styles.aiMessage),
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
                {loading && <div style={styles.loading}>Typing...</div>}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <button onClick={handleSendMessage} style={styles.sendButton}>Enter</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1A1A2E",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    chatBox: {
        flex: 1,
        width: "70%",
        maxWidth: "800px",
        height: "80%",
        overflowY: "auto",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        scrollBehavior: "smooth",
        borderRadius: "15px",
        backgroundColor: "#0F3460",
        boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.1)",
    },
    message: {
        maxWidth: "80%",
        padding: "14px 16px",
        margin: "8px 0",
        borderRadius: "12px",
        fontSize: "16px",
        wordWrap: "break-word",
        lineHeight: "1.5",
        boxShadow: "2px 2px 10px rgba(255, 255, 255, 0.1)",
    },
    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#F39C12",
        color: "#fff",
        boxShadow: "0px 0px 8px #F39C12",
    },
    aiMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#E74C3C",
        color: "#F4F4F8",
        boxShadow: "0px 0px 8px #E74C3C",
    },
    loading: {
        alignSelf: "flex-start",
        padding: "10px",
        fontSize: "14px",
        fontStyle: "italic",
        color: "#F4F4F8",
    },
    inputContainer: {
        width: "70%",
        maxWidth: "800px",
        display: "flex",
        padding: "12px",
        borderTop: "2px solid #F4F4F8",
        borderRadius: "10px",
        backgroundColor: "#2C3E50",
        marginTop: "15px",
    },
    input: {
        flex: 1,
        padding: "14px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#ECF0F1",
        color: "#2C3E50",
        outline: "none",
        fontSize: "16px",
        boxShadow: "0px 0px 8px rgba(243, 156, 18, 0.6)",
    },
    sendButton: {
        marginLeft: "10px",
        padding: "14px 20px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#E74C3C",
        color: "#F4F4F8",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background 0.3s, transform 0.1s",
        boxShadow: "0px 0px 8px rgba(231, 76, 60, 0.6)",
    },
    sendButtonHover: {
        backgroundColor: "#C0392B",
        transform: "scale(1.05)",
    },
};

export default Chatbot;