import styles from "./AdminPage.css";
import { Table } from '@mantine/core';
import Sidebar from "../../components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { getAll, deleteUser } from "../../api/api";

export const AdminPage = () => {

    const [allUsers, setAllUsers] = useState([]);
    const getUsers = async () => {
        const systemusers = await getAll();
        setAllUsers(systemusers);
    };
    useEffect(() => {
        getUsers();
        console.log(allUsers.data)
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main className={styles.container}>
                <h1 className={styles.title}>List of Users</h1>
                <div className={styles.wrapper}>
                    <Table highlightOnHover horizontalSpacing="lg" verticalSpacing="lg" fontSize="xs">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER NAME</th>
                                <th>PHONE NUMBER</th>
                                <th>IS PROFESSIONAL</th>
                                <th>LOCATION</th>
                                <th>EMAIL</th>
                                <th>ISADMIN</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers?.data?.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.user_id}</td>
                                        <td>{user.user_name}</td>
                                        <td>{user.phone_number}</td>
                                        <td>{user.isProfessional}</td>
                                        <td>{user.Location}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin}</td>
                                        <td><button>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </main >
        </div >
    );
};
