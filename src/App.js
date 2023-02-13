import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MessagePanel from './MessagePanel.js';
import FriendPanel from './FriendPanel.js';

export default function App() {
  const [selectedFriend, setSelectedFriend] = useState(undefined);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1 className="app-title">Cognite Chat App</h1>
      </header>
      <div className="body">
        <FriendPanel setSelectedFriend={setSelectedFriend} selectedFriend={selectedFriend} message={message} setMessage={setMessage} history={history} setHistory={setHistory}/>
        <MessagePanel selectedFriend={selectedFriend} setMessage={setMessage} message={message} history={history} setHistory={setHistory}/>
      </div>
    </div>
  );
}