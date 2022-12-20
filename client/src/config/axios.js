import axios from "axios";
import env from "react-dotenv";

const environment = env.NODE_ENV || "dev";
// const environment = "production";
// const environment = "dev";

const instance = axios.create({
  baseURL: environment === "dev" ? "http://localhost:5000" : env.API_URL,
});

export default instance;
