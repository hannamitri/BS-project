import axios from "axios";

let baseUrl = `http://localhost:3001`;

const getAll = async () => {
  let url = `${baseUrl}/getAll`;
  return await axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
};

const fetchRefData = async (data) => {
  let url = `${baseUrl}/fetchRefData`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const update = async (data) => {
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

const getTickets = async () => {
  let url = `${baseUrl}/getTickets`;
  return await axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
};

const getUserByName = async (data) => {
  let url = `${baseUrl}/getUserByName`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const updateTickets = async (data) => {
  let url = `${baseUrl}/updateTickets`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const deleteTickets = async (data) => {
  let url = `${baseUrl}/deleteTickets`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const getCountry = async () => {
  let url = `${baseUrl}/getCountry`;
  return await axios
    .get(url)
    .then((response) => response)
    .catch((err) => err.response);
};

const updateCountry = async (data) => {
  let url = `${baseUrl}/updateCountry`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const deleteCountry = async (data) => {
  let url = `${baseUrl}/deleteCountry`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const getCountrybyCategory = async (data) => {
  let url = `${baseUrl}/getCountrybyCategory`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const insertFlight = async (data) => {
  let url = `${baseUrl}/insertFlight`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const fetchOptions = async (data) => {
  let url = `${baseUrl}/fetchOptions`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const insertResults = async (data) => {
  let url = `${baseUrl}/insertResults`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

const googlelogin = async (data) => {
  let url = `${baseUrl}/googlelogin'`;
  return await axios
    .post(url, data)
    .then((response) => response)
    .catch((err) => err.response);
};

export {
  getAll,
  update,
  insertUser,
  deleteUser,
  getCountry,
  updateCountry,
  deleteCountry,
  getTickets,
  deleteTickets,
  updateTickets,
  getCountrybyCategory,
  insertFlight,
  fetchRefData,
  fetchOptions,
  insertResults,
  getUserByName,
  googlelogin,
};
