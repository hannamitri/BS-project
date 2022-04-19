import React from "react";
import { IoIosCloseCircle, IoIosClose } from "react-icons/io";
import "./Message.scss";

const Message = ({ NotificationIcon, setStatus, title }) => {
  return (
    <div className="project-image__limit--error">
      <NotificationIcon />
      <div>{title}</div>
      <div
        className="project__close--icon"
        onClick={() => setStatus(false)}
      >
        <IoIosClose />
      </div>
    </div>
  );
};

export default Message;
