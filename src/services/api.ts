import axios from "axios";

const api = axios.create({
  baseURL: "https://viva-amazonia-b7d621e98f23.herokuapp.com/",
});

export { api };