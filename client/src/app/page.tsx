"use client"

import { FormEvent, useState } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  // const socket = io('http://localhost:3001');
  const [inputValue, setInputValue] = useState<string>("")
  const socket = new WebSocket('ws://localhost:3000')

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (inputValue !== "") {
      socket.send(inputValue)
      setInputValue("");
    }
  }

  // listening for message from server
  socket.addEventListener("message", ({ data }) => {
    const li = document.createElement('li');
    li.textContent = data;
    document.querySelector('ul')?.appendChild(li)
  })

  return (
    <div>
      <h1>Welcome Home</h1>
      <form action="" onSubmit={sendMessage}>
        <input value={inputValue} type="text" placeholder='Your message' />
        <button>Send</button>
      </form>
      <ul></ul>
    </div>
  )
}
