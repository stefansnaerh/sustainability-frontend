import http from "../http-common";
import axios from "axios";


const getAll = () => {
  return http.get("/posts");
}

const get = (id) => {
  return http.get(`/posts/${id}`);
}

const create = (data) => {
  console.log("todo loco")
  console.log(data)

  let form = new FormData();
  form.append('location', (data.location));
  form.append('userId', data.userId);
  form.append('categoryId', data.categoryId);
  form.append('username', (data.username));
  form.append('password', (data.password));
  form.append('email', data.email);
  form.append('birthdate', data.birthdate);
  form.append('image', data.image);


  var config = {
    method: 'post',
    url: 'http://' + window.location.hostname + ':8080/posts',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': sessionStorage.getItem('token')
    },
    data: form
  };

  return axios(config);

}

const update = (id, data) => {
  return http.put(`/posts/${id}`, data);
}

const deleteOne = (id) => {
  return http.delete(`/posts/${id}`);
}

const deleteAll = () => {
  return http.delete(`/posts`);
}

const getByUser = (userId) =>  {
  return http.get(`/posts/users/${userId}`);
}

const PostService = {
  getAll,
  get,
  create,
  update,
  deleteOne,
  deleteAll,
  getByUser,
}

export default PostService;