"use client"

import { FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  // const socket = io('http://localhost:3001');
  const [inputValue, setInputValue] = useState<string>("")
  const [messages, setMessages] = useState<string[]>([]);

  const socket = new WebSocket('ws://localhost:3001')

  // useEffect(() => {
  // Listening for messages from the server
  socket.addEventListener('message', (event) => {
    const data = event.data;
    setMessages((prevMessages) => [...prevMessages, data]);
  });

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue !== "") {
      socket.send(inputValue)
      setInputValue("");
    }
  }

  // listening for message from server
  // socket.addEventListener("message", ({ data }) => {
  //   const li = document.createElement('li');
  //   li.textContent = data;
  //   document.querySelector('ul')?.appendChild(li)
  // })

  return (
    <div>
      <h1>Welcome Home</h1>
      <form action="" onSubmit={sendMessage}>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder='Your message' />
        <button>Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  )
}
