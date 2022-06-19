import React from "react";
import { useDispatch } from "react-redux";
import { Delete } from "@material-ui/icons";
import { Grid, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import { deleteTodo } from "./../../redux/actions/todo";
const styles = {
  Icon: {
    marginLeft: "auto",
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    width: 500,
  },
};

const Todo = (props) => {
  const state = {
    fade: false,
  };
  const dispatch = useDispatch();

  const gridRef = React.createRef();

  const deleteTodoItem = async () => {
    try {
      const fade = true;
      state.fade = fade;
      const data = {
        deleteIndex: props.index,
      };
      dispatch(deleteTodo(data));
    } catch (err) {
      console.error(err.message);
    }
  };

  const gridClass = state.fade ? "fade-out" : "";

  return (
    <Grid
      xs={12}
      className={`${gridClass}`}
      item
      key={props.index}
      ref={gridRef}
    >
      <Paper elevation={2} style={styles.Paper}>
        <span style={styles.Todo}>{props.todo.title}</span>

        <IconButton
          color="secondary"
          aria-label="Delete"
          onClick={deleteTodoItem}
          style={styles.Icon}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Paper>
    </Grid>
  );
};

export default Todo;
