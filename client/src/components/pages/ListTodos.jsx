import React, { useEffect, useState } from "react";

import SimpleSnackbar from "./Alert";
import { Grid } from "@material-ui/core";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./../../redux/actions/todo";

const ListTodos = (props) => {
  const { todo } = useSelector((state) => state);
  const { todos, deleteTodosError, toTeam } = todo;

  const [message, setMessage] = useState("");
  const [opens, setOpens] = useState(false);

  const handleClicks = (data) => {
    setOpens(true);
  };

  const handleCloses = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpens(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos(props.teamId ? props.teamId : 0));
  }, [dispatch, props.teamId]);

  useEffect(() => {
    if (deleteTodosError) {
      handleClicks();
      setMessage("Oppss error");
    }
  }, [deleteTodosError]);

  useEffect(() => {
    if (toTeam) {
      handleClicks();
      setMessage("Added to Team");
    }
  }, [toTeam]);

  const renderTodo = (todo) => {
    return <Todo index={todo.id} todo={todo} />;
  };

  return (
    <div>
      <Grid container>{todos.map((todo) => renderTodo(todo))}</Grid>;
      <SimpleSnackbar
        opens={opens}
        handleCloses={handleCloses}
        message={message}
      />
      ;
    </div>
  );
};

export default ListTodos;
