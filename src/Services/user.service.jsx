import http from "../http-common";
import axios from "axios";

const getAll = () => {
  return http.get("/users");
}

const get = (id) => {
  return http.get(`/users/${id}`);
}

const getTopTen = () => {
  console.log("test")
  return http.get(`/users/topten`);
}

const signUp = (data) => {

  console.log("todo loco")
  console.log(data)

  let form = new FormData();
  form.append('username', (data.username));
  form.append('password', (data.password));
  form.append('email', data.email);
  form.append('birthdate', data.birthdate);
  form.append('image', data.image);


  var config = {
    method: 'post',
    url: 'https://sustainability-backend2.onrender.com/users',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  };

  return axios(config);
}

const logIn = (data) => {

 return http.post('/users/signin',data)
}

const update = (id, data) => {
  console.log("todo loco")
  console.log(data)

  let form = new FormData();
  form.append('username', (data.username));
  form.append('password', (data.password));
  form.append('email', data.email);
  form.append('birthdate', data.birthdate);
  form.append('image', data.image);


  var config = {
    method: 'put',
    url: `https://sustainability-backend2.onrender.com/users/${id}`,
    headers: {
      'Authorization': sessionStorage.getItem("token"),
      'Content-Type': 'multipart/form-data'
    },
    data: form
  };

  return axios(config);
}

const deleteOne = (id) => {
  return http.delete(`/users/${id}`);
}

const deleteAll = () => {
  return http.delete(`/users`);
}

const UserService = {
  getAll,
  get,
  signUp,
  logIn,
  getTopTen,
  update,
  deleteOne,
  deleteAll,

}

export default UserService;