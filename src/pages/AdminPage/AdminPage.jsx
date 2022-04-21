import {
  Table,
  Pagination,
  Modal,
  TextInput,
  Group,
  Skeleton,
  RadioGroup,
  Radio,
} from "@mantine/core";
import Sidebar from "../../components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { getAll, deleteUser, updateUser, updateProject } from "../../api/api";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { useForm } from "@mantine/form";

export const AdminPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [activePage, setPage] = useState(1);
  const [opened, setOpened] = useState(false);
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
  const [userIsAdmin, setuserIsAdmin] = useState("");
  const numberOfRowsInPaginaton = 10;
  const [userId, setUserId] = useState("");

  const arrayUsers = [];
  const getUsers = async () => {
    const systemusers = await getAll();
    systemusers?.data?.forEach((element) => {
      let user = {
        user_id: `${element?.user_id}`,
        user_name: element?.user_name,
        pn: element?.phone_number,
        isProf: element?.isProfessional,
        location: element?.Location,
        email: element?.email,
        isAdmin: element?.isAdmin,
      };
      arrayUsers.push(user);
    });
    setAllUsers(systemusers);
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
    setUserIsProfessional(userIsProfessional);
    setLocation(location);
    setEmail(email);
    setuserIsAdmin(userIsAdmin);
  };

  // id
  // Name
  // Email
  // Password
  // location
  // pn
  // isProfessional
  // isAdmin

  const trySubmit = async () => {
    const user = {
      user_id: singleUserId,
      name: userName,
      email,
      password,
      location,
      phone_number: phoneNumber,
      isProfessional: userIsProfessional,
      isAdmin: userIsAdmin,
    };
    updateUserData(user);
    setUserId(singleUserId);
    setOpened(false);
  };

  const rows = allUsers?.data?.length ? (
    allUsers?.data
      ?.slice(
        activePage * numberOfRowsInPaginaton - numberOfRowsInPaginaton,
        activePage * numberOfRowsInPaginaton
      )
      .map((user) => (
        <tr key={user.user_id}>
          <td>{user.user_id}</td>
          <td>{user.user_name}</td>
          <td>{user.password}</td>
          <td>{user.phone_number}</td>
          <td>{user.isProfessional ? "yes" : "no"}</td>
          <td>{user.Location}</td>
          <td>{user.email}</td>
          <td>{user.isAdmin ? "yes" : "no"}</td>
          <td>
            <Group position="center">
              <button
                className="button"
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
            </Group>
          </td>
          <td>
            <button
              className="button"
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
    console.log("allUsers");
  }, [userId]);
  return (
    <div style={{ display: "flex" }}>
      <div>
        <h1>List of Users</h1>
        <div>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>ID </th>
                <th>USER NAME</th>
                <th>PASSWORD</th>
                <th>PHONE NUMBER</th>
                <th>IS PROFESSIONAL</th>
                <th>LOCATION</th>
                <th>EMAIL</th>
                <th>ISADMIN</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>

          <Pagination
            page={activePage}
            onChange={setPage}
            total={Math.ceil(allUsers?.data?.length / numberOfRowsInPaginaton)}
          />
        </div>

        <>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Introduce yourself!"
          >
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
                <TextInput
                  id="project__input--name"
                  required
                  icon={<FaUserAlt size={16} />}
                  label="Is Professional"
                  placeholder="Is Professional"
                  value={userIsProfessional}
                  onChange={(e) => setUserIsProfessional(e.target.value)}
                />
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
                <TextInput
                  id="project__input--name"
                  required
                  icon={<FaUserAlt size={16} />}
                  label="Is Admin"
                  placeholder="Is Admin"
                  value={userIsAdmin}
                  onChange={(e) => setuserIsAdmin(e.target.value)}
                />
                {/* <RadioGroup
                  label="Select User's Role"
                  description="This is define a User's Role"
                  required
                  {...form.getInputProps("role")}
                >
                  <Radio value="citizen" label="Citizen" />

                  <Radio value="professional" label="Professional" />

                  <Radio value="admin" label="Admin" />
                </RadioGroup> */}

                <button className="button" type="submit" style={{ marginTop: "30px" }}>
                  Update User
                </button>
              </form>
            </div>
          </Modal>
        </>
      </div>
    </div>
  );
};
