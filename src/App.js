import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function MessagePanel({selectedFriend}) {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  function saveMessage() {
    if (selectedFriend){
      const nextHistory = [...history, [selectedFriend, 'me', message], [selectedFriend, selectedFriend, 'hi']]; //[friend chat is with, who sent message, message]
      setHistory(nextHistory);
    } else {
      console.log('no user selected');
    }
  }
  
  const messages = history
  .filter((messageHistory, msgct) => {
    return messageHistory[0] === selectedFriend 
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
        <ol>{messages}</ol>
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

function FriendPanel({selectFriend, selectedFriend}) {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');
  

  const handleChangeFriend = (event) => {
    setNewFriend(event.target.value);
  };

  function addFriend() {
    if (friends.includes(newFriend)) {
      selectFriend(newFriend);
      console.log('user already exists');
    } else if(newFriend === '') {
      console.log('no user entered');
    } else {
      const nextFriends = [...friends, newFriend];
      setFriends(nextFriends);
    }
    selectFriend(newFriend);
    console.log(newFriend);
  }

  const friendList = friends.map((FriendName) => {
    let selected = false;
    if (FriendName === selectedFriend) {
      selected = true;
    }

    function OpenChat(friendName) {
      selectFriend(friendName);
    }

    const handleClick = () => {
      OpenChat(FriendName);
    }

    return (
      <button className="Friend" key={FriendName} onClick={handleClick} value={FriendName} style={{ backgroundColor: selected ? "lightblue" : "white" }}>
        {FriendName}
      </button>
    );
  });

  const handleSubmit = event => {
    event.preventDefault();
    setNewFriend('');
  };

  return (
    <div className="FriendsPanel">
      <h3>Friends List</h3>
      <form onSubmit={handleSubmit}>
        <input className="FriendBox" value={newFriend} onChange={handleChangeFriend} />
        <button type="submit" className="SendMsg" onClick={addFriend}>Add Friend</button>
      </form>
      <div className="FriendsList">{friendList}</div>
    </div>
  );
}

// const message = () => {

// }

// function FriendsPanel() {

// }

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