import React, { useEffect, useRef, useState } from "react"
import styles from "./Chat.module.css"
import sendIcon from "../../assets/send.png"
import chatIcon from "../../assets/chat.png"
import { squircle } from 'ldrs'
import axios from "axios"

const Chat = ({ messages, setMessages, playerName }) => {
  const [prompt, setPrompt] = useState("")
  const [isWaiting, setIsWaiting] = useState(false)
  const textarea = useRef()
  const messagesEndRef = useRef()

  squircle.register()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || isWaiting) return

    const userMessage = { role: "user", content: prompt }
    setMessages(prev => [...prev, userMessage])

    setPrompt("")
    textarea.current.style.height = '50.5px'
    textarea.current.focus()
    setIsWaiting(true)

    try {
      const payload = { 
        userMessage,
        playerName: playerName
      };
      console.log("Requesting engine evaluation with payload:", payload);
      const response = await axios(`${import.meta.env.VITE_REACT_APP_API_URL}/api/chat`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        data: payload
      });

      const assistantMessage = {
        role: "assistant",
        content: response.data.answer|| "Error: invalid response",
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { role: "assistant", content: "Error when getting result from server" }])
    } finally {
      setIsWaiting(false)
    }
  }

  const textareaHeightHandler = (e) => {
    e.target.style.height = "auto"
    e.target.style.height = e.target.scrollHeight + 2 + "px"
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.chat}>
        {messages.length === 0 && (
          <div className={styles.startChatting}>
            <img src={chatIcon} alt="" />
            <p>Ask him about your opponent</p>
          </div>
        )}

        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.role === "user" ? styles.userMessage : styles.botMessage}
            >
              <span className={styles.messageValue}>{message.content}</span>
            </div>
          ))}

          {isWaiting && (
            <div className={styles.generating}>
              <l-squircle
                size="25"
                stroke="5"
                stroke-length="0.15"
                bg-opacity="0.1"
                speed="1.3"
                color="#444"
              ></l-squircle>
              <span> Generation...</span>
            </div>
          )}

          <span ref={messagesEndRef}></span>
        </div>

        <div className={styles.inputBlock}>
          <textarea
            type="text"
            placeholder="Write something..."
            className={styles.inputBlockTextarea}
            rows="1"
            value={prompt}
            onInput={textareaHeightHandler}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && addMessage(e)}
            ref={textarea}
          />
          <button className={styles.sendButton} onClick={addMessage}>
            <img src={sendIcon} alt="" className={styles.sendButtonImg} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
