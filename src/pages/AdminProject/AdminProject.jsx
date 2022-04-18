import styles from "./AdminProject.css";
import { Table } from '@mantine/core';
import Sidebar from "../../components/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import {
    getAll,
    deleteUser,
    getProjectsByUser,
    getAllProjects,
    deleteProject,
    updateProject,
    getProjectsBetweenDates,
    getDataBetweenDates
} from "../../api/api";

export const AdminProject = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        const data = await getAllProjects();
        setAllProjects(data);
    };

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

    const getProjectsBetweenTwoDates = async () => {
        let dates = {
            startDate: 'April 20',
            endDate: 'April 24',
        }
        const projects = await getProjectsBetweenDates(dates);
        return projects;
    };

    const getDataBetweenTwoDates = async () => {
        let dates = {
            startDate: 'April 20',
            endDate: 'April 23',
        }
        const data_collected = await getDataBetweenDates(dates);
        return data_collected;
    };


    const deleteUserById = async (user_id) => {
        let user = {
            id: user_id,
        }
        await deleteUser(user)
            .then((th) => console.log(th))
            .catch((err) => console.log(err));
    }

    const deleteProjectById = async (project_id) => {
        let project = {
            id: project_id
        }
        await deleteProject(project)
            .then((th) => console.log(th))
            .catch((err) => console.log(err));
    }

    const updateProjectData = async () => {

        let project = {
            category: "Agriculture in Koura",
            name: "Batroun",
            image: "dedeqdewf",
            date_created: "April 45, 11:16 AM	",
            project_id: 4,
        }

        await updateProject(project)
            .then((th) => console.log(th))
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        getUsers();
        getProjects();
        // console.log(getProjectsBetweenTwoDates());
        console.log(getDataBetweenTwoDates());
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main className={styles.container}>

                <div className={styles.wrapper}>
                    {/* {
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
                    } */}
                </div>
                <div>
                    <h1 className={styles.title}>List of Projects</h1>
                    <div className={styles.wrapper}>
                        <Table
                            highlightOnHover
                            horizontalSpacing="lg"
                            verticalSpacing="lg"
                            fontSize="xs">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>CATEGORY</th>
                                    <th>DATE CREATED</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allProjects?.data?.map((project, index) => (
                                        <tr key={index}>
                                            <td>{project.project_id}</td>
                                            <td>{project.name}</td>
                                            <td>{project.category}</td>
                                            <td>{project.date_created}</td>
                                            <td>
                                                <button onClick={() => deleteProjectById(project.project_id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div >
            </main >
        </div >
    );
};
