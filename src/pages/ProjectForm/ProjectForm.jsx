import styles from "./ProjectForm.module.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Select,
    Box,
} from "@mantine/core";

import { useForm, zodResolver } from "@mantine/form";
import { getAllProjects } from "../../api/api";

export const ProjectForm = () => {

    const [allProjects, setAllProjects] = useState([]);

    const getProjects = async () => {
        const data = await getAllProjects();
        console.log(data);
        setAllProjects(data);
    };

    useEffect(() => {
        getProjects();
    }, []);


    const form = useForm({
        initialValues: {
            project: "",
            user: "",
        },
    });


    return (
        <div className={styles.container}>

            <Box sx={{ maxWidth: 300 }} mx="auto" className={styles.rightview}>
                <form action="">


                    <Select
                        data={allProjects.data.project_id}
                        label="Projects"
                        required
                        placeholder={"Select a Project"}
                        {...form.getInputProps("project")}
                    />

                    < Select
                        data={
                            [
                                {
                                    id: "1",
                                    label: "1",
                                },
                                {
                                    id: "2",
                                    label: "2",
                                },
                            ]}
                        label="Users"
                        required
                        placeholder={"Select A User"}
                        {...form.getInputProps("user")}
                    />
                </form>
            </Box>
        </div>
    );
}

