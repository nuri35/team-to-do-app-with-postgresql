import axios from "axios";

export const createDataAPI = async (msg) => {
  const res = await axios.post(`/api/teams`, msg, { withCredentials: true });
  return res;
};

export const getDataAPI = async () => {
  const res = await axios.get(`/api/teams`, { withCredentials: true });
  return res;
};

export const addDataToTeamAPI = async (msg) => {
  const res = await axios.post(`/api/addUserToTeams`, msg, {
    withCredentials: true,
  });
  return res;
};

export const fetchAddedUserAPI = async (msg) => {
  const res = await axios.get(`/api/fetchAddedUser/${msg}`, msg, {
    withCredentials: true,
  });
  return res;
};
