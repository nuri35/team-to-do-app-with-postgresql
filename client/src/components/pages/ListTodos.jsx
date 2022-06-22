import React, { useEffect, useState } from "react";

import SimpleSnackbar from "./Alert";
import { Grid } from "@material-ui/core";
import Todo from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "./../../redux/actions/todo";
import { Input } from "antd";
const { Search } = Input;
const ListTodos = (props) => {
  const { todo } = useSelector((state) => state);
  const { todos, deleteTodosError, toTeam } = todo;

  const [queryToDoUserId, setQueryToDoUserId] = useState("");

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
    dispatch(fetchTodos(props.teamId ? props.teamId : 0, queryToDoUserId));
  }, [dispatch, props.teamId, queryToDoUserId]);

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

  const onSearch = (e) => {
    setQueryToDoUserId(e.target.value);
  };

  return (
    <div>
      <Search
        placeholder="Search To do Name"
        onChange={onSearch}
        style={{
          width: 200,
        }}
      />
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
