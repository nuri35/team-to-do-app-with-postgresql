import axios from "axios";

export const createDataAPI = async (msg) => {
  const res = await axios.post(`/api/todos`, msg, { withCredentials: true });
  return res;
};

export const getDataAPI = async (id, queryToDoUserId) => {
  const res = await axios.get(`/api/todos/${id}?search=${queryToDoUserId}`, {
    withCredentials: true,
  });
  return res;
};

export const deleteDataAPI = async (msg) => {
  const res = await axios.delete(`/api/todos/${msg.deleteIndex}`, {
    withCredentials: true,
  });
  return res;
};

export const editDataAPI = async (msg) => {
  const res = await axios.post(`/api/Updatetodo`, msg, {
    withCredentials: true,
  });
  return res;
};
