import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import SimpleSnackbar from "./Alert";
// import { AuthContext } from "./../Context";
import Select from "react-select";
import { createTodo } from "./../../redux/actions/todo";

const InputTodo = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState("");
  const { team } = useSelector((state) => state);
  const { teams } = team;
  const [message, setMessage] = useState("");
  const [opens, setOpens] = useState(false);
  const handleClicks = (data) => {
    setOpens(true);
  };
  const dispatch = useDispatch();

  const options = () => {
    const optTeamSelect = teams.map(function (team) {
      return { value: team.id, label: team.teamName };
    });
    optTeamSelect.push({ value: 0, label: "private" });
    return optTeamSelect;
  };

  const handleCloses = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpens(false);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (description === "" || selectedOption === null) {
        handleClicks();
        setMessage("Please fill in the blanks");
        return;
      }

      const value = { title: description };

      dispatch(createTodo(value));
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(selectedOption);

  return (
    <div>
      <form onSubmit={onSubmitForm} style={{ display: "flex" }}>
        <Input
          placeholder="Todo"
          inputProps={{
            "aria-label": "Description",
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "90%" }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "10%" }}
        >
          Add
        </Button>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options()}
        />
      </form>
      <SimpleSnackbar
        opens={opens}
        handleCloses={handleCloses}
        message={message}
      />
    </div>
  );
};

export default InputTodo;
