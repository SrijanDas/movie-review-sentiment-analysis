import axios from "axios";
import env from "react-dotenv";

// const environment = env.NODE_ENV || "development";
const environment = "production";

const instance = axios.create({
  baseURL: environment === "development" ? env.DEV_API_URL : env.API_URL,
});

export default instance;
