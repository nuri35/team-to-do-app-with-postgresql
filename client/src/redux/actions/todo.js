import { createDataAPI, getDataAPI, deleteDataAPI } from "./../../api/apiCall";

export const createTodo = (todo) => async (dispatch) => {
  try {
    const res = await createDataAPI(todo);
    dispatch({ type: "CREATE_TODO_SUCCESS", payload: res.data });
    return res;
  } catch (err) {
    return dispatch({
      type: "CREATE_TODO_FAILURE",
      payload: err.response,
    });
  }
};

export const fetchTodos = (id) => async (dispatch) => {
  try {
    const res = await getDataAPI(id);
    dispatch({ type: "FETCH_TODOS_SUCCESS", payload: res.data });
    return res;
  } catch (err) {
    if (err && err.response) {
      return dispatch({
        type: "FETCH_TODOS_FAILURE",
        payload: err.response,
      });
    }
  }
};

export const deleteTodo = (data) => async (dispatch) => {
  try {
    const res = await deleteDataAPI(data);
    dispatch({ type: "DELETE_TODO_SUCCESS", payload: data.deleteIndex });
    return res;
  } catch (err) {
    return dispatch({
      type: "DELETE_TODO_FAILURE",
      payload: err,
    });
  }
};
