import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
import Message from "./Message";
import { selectChatId, selectChatName } from "./features/chatSlice";
import { useSelector } from "react-redux";
import db from "./firebase";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <h2 className="chat_name">{chatName}</h2>
      </div>
      <div className="chat_message">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat_input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan dan tekan Enter"
            type="text"
          />
          <button onClick={sendMessage}>Kirim</button>
        </form>
        <IconButton className="chat_mic">
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
