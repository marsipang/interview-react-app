import React, { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import './MessagePanel.css';

export default function MessagePanel({selectedFriend, setMessage, message, history, setHistory}) {
    const listRef = useRef(null);
  
    const handleChange = (event) => {
      setMessage(event.target.value);
    };
  
    function saveMessage() {
      if (selectedFriend){
        
        const nextHistory = [...history, [selectedFriend, 'me', message, 'sent'], [selectedFriend, selectedFriend, 'hi', 'sent']]; //[friend chat is with, who sent message, message, sent status]
        flushSync(() => {setHistory(nextHistory)});
        listRef.current?.lastElementChild?.scrollIntoView();
      } else {
        console.log('no user selected');
      }
    }
    
    const messages = history
    .filter((messageHistory) => {
      return messageHistory[0] === selectedFriend & messageHistory[3] === 'sent'
    })
    .map((messageHistory, msgct) => {
      const description = messageHistory[2];
      return (
        <li key={msgct} style={{ backgroundColor: messageHistory[1]==='me' ? "lightgreen" : "lightblue", float: messageHistory[1]==='me' ? "right": "left"}}>
          <p>{description}</p>
        </li>
      );
    });
  
    const handleChatSubmit = event => {
      event.preventDefault();
      setMessage('');
    };
    
    return (
      <div className="Chat">
        <h3>Chat</h3>
        <div className="ChatHistory">
          <ol ref={listRef}>{messages}</ol>
        </div>
        <div className="ChatBarDiv">
          <form onSubmit={handleChatSubmit} className="ChatBar">
            <input className="ChatBox" value={message} onChange={handleChange} />
            <button className="SendMsg" onClick={saveMessage}>Send</button>
          </form>
        </div>
      </div>
    );
  }