import React from "react";
import "./Account.scss";

const Account = ({ users }) => {
  const currentUser = users.data?.find(
    (user) =>
      user.email === JSON.parse(localStorage.getItem("userLogginIn")).email
  );

  return (
    <div className="account__wrapper">
      <div className="account__profile--avatar">
        <img src={currentUser?.profile} alt="" />
      </div>
      <div>Name: {currentUser?.user_name}</div>
      <div>Email: {currentUser?.email}</div>
      <div>Location: {currentUser?.Location}</div>
      <div className="account__profile"></div>
    </div>
  );
};

export default Account;
