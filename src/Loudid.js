import React from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./Loudid.css";

function Loudid() {
  return (
    <div className="loudid">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default Loudid;
