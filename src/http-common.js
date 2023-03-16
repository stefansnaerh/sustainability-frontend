import axios from "axios";

export default axios.create({
  baseURL: "https://sustainability-backend2.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});