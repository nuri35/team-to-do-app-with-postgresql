const initialState = {
  createTodoError: false,
  fetchTodosError: false,
  deleteTodosError: false,
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TODO_SUCCESS":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case "CREATE_TODO_FAILURE":
      return {
        ...state,
        createTodoError: true,
      };

    case "FETCH_TODOS_SUCCESS":
      return {
        ...state,
        todos: action.payload,
      };
    case "FETCH_TODOS_FAILURE":
      return {
        ...state,
        fetchTodosError: true,
      };

    case "DELETE_TODO_SUCCESS":
      const { todos } = state;
      const newTodos = todos.filter((todo) => todo.id !== action.payload);
      return { ...state, todos: newTodos };

    case "DELETE_TODO_FAILURE":
      return {
        ...state,
        deleteTodosError: true,
      };

    default:
      return state;
  }
};

export default todosReducer;
