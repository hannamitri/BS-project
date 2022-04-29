import React from "react";
import "./Account.scss";
import deafultAvatar from "../../images/default-avatar.png";
import { MdLocationOn } from 'react-icons/md'
import { MdSettingsPhone } from "react-icons/md";
import { HiOutlineAtSymbol } from "react-icons/hi"
import { FaUserAlt } from "react-icons/fa";
const Account = ({ users }) => {
  const currentUser = users.data?.find(
    (user) =>
      user.email === JSON.parse(localStorage.getItem("userLogginIn")).email
  );

  return (
    <div className="account__container">
      <div className="account__wrapper" >

        <div className="account">
          <div className="account__profile--avatar">
            {currentUser?.profile ? (
              <img src={currentUser?.profile} alt="" />
            ) : (
              <img src={deafultAvatar} alt="" />
            )}
          </div>
          <div className="user__details">
            <div className="user__name">
              <FaUserAlt />
              {currentUser?.user_name}
            </div>
            <div className="user__location">
              <MdLocationOn />
              {currentUser?.Location}
            </div>
            <div>
              <HiOutlineAtSymbol  />
              {currentUser?.email}
            </div>
            <div>
              <MdSettingsPhone  />
              {currentUser?.phone_number}
            </div>
          </div>

        </div>


        <div className="account__profile"></div>
      </div>
    </div >
  );
};

export default Account;
