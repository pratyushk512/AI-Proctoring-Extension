import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

export const signup = (user) =>
  api.post("/users/register", {
    "Name":user.name,
    "email":user.email,
    "password":user.password,
    "userType":"admin"
  });