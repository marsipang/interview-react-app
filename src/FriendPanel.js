import React, { useState } from 'react';
import './FriendPanel.css';

export default function FriendPanel({message, setMessage, history, setHistory, state, dispatch}) {
    const [newFriend, setNewFriend] = useState('');
  
    const handleChangeFriend = (event) => {
      setNewFriend(event.target.value);
    };
  
    function addFriend() {
      if (state.friends.includes(newFriend)) {
        dispatch({ 
          type: 'select_friend',
          nextName: newFriend 
        });
        const element = document.getElementById(newFriend);
        element.scrollIntoView();
        console.log('user already exists');
      } else if(newFriend === '') {
        console.log('no user entered');
      } else {
        dispatch({
          type: 'add_friend',
          newFriend: newFriend
        });
        const element = document.getElementById(state.selectedFriend);
        element.scrollIntoView();
      }
    }
  
    const friendList = state.friends.map((friendName) => {
      let selected = false;
      if (friendName === state.selectedFriend) {
        selected = true;
      }
  
      function openChat(friendName) {
        const lastMessageForFriend = history.filter((messageHistory) => {
            return messageHistory[0] === friendName
          }).slice(-1);
        const friendMessageCount = lastMessageForFriend.length;
        if (message !== ''){
            const nextHistory = [...history, [state.selectedFriend, 'me', message, 'unsent']]; //[friend chat is with, who sent message, message, sent status]
            setHistory(nextHistory);
            setMessage('');
        }
        dispatch({ 
          type: 'select_friend',
          nextName: friendName });
        if (friendMessageCount > 0){
            const lastMessageForFriendArray = lastMessageForFriend[0];
            if (lastMessageForFriendArray[3] === 'unsent'){
                setMessage(lastMessageForFriendArray[2])
            }
        }
      }
  
      const handleClick = () => {
        openChat(friendName);
      }
  
      return (
        <button className="friend" key={friendName} id={friendName} onClick={handleClick} value={friendName} style={{ backgroundColor: selected ? "lightblue" : "white" }}>
          {friendName}
        </button>
      );
    });
  
    const handleSubmit = event => {
      event.preventDefault();
      setNewFriend('');
    };
  
    return (
      <div className="friends-panel">
        <h3>Friends List</h3>
        <form onSubmit={handleSubmit}>
          <input className="friend-box" value={newFriend} onChange={handleChangeFriend} />
          <button type="submit" className="send-message" onClick={addFriend}>Add Friend</button>
        </form>
        <div className="friends-list">{friendList}</div>
      </div>
    );
  }