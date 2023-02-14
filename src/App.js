import React, { useState, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import MessagePanel from './MessagePanel.js';
import FriendPanel from './FriendPanel.js';

function reducer(state, action) {
  switch (action.type){
    case 'select_friend': {
      return {
        selectedFriend: action.nextName,
        friends: state.friends
      };
    }
    case 'add_friend': {
      return {
        selectedFriend: action.newFriend,
        friends: [...state.friends, action.newFriend] 
      };
    }
  }
}

const initialState = { selectedFriend: undefined, friends: [] };

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
        <FriendPanel message={message} setMessage={setMessage} history={history} setHistory={setHistory} state={state} dispatch={dispatch} />
        <MessagePanel selectedFriend={state.selectedFriend} setMessage={setMessage} message={message} history={history} setHistory={setHistory}/>
      </div>
    </div>
  );
}