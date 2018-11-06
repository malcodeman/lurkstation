import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

let instance = axios.create({
  baseURL: API_URL
});

export default instance;
