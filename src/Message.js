import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import moment from "moment";
import "moment/locale/id";
import "./Message.css";

const Message = forwardRef(
  (
    { id, contents: { timestamp, displayName, email, message, photo, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);

    return (
      <div>
        <div
          ref={ref}
          className={`message ${user.email === email && "message_sender"}`}
        >
          <Avatar className="message_photo" src={photo} />
          <p>{message}</p>
          <small className="message_date">
            {moment(new Date(timestamp?.toDate())).format("LT")}
          </small>
          <small className="message_name">{displayName}</small>
        </div>
      </div>
    );
  }
);

export default Message;
