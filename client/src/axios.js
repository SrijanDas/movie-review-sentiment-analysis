import axios from "axios";
import env from "react-dotenv";

const environment = env.NODE_ENV || "development";

const instance = axios.create({
  baseURL: environment === "development" ? env.API_URL : env.API_URL,
});

export default instance;
