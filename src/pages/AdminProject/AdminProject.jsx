import {
  Table,
  Pagination,
  TextInput,
  Modal,
  Group,
  Input,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import {
  getAll,
  deleteUser,
  getProjectsByUser,
  getAllProjects,
  deleteProject,
  updateProject,
  getProjectsBetweenDates,
  getDataBetweenDates,
  getUsersbyProject,
  removeUserFromProject,
} from "../../api/api";
import { DateRangePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import "./AdminProject.scss";

export const AdminProject = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [projectUsers, setProjectUsers] = useState([]);
  const [dateProjects, setDateProjects] = useState([]);
  const [value, setValue] = useState([new Date(), new Date()]);
  const [activePage, setPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [dataImage, setDataImage] = useState("");
  const [successStatus, setSuccessStatus] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [singleProjectId, setSingleProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [updatedList, setUpdatedList] = useState([]);
  const [projectImage, setProjectImage] = useState("");
  const [projectId, setProjectId] = useState("");
  const [viewUsers, setViewUsers] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [removeProjectId, setRemoveProjectId] = useState("");

  const theme = useMantineTheme();

  const numberOfRowsInPaginaton = 10;
  const dtfUS = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "2-digit",
  });

  const getUsersProject = async (id_project) => {
    let project = {
      project_id: id_project,
    };
    const usersP = await getUsersbyProject(project);
    setProjectUsers(usersP);
  };

  const getProjects = async () => {
    const data = await getAllProjects();
    setAllProjects(data);
    setUpdatedList(data?.data);
  };

  const removeUserFromChosenProject = async (idUser, idProject) => {
    setRemoveProjectId(idProject);
    let information = {
      user_id: idUser,
      project_id: idProject,
    };

    await removeUserFromProject(information);
  };

  const getUsers = async () => {
    const systemusers = await getAll();
    setAllUsers(systemusers);
  };

  const getProjectsOfUsers = async (id) => {
    let user = {
      user_id: id,
    };
    const projects = await getProjectsByUser(user);
    return projects;
  };

  const getProjectsBetweenTwoDates = async (startDate, endDate) => {
    let dates = {
      startDate,
      endDate,
    };
    const projects = await getProjectsBetweenDates(dates);
    setDateProjects(projects);
  };

  const getDataBetweenTwoDates = async () => {
    let dates = {
      startDate: "April 15",
      endDate: "April 16",
    };
    const data_collected = await getDataBetweenDates(dates);
    return data_collected;
  };

  const deleteUserById = async (user_id) => {
    let user = {
      id: user_id,
    };
    await deleteUser(user)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  const deleteProjectById = async (project_id) => {
    setProjectId(project_id);
    let project = {
      id: project_id,
    };
    await deleteProject(project)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  const updateProjectData = async (project) => {
    await updateProject(project)
      .then((th) => console.log(th))
      .catch((err) => console.log(err));
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (file.size / 1024 > 1000) {
      setErrorStatus(true);
      setErrorMessage("Image size should be less than 1MB.");
    } else {
      setErrorStatus(false);
      const base64 = await convertBase64(file);
      setDataImage(base64);
    }
  };

  console.log(value)

  const rows = updatedList
    ?.slice(
      activePage * numberOfRowsInPaginaton - numberOfRowsInPaginaton,
      activePage * numberOfRowsInPaginaton
    )
    .map((project) => (
      <tr key={project.project_id}>
        <td>{project.name}</td>
        <td>{project.category}</td>
        <td>{project.date_created}</td>
        <td>
          <Group position="center">
            <button
              className="button admin__projects--button"
              onClick={() =>
                updateSingleProject(
                  project.project_id,
                  project.name,
                  project.category,
                  project.image
                )
              }
            >
              Edit project
            </button>
          </Group>
        </td>
        <td>
          <button
            className="button admin__projects--button"
            onClick={() => deleteProjectById(project.project_id)}
          >
            Delete
          </button>
        </td>
        <td>
          <button
            className="button admin__projects--button"
            onClick={() => viewListOfUsers(project?.project_id)}
          >
            View Users
          </button>
        </td>
      </tr>
    ));

  const updateSingleProject = (project_id, name, category, image) => {
    setOpened(true);
    setSingleProjectId(project_id);
    setProjectName(name);
    setProjectCategory(category);
    setDataImage(image);
  };

  const trySubmit = async () => {
    const project = {
      category: projectCategory,
      name: projectName,
      image: dataImage,
      project_id: singleProjectId,
    };
    updateProjectData(project);
    setProjectId(singleProjectId);
    setOpened(false);
  };

  const viewListOfUsers = (project_id) => {
    setViewUsers(true);
    getUsersProject(project_id);
    setSingleProjectId(project_id);
    const selectedProject = allProjects?.data?.find(
      (item) => item?.project_id === project_id
    );
    setSelectedName(selectedProject?.name);
  };

  const form = useForm({
    initialValues: {
      category: projectCategory,
      name: projectName,
    },
  });

  const filterUserList = (event) => {
    let newUpdatedList = allProjects?.data;
    newUpdatedList = newUpdatedList.filter(function (item) {
      console.log(newUpdatedList);
      return (
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });
    setUpdatedList(newUpdatedList);
  };

  useEffect(() => {
    setProjectId(0);
    getUsers();
    getProjects();
    getProjectsBetweenTwoDates(dtfUS.format(value[0]), dtfUS.format(value[1]));
  }, [projectId]);

  useEffect(() => {
    getUsersProject();
  }, [removeProjectId]);

  return (
    <div className="flex">
      <div className="admin__projects--wrapper">
        <div>
          <h1 className="admin__users--title">
            Projects({updatedList?.length})
          </h1>
          <div className="admin__projects--search-input">
            <Input
              variant="default"
              onChange={(event) => filterUserList(event)}
              placeholder="Search users"
            />
          </div>
          <div className="">
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>CATEGORY</th>
                  <th>DATE CREATED</th>
                  <th>EDIT</th>
                  <th>DELETE</th>
                  <th>View Users</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Pagination
              page={activePage}
              onChange={setPage}
              total={Math.ceil(updatedList?.length / numberOfRowsInPaginaton)}
            />
          </div>
        </div>
        <div>
          <DateRangePicker
            label="Book hotel"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
            onDropdownOpen={() => setValue([])}
            onDropdownClose={() =>
              getProjectsBetweenTwoDates(
                dtfUS.format(value[0]),
                dtfUS.format(value[1])
              )
            }
          />
        </div>
        {dateProjects?.data?.map((project, index) => (
          <div key={index}>{project.name}</div>
        ))}

        <>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Project Configuration"
          >
            {/* {errorStatus && (
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
                title="Project Added Successufully!!!"
                setStatus={setSuccessStatus}
                NotificationIcon={IoIosCheckbox}
              />
            )} */}
            <div>
              <form
                className="project__model__form"
                onSubmit={form.onSubmit(trySubmit)}
              >
                <TextInput
                  required
                  icon={<HiOutlineAtSymbol size={16} />}
                  label="Project Category"
                  placeholder="Project Category"
                  {...form.getInputProps("category")}
                  value={projectCategory}
                  onChange={(e) => setProjectCategory(e.target.value)}
                />
                <TextInput
                  id="project__input--name"
                  required
                  icon={<FaUserAlt size={16} />}
                  label="Project name"
                  placeholder="Project name"
                  {...form.getInputProps("name")}
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <input type="file" onChange={uploadImage} />
                <br />

                <img src={dataImage} alt="" className="project__image" />

                <button className="button" type="submit">
                  Update Project
                </button>
              </form>
            </div>
          </Modal>
          <Modal
            opened={viewUsers}
            onClose={() => setViewUsers(false)}
            size={650}
            overlayOpacity={0.85}
            transition="fade"
            transitionDuration={300}
            transitionTimingFunction="ease"
          >
            <h3>List of Users belonging to project : {selectedName}</h3>
            <div>
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>USER NAME</th>
                    <th>EMAIL</th>
                    <th>REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  {projectUsers?.data?.length ? (
                    projectUsers?.data?.map((usersData, index) => (
                      <tr key={index}>
                        <td>{usersData.user_name}</td>
                        <td>{usersData.email}</td>
                        <td>
                          <button
                            className="button"
                            onClick={() =>
                              removeUserFromChosenProject(
                                usersData?.user_id,
                                singleProjectId
                              )
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div>nothing</div>
                  )}
                </tbody>
              </Table>
            </div>
          </Modal>
        </>
      </div>
    </div>
  );
};
