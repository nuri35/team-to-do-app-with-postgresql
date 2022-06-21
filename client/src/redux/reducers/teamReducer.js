const initialState = {
  createTeamError: false,
  fetchTeamError: false,
  addUserToTeamError: false,
  fetchUserError: false,

  teams: [],
  users: [],
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TEAM_SUCCESS":
      return {
        ...state,
        teams: [action.payload, ...state.teams],
      };
    case "CREATE_TEAM_FAILURE":
      return {
        ...state,
        createTeamError: true,
      };

    case "FETCH_TEAMS_SUCCESS":
      return {
        ...state,
        teams: action.payload,
      };
    case "FETCH_TEAMS_FAILURE":
      return {
        ...state,
        fetchTeamError: true,
      };

    case "ADD_USER_TO_TEAM_SUCCESS":
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case "ADD_USER_TO_TEAM_FAILURE":
      return {
        ...state,
        addUserToTeamError: true,
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        users: action.payload,
      };
    case "FETCH_USER__FAILURE":
      return {
        ...state,
        fetchUserError: true,
      };

    default:
      return state;
  }
};

export default teamReducer;
