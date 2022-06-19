const initialState = {
  createTeamError: false,
  fetchTeamError: false,

  teams: [],
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

    default:
      return state;
  }
};

export default teamReducer;
