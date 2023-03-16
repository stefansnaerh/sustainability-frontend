import http from "../http-common";

  const getAll = () => {
    return http.get("/categoryitems");
  }

  const get = (id) =>  {
    return http.get(`/categoryitems/${id}`);
  }

  const getByCategory = (categoryId) =>  {
    return http.get(`/categoryitems/category/${categoryId}`);
  }

  const create = (data) =>  {
    return http.post("/categoryitems", data);
  }

  const update = (id, data) => {
    return http.put(`/categoryitems/${id}`, data);
  }

  const deleteOne = (id) => {
    return http.delete(`/categoryitems/${id}`);
  }

  const deleteAll = () => {
    return http.delete(`/categoryitems`);
  }

  const findByTitle = (title) => {
    return http.get(`/categoryitems?title=${title}`);
  }

  const CategoryItemsService = {
    getAll,
    get,
    getByCategory,
    create,
    update,
    deleteOne,
    deleteAll,
  }

export default CategoryItemsService;