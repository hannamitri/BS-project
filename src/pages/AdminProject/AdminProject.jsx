import styles from "./AdminProject.css";
import { Table } from '@mantine/core';
import Sidebar from "../../components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { getAll, deleteUser, getProjectsByUser } from "../../api/api";

export const AdminProject = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    const getUsers = async () => {
        const systemusers = await getAll();
        setAllUsers(systemusers);
    };

    const getProjectsOfUsers = async (id) => {
        let user = {
            user_id: id
        }
        const projects = await getProjectsByUser(user);
        return projects;
    };


    const deleteUserById = async (user_id) => {
        let user = {
            id: user_id,
        }

        await deleteUser(user)
            .then((th) => console.log(th))
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        getUsers();
        console.log(allUsers.data)
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main className={styles.container}>

                <div className={styles.wrapper}>
                    {
                        allUsers?.data?.map((user, index) => (
                            <div key={index}>
                                <h1> Projects of user: {user.user_name}</h1>

                                <Table highlightOnHover horizontalSpacing="lg" verticalSpacing="lg" fontSize="xs">

                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>CATEGORY</th>
                                            <th>DATE CREATED</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getProjectsOfUsers(user.user_id)?.data?.map((project, index) => (
                                                <tr key={index}>
                                                    <td>{project.project_id}</td>
                                                    <td>{project.category}</td>
                                                    <td>{project.name}</td>
                                                    <td>{project.date_created}</td>

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        ))
                    }
                </div>
            </main >
        </div >
    );
};
