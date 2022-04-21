import React from "react";
import { IoIosCloseCircle, IoIosClose } from "react-icons/io";
import "./Message.scss";

const Message = ({ bgcolor, title, setStatus, NotificationIcon }) => {
  return (
    <div className="project-image__limit--error">
      <NotificationIcon style={{ color: bgcolor }} />
      <div>{title}</div>
      <div className="project__close--icon" onClick={() => setStatus(false)}>
        <IoIosClose />
      </div>
    </div>
  );
};

export default Message;
