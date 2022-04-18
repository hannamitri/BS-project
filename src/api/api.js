import axios from "axios";

let baseUrl = `http://localhost:3001`;

/*
 User Apis 
*/
const isProfessional = async (data) => {
  let url = `${baseUrl}/isProfessional`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const getAll = async () => {
  let url = `${baseUrl}/getAll`;
  return await axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
};

const updateUser = async (data) => {
  let url = `${baseUrl}/updateUser`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const insertUser = async (data) => {
  let url = `${baseUrl}/insertUser`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const deleteUser = async (data) => {
  let url = `${baseUrl}/deleteUser`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const getUserByEmail = async (data) => {
  let url = `${baseUrl}/getUserByEmail`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

/*
 * Data Collected Apis
 */

const getDataCollected = async () => {
  let url = `${baseUrl}/getDataCollected`;
  return await axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
};

const insertDataCollected = async (data) => {
  let url = `${baseUrl}/insertDataCollected`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const updateDataCollected = async (data) => {
  let url = `${baseUrl}/updateDataCollected`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const deleteDataCollected = async (data) => {
  let url = `${baseUrl}/deleteDataCollected`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const getDataBetweenDates = async (data) => {
  let url = `${baseUrl}/getDataBetweenDates`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
}

/*
 * Projects Apis
 */

const getAllProjects = async () => {
  let url = `${baseUrl}/getAllProjects`;
  return await axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
};

const deleteProject = async (data) => {
  let url = `${baseUrl}/deleteProject`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const getProjectId = async (data) => {
  let url = `${baseUrl}/getProjectId`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const insertProject = async (data) => {
  let url = `${baseUrl}/insertProject`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};
const updateProject = async (data) => {
  let url = `${baseUrl}/updateProject`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};
const getProjectsBetweenDates = async (data) => {
  let url = `${baseUrl}/getProjectsBetweenDates`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};


/*
 * Google Api
 */
const googlelogin = async (data) => {
  let url = `${baseUrl}/googlelogin'`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

/**
 * User-manages-projects
 */

const getUsersbyProject = async (data) => {
  let url = `${baseUrl}/getUsersbyProject`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const getUsersProjects = async (data) => {
  let url = `${baseUrl}/getUsersProjects`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const getProjectsByUser = async (data) => {
  let url = `${baseUrl}/getProjectsByUser`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};


const insertUsersProjects = async (data) => {
  let url = `${baseUrl}/insertUsersProjects`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};


/**
 * DataProjects Apis
 */

const getProjectData = async (data) => {
  let url = `${baseUrl}/getProjectData`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

/**
 * UserDataController Apis
 */

const getDataCollectedbyUsers = async (data) => {
  let url = `${baseUrl}/getDataCollectedbyUsers`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

export {

  //users
  getAll,
  updateUser,
  insertUser,
  deleteUser,
  getUserByEmail,
  isProfessional,

  //Data Collected
  getDataCollected,
  updateDataCollected,
  deleteDataCollected,
  insertDataCollected,
  getDataBetweenDates,

  //Projects
  getAllProjects,
  deleteProject,
  insertProject,
  getProjectId,
  updateProject,
  getProjectsBetweenDates,


  //user_manages_projects api
  getUsersbyProject,
  getUsersProjects,
  getProjectsByUser,
  insertUsersProjects,

  //getProjectData
  getProjectData,

  //UserDataController
  getDataCollectedbyUsers,

  //google api
  googlelogin,
};
