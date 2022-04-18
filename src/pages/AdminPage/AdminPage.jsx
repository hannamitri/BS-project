import { Table, Pagination } from "@mantine/core";
import Sidebar from "../../components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { getAll, deleteUser, updateUser, updateProject } from "../../api/api";

export const AdminPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [activePage, setPage] = useState(1);
  const numberOfRowsInPaginaton = 3;

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
    let user = {
      id: user_id,
    };

    await deleteUser(user)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  const rows = allUsers?.data
    ?.slice(
      activePage * numberOfRowsInPaginaton - numberOfRowsInPaginaton,
      activePage * numberOfRowsInPaginaton
    )
    .map((user) => (
      <tr key={user.user_name}>
        <td>{user.user_name}</td>
        <td>{user.user_id}</td>
        <td>{user.phone_number}</td>
      </tr>
    ));

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>
        <h1>displays 3 users per page.</h1>
        <div>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>name</th>
                <th>Id</th>
                <th>Number</th>
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
      </div>
    </div>
  );
};
