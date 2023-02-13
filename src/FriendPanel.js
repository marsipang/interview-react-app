import React, { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import './FriendPanel.css';

export default function FriendPanel({selectFriend, selectedFriend, message, setMessage, history, setHistory}) {
    const [friends, setFriends] = useState([]);
    const [newFriend, setNewFriend] = useState('');
    const selectedRef = useRef(null);
  
    const handleChangeFriend = (event) => {
      setNewFriend(event.target.value);
    };
  
    function addFriend() {
      if (friends.includes(newFriend)) {
        flushSync(() => {selectFriend(newFriend)});
        selectedRef.current.scrollIntoView();
        console.log('user already exists');
        console.log(selectedRef.current);
      } else if(newFriend === '') {
        console.log('no user entered');
      } else {
        const nextFriends = [...friends, newFriend];
        flushSync(() => {
            setFriends(nextFriends);
            selectFriend(newFriend);
        });
        selectedRef.current.scrollIntoView();
      }
      selectFriend(newFriend);
    }
  
    const friendList = friends.map((FriendName) => {
      let selected = false;
      if (FriendName === selectedFriend) {
        selected = true;
      }
  
      function openChat(friendName) {
        const lastMessageForFriend = history.filter((messageHistory) => {
            return messageHistory[0] === friendName
          }).slice(-1);
        const friendMessageCount = lastMessageForFriend.length;
        if (message !== ''){
            const nextHistory = [...history, [selectedFriend, 'me', message, 'unsent']]; //[friend chat is with, who sent message, message, sent status]
            setHistory(nextHistory);
            setMessage('');
        }
        selectFriend(friendName);
        if (friendMessageCount > 0){
            const lastMessageForFriendArray = lastMessageForFriend[0];
            if (lastMessageForFriendArray[3] === 'unsent'){
                setMessage(lastMessageForFriendArray[2])
            }
        }
      }
  
      const handleClick = () => {
        OpenChat(FriendName);
      }
  
      return (
        <button className="Friend" key={FriendName} ref={selected ? selectedRef: null} onClick={handleClick} value={FriendName} style={{ backgroundColor: selected ? "lightblue" : "white" }}>
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