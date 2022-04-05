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

const getUserById = async (data) => {
  let url = `${baseUrl}/getUserById`;
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

const insertProject = async (data) => {
  let url = `${baseUrl}/insertProject`;
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
const insertUsersProjects = async (data) => {
  let url = `${baseUrl}/insertUsersProjects`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const getUsersbyProject = async (data) => {
  let url = `${baseUrl}/getUsersbyProject`;
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

const userUploadsData = async (data) => {
  let url = `${baseUrl}/userUploadsData`;
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
  getUserById,
  isProfessional,

  //Data Collected
  getDataCollected,
  updateDataCollected,
  deleteDataCollected,
  insertDataCollected,

  //Projects
  getAllProjects,
  deleteProject,
  insertProject,

  //user_manages_projects api 
  insertUsersProjects,
  getUsersbyProject,


  //getProjectData
  getProjectData,


  //UserDataController
  userUploadsData,


  //google api
  googlelogin,




};
