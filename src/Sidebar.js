import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addChat = () => {
    const chatName = prompt("Masukkan nama grup baru");

    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="sidebar_avatar"
        />
        <div className="sidebar_input">
          <SearchIcon className="sidebar_search" />
          <input placeholder="Cari" />
        </div>
        <IconButton className="sidebar_add">
          <AddIcon onClick={addChat} />
        </IconButton>
      </div>
      <div className="sidebar_chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
