import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Delete, Edit } from "@material-ui/icons";
import { Grid, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@mui/material/TextField";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { deleteTodo, editToDo } from "./../../redux/actions/todo";

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
  const [edit, setEdit] = useState(false);
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

  const editSchema = yup
    .object()
    .shape({
      edit: yup.string().min(2).required(),
    })
    .required();

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  const editTodoItem = async (data) => {
    try {
      const fade = true;
      state.fade = fade;

      const value = {
        editIndex: props.index,
        data: data.edit,
      };
      dispatch(editToDo(value));
      setEdit(!edit);
    } catch (err) {
      console.error(err.message);
    }
  };

  const changeFocus = () => {
    setEdit(!edit);
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
        <span style={styles.Todo}>
          {!edit ? (
            props.todo.title
          ) : (
            <div>
              <form onSubmit={handleSubmit(editTodoItem)}>
                <TextField
                  className="form-control"
                  {...register("edit")}
                  type="text"
                  error={errors.edit}
                  variant="standard"
                  label="edit"
                  name="edit"
                  onKeyUp={() => {
                    trigger("edit");
                  }}
                />
                <IconButton
                  color="secondary"
                  aria-label="Delete"
                  type="submit"
                  style={styles.Icon}
                >
                  <CheckOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton
                  color="secondary"
                  aria-label="Delete"
                  style={styles.Icon}
                  onClick={() => changeFocus()}
                >
                  <CloseOutlinedIcon fontSize="small" />
                </IconButton>
              </form>
            </div>
          )}
        </span>

        <IconButton
          color="secondary"
          aria-label="Delete"
          onClick={deleteTodoItem}
          style={styles.Icon}
        >
          <Delete fontSize="small" />
        </IconButton>

        <IconButton
          color="secondary"
          aria-label="Edit"
          onClick={() => changeFocus()}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Paper>
    </Grid>
  );
};

export default Todo;
