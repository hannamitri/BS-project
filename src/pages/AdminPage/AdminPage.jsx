import styles from "./AdminPage.css";
import { Table, Pagination } from "@mantine/core";
import Sidebar from "../../components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { getAll, deleteUser, updateUser, updateProject } from "../../api/api";
import { MDBDataTableV5 } from 'mdbreact';

import { useTable, usePagination } from 'react-table'
export const AdminPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [userrows, setRows] = useState([]);

  const arrayUsers = [];
  const getUsers = async () => {
    const systemusers = await getAll();
    systemusers?.data?.forEach(element => {
      let user = {
        user_id: `${element?.user_id}`,
        user_name: element?.user_name,
        pn: element?.phone_number,
        isProf: element?.isProfessional,
        location: element?.Location,
        email: element?.email,
        isAdmin: element?.isAdmin,
      }
      arrayUsers.push(user);
    });
    setAllUsers(systemusers);
  }
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: 'User ID',
        field: 'user_id',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'User ID',
        },
      },
      {
        label: 'User Name',
        field: 'user_name',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'User Name',
        },
      },
      {
        label: 'Phone Number',
        field: 'pn',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Phone Number',
        },
      },
      {
        label: 'Professional',
        field: 'isProf',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Professional',
        },
      },
      {
        label: 'Email',
        field: 'email',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Email',
        },
      },
      {
        label: 'Location',
        field: 'location',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Location',
        },
      },
      {
        label: 'Admin',
        field: 'isAdmin',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Admin',
        },
      },

    ],
    rows:
      // arrayUsers,
      [
        {
          email: "nathaliesaab6@gmail.com",
          isAdmin: 1,
          isProf: 1,
          location: "Tannourine",
          pn: "76776003",
          user_id: "17",
          user_name: "nath",
        },
        {
          email: "nathaliesaab6@gmail.com",
          isAdmin: 1,
          isProf: 1,
          location: "Tannourine",
          pn: "76776003",
          user_id: "17",
          user_name: "nath",
        },
        {
          email: "nathaliesaab6@gmail.com",
          isAdmin: 1,
          isProf: 1,
          location: "Tannourine",
          pn: "76776003",
          user_id: "17",
          user_name: "nath",
        },
        {
          email: "nathaliesaab6@gmail.com",
          isAdmin: 1,
          isProf: 1,
          location: "Tannourine",
          pn: "76776003",
          user_id: "17",
          user_name: "nath",
        },
      ]
  });


  const deleteUserById = async (user_id) => {
    let user = {
      id: user_id,
    };

    await deleteUser(user)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    getUsers();
    formatDataUsers();
    console.log(datatable)

  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main className={styles.container}>
        <h1 h1 className={styles.title} > List of Users</h1>
        <div className={styles.wrapper} >
          <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} fullPagination />
        </div>
      </main >
    </div >
  );
};
