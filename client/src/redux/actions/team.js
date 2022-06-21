import {
  createDataAPI,
  getDataAPI,
  addDataToTeamAPI,
  fetchAddedUserAPI,
} from "./../../api/apiTeamCall";

export const createTeam = (team) => async (dispatch) => {
  try {
    const res = await createDataAPI(team);
    dispatch({ type: "CREATE_TEAM_SUCCESS", payload: res.data });
    return res;
  } catch (err) {
    return dispatch({
      type: "CREATE_TEAM_FAILURE",
      payload: err.response,
    });
  }
};

export const fetchTeams = () => async (dispatch) => {
  try {
    const res = await getDataAPI();

    dispatch({ type: "FETCH_TEAMS_SUCCESS", payload: res.data });
    return res;
  } catch (err) {
    if (err && err.response) {
      return dispatch({
        type: "FETCH_TEAMS_FAILURE",
        payload: err.response,
      });
    }
  }
};

export const addUserToTeam = (data) => async (dispatch) => {
  try {
    const res = await addDataToTeamAPI(data);
    console.log(res.data);
    dispatch({ type: "ADD_USER_TO_TEAM_SUCCESS", payload: res.data });
    return res;
  } catch (err) {
    if (err && err.response) {
      return dispatch({
        type: "ADD_USER_TO_TEAM_FAILURE",
        payload: err.response,
      });
    }
  }
};

export const fetchAddedToUser = (id) => async (dispatch) => {
  try {
    const res = await fetchAddedUserAPI(id);
    console.log(res.data);
    dispatch({ type: "FETCH_USER_SUCCESS", payload: res.data });
    return res;
  } catch (err) {
    if (err && err.response) {
      return dispatch({
        type: "FETCH_USER__FAILURE",
        payload: err.response,
      });
    }
  }
};
