import {
  Table,
  Pagination,
  Modal,
  TextInput,
  Group,
  Skeleton,
  RadioGroup,
  Radio,
  Input,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getAll, deleteUser, updateUser } from "../../api/api";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { useForm } from "@mantine/form";
import "./AdminPage.scss";
import { Signup } from "../Signup/Signup";
import deafultAvatar from "../../images/default-avatar.png";

export const AdminPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [activePage, setPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [openedSignUp, setOpenedSignUp] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userIsProfessional, setUserIsProfessional] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [singleUserId, setSingleUserId] = useState("");
  const [userIsAdmin, setUserIsAdmin] = useState("");
  const numberOfRowsInPaginaton = 10;
  const [userId, setUserId] = useState("");
  const [updatedList, setUpdatedList] = useState([]);

  const getUsers = async () => {
    const data = await getAll();
    setAllUsers(data);
    setUpdatedList(data?.data);
  };

  const deleteUserById = async (user_id) => {
    setUserId(user_id);
    let user = {
      id: user_id,
    };

    await deleteUser(user)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  const form = useForm({
    initialValues: {
      category: "test",
      name: "test",
    },
  });

  const updateUserData = async (user) => {
    await updateUser(user)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  const updateSingleUser = (
    user_id,
    userName,
    password,
    phoneNumber,
    userIsProfessional,
    location,
    email,
    userIsAdmin
  ) => {
    setOpened(true);
    setSingleUserId(user_id);
    setUserName(userName);
    setPhoneNumber(phoneNumber);
    setPassword(password);
    setUserIsProfessional(userIsProfessional ? "yes" : "no");
    setRole(
      userIsAdmin ? "Admin" : userIsProfessional ? "Professional" : "Citizen"
    );
    setLocation(location);
    setEmail(email);
    setUserIsAdmin(userIsAdmin ? "yes" : "no");
  };

  const trySubmit = async () => {
    const user = {
      user_id: singleUserId,
      name: userName,
      email,
      password,
      location,
      phone_number: phoneNumber,
      isProfessional: role === "Professional" ? 1 : 0,
      isAdmin: role === "Admin" ? 1 : 0,
    };
    updateUserData(user);
    setUserId(singleUserId);
    setOpened(false);
  };

  const filterUserList = (event) => {
    let newUpdatedList = allUsers?.data;
    newUpdatedList = newUpdatedList.filter(function (item) {
      console.log(newUpdatedList);
      return (
        item.user_name
          .toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1
      );
    });
    setUpdatedList(newUpdatedList);
  };

  console.log(role, userIsAdmin);

  const rows = allUsers?.data ? (
    updatedList
      ?.slice(
        activePage * numberOfRowsInPaginaton - numberOfRowsInPaginaton,
        activePage * numberOfRowsInPaginaton
      )
      .map((user) => (
        <tr className="admin__users--table" key={user.user_id}>
          <td>
            <div className="users--image">
              {user?.profile ? (
                <img src={user?.profile} alt="" />
              ) : (
                <img src={deafultAvatar} alt="" />
              )}
            </div>
          </td>
          <td className="admin__users--name-title">{user.user_name}</td>
          <td>{user.password}</td>
          <td>{user.phone_number}</td>
          {/* <td
            className={`admin__users--status-${
              user.isProfessional ? "green" : "red"
            }`}
          >
            {user.isProfessional ? "yes" : "no"}
          </td> */}
          <td>
            {user.isAdmin ? "Admin" : ""}
            {user.isProfessional ? "Professional" : ""}
            {!user.isProfessional && !user.isAdmin ? "Citizen" : ""}
          </td>
          <td>{user.Location}</td>
          <td>{user.email}</td>
          {/* <td
            className={`admin__users--status-${user.isAdmin ? "green" : "red"}`}
          >
            {user.isAdmin ? "yes" : "no"}
          </td> */}
          <td>
            <button
              className="button admin__users--button"
              onClick={() =>
                updateSingleUser(
                  user.user_id,
                  user.user_name,
                  user.password,
                  user.phone_number,
                  user.isProfessional,
                  user.Location,
                  user.email,
                  user.isAdmin
                )
              }
            >
              Edit user
            </button>
          </td>
          <td>
            <button
              className="button admin__users--button"
              onClick={() => deleteUserById(user.user_id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
  ) : (
    <>
      <Skeleton animate={false} height={20} width="80%" mb="md" mx="auto" />
    </>
  );

  useEffect(() => {
    getUsers();
    setUserId(0);
  }, [userId]);
  return (
    <div className="main__content--wrapper">
      <div className="admin__users--wrapper">
        <div className="admin__users--title-wrapper">
          <div>
            <h1 className="admin__users--title">
              Users({updatedList?.length})
            </h1>
            <div className="admin__users--search-input">
              <Input
                variant="default"
                onChange={(event) => filterUserList(event)}
                placeholder="Search users"
              />
            </div>
          </div>
          <div>
            <button onClick={() => setOpenedSignUp(true)} className="button">
              Add user
            </button>
          </div>
        </div>
        <div>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Image</th>
                <th>USER NAME</th>
                <th>PASSWORD</th>
                <th>PHONE NUMBER</th>
                {/* <th>IS PROFESSIONAL</th> */}
                <th>ROLE</th>
                <th>LOCATION</th>
                <th>EMAIL</th>
                {/* <th>ISADMIN</th> */}
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
            {!updatedList?.length && <tbody>No users found.</tbody>}
          </Table>

          <Pagination
            page={activePage}
            onChange={setPage}
            total={Math.ceil(updatedList?.length / numberOfRowsInPaginaton)}
          />
        </div>

        <>
          <Modal opened={opened} onClose={() => setOpened(false)}>
            {errorStatus && (
              <Message
                bgcolor="#f03e3e"
                title={errormessage}
                setStatus={setErrorStatus}
                NotificationIcon={IoIosCloseCircle}
              />
            )}
            {successStatus && (
              <Message
                bgcolor="#38b000"
                title="User Added Successufully!!!"
                setStatus={setSuccessStatus}
                NotificationIcon={IoIosCheckbox}
              />
            )}
            <div>
              <form
                className="project__form"
                onSubmit={form.onSubmit(trySubmit)}
              >
                <TextInput
                  required
                  icon={<HiOutlineAtSymbol size={16} />}
                  label="User Name"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <TextInput
                  required
                  icon={<HiOutlineAtSymbol size={16} />}
                  label="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextInput
                  required
                  icon={<FaUserAlt size={16} />}
                  label="Phone Number"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                {/* <RadioGroup
                  label="Is Professional"
                  icon={<FaUserAlt size={16} />}
                  required
                  value={userIsProfessional}
                  onClick={(e) => setUserIsProfessional(e.target.value)}
                >
                  <Radio value="yes" label="Yes" />
                  <Radio value="no" label="No" />
                </RadioGroup> */}

                <TextInput
                  id="project__input--name"
                  required
                  icon={<FaUserAlt size={16} />}
                  label="Location"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <TextInput
                  id="project__input--name"
                  required
                  icon={<FaUserAlt size={16} />}
                  label="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <RadioGroup
                  label="Is Admin"
                  required
                  icon={<FaUserAlt size={16} />}
                  value={userIsAdmin}
                  onClick={(e) => setUserIsAdmin(e.target.value)}
                >
                  <Radio value="yes" label="Yes" />
                  <Radio value="no" label="No" />
                </RadioGroup> */}

                <RadioGroup
                  label="Role"
                  required
                  icon={<FaUserAlt size={16} />}
                  value={role}
                  onClick={(e) => setRole(e.target.value)}
                >
                  <Radio value="Citizen" label="Citizen" />
                  <Radio value="Professional" label="Professional" />
                  <Radio value="Admin" label="Admin" />
                </RadioGroup>

                <button
                  className="button"
                  type="submit"
                  style={{ marginTop: "30px" }}
                >
                  Update User
                </button>
              </form>
            </div>
          </Modal>
        </>

        <>
          <Modal opened={openedSignUp} onClose={() => setOpenedSignUp(false)}>
            <Signup />
          </Modal>
        </>
      </div>
    </div>
  );
};
