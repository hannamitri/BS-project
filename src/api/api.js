import axios from "axios";

let baseUrl = `http://localhost:3001`;

/*
 User Apis 
*/

const isHeProfessional = async (data) => {
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



export {

  //users
  getAll,
  updateUser,
  insertUser,
  deleteUser,
  getUserByEmail,
  isHeProfessional,

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

  //google api
  googlelogin,


};
