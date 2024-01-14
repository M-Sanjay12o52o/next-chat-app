"use client"

import { FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  const socket = io('http://localhost:3001');
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    console.log(messages);

    const handleMessage = (data: any) => {
      console.log("client message: ", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('message', handleMessage);

    return () => {
      // Clean up the event handler on component unmount
      socket.off('message', handleMessage);
    };
  }, [messages]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue !== "") {
      socket.emit("message", inputValue);
      setInputValue("");
    }
  };

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
  );
}
