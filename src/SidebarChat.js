import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setChat } from "./features/chatSlice";
import db from "./firebase";
import moment from "moment";
import "moment/locale/id";
import "./SidebarChat.css";

function SidebarChat({ id, chatName }) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <div
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
      className="sidebarchat"
    >
      <Avatar src={chatInfo[0]?.photo} className="sidebarchat_avatar" />
      <div className="sidebarchat_info">
        <h2>{chatName}</h2>
        <p>{chatInfo[0]?.message}</p>
        <small>
          {chatInfo[0]?.timestamp?.toDate()
            ? moment(new Date(chatInfo[0]?.timestamp?.toDate()))
                .locale("id")
                .fromNow()
            : ""}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
