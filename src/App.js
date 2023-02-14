import React, { useReducer } from 'react';
import logo from './logo.svg';
import './App.css';
import MessagePanel from './MessagePanel.js';
import FriendPanel from './FriendPanel.js';
import { Context, DispatchContext } from './Context.js';

function reducer(state, action) {
  switch (action.type){
    case 'select_friend': {
      return {
        ...state,
        selectedFriend: action.nextName
      };
    }
    case 'add_friend': {
      return {
        ...state,
        selectedFriend: action.newFriend,
        friends: [...state.friends, action.newFriend] 
      };
    }
    case 'save_message_to_history': {
      return {
        ...state,
        history: [...state.history, action.newMessages],
        message: ''
      }
    }
    case 'save_sent_message_to_history': {
      return {
        ...state,
        history: [...state.history, action.newMessages, [state.selectedFriend, state.selectedFriend, 'hi', 'sent']],
        message: ''
      }
    }
    case 'set_message': {
      return {
        ...state,
        message: action.newMessage
      }
    }
  }
}

const initialState = { selectedFriend: undefined, friends: [], history: [], message: '' };

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="app">
          <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <h1 className="app-title">Cognite Chat App</h1>
          </header>
          <div className="body">
            <FriendPanel />
            <MessagePanel />
          </div>
        </div>
      </DispatchContext.Provider>
    </Context.Provider>
  );
}