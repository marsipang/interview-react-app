import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MessagePanel from './MessagePanel.js';
import FriendPanel from './FriendPanel.js';

export default function App() {
  const [selectedFriend, selectFriend] = useState(null);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Cognite Chat App</h1>
      </header>
      <div className="Body">
        <FriendPanel selectFriend={selectFriend} selectedFriend={selectedFriend} />
        <MessagePanel selectedFriend={selectedFriend} />
      </div>
    </div>
  );
}