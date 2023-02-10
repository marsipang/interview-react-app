import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MessagePanel from './MessagePanel.js';
import FriendPanel from './FriendPanel.js';

export default function App() {
  const [selectedFriend, selectFriend] = useState(null);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Cognite Chat App</h1>
      </header>
      <div className="Body">
        <FriendPanel selectFriend={selectFriend} selectedFriend={selectedFriend} message={message} setMessage={setMessage} history={history} setHistory={setHistory}/>
        <MessagePanel selectedFriend={selectedFriend} setMessage={setMessage} message={message} history={history} setHistory={setHistory}/>
      </div>
    </div>
  );
}