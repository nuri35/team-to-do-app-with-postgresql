import axios from "axios";

export const createDataAPI = async (msg) => {
  const res = await axios.post(`/api/todos`, msg, { withCredentials: true });
  return res;
};

export const getDataAPI = async (id) => {
  const res = await axios.get(`/api/todos/${id}`, { withCredentials: true });
  return res;
};

export const deleteDataAPI = async (msg) => {
  const res = await axios.delete(`/api/todos/${msg.deleteIndex}`, {
    withCredentials: true,
  });
  return res;
};
