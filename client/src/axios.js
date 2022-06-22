import axios from "axios";
import env from "react-dotenv";

// const environment = env.NODE_ENV || "development";
const environment = "production";
// const environment = "development";

const instance = axios.create({
  baseURL:
    environment === "development" ? "http://127.0.0.1:5000/" : env.API_URL,
});

export default instance;
