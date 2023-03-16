import http from "../http-common";



  const getAll = () => {
    return http.get("/categories");
  }

  const get = (id) =>  {
    return http.get(`/categories/${id}`);
  }

  const create = (data) =>  {
    return http.post("/categories", data);
  }

  const update = (id, data) => {
    return http.put(`/categories/${id}`, data);
  }

  const deleteOne = (id) => {
    return http.delete(`/categories/${id}`);
  }

  const deleteAll = () => {
    return http.delete(`/categories`);
  }

  const findByTitle = (title) => {
    return http.get(`/categories?title=${title}`);
  }

  const CategoryService = {
    getAll,
    get,
    create,
    update,
    deleteOne,
    deleteAll,
  }

export default CategoryService;