import React, { useState } from "react";
import { Link } from "react-router-dom";
import SimpleSnackbar from "./Alert";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputAdornment from "@material-ui/core/InputAdornment";
import Lock from "@material-ui/icons/Lock";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const regSchema = yup
  .object()
  .shape({
    first: yup.string().min(2).required(),
    last: yup.string().min(2).required(),
    pass: yup
      .string()
      .min(4)
      .max(20)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        "Invalid password"
      )
      .required(),
    confirmPass: yup.string().oneOf([yup.ref("pass")]),
    email: yup.string().email().required(),
  })
  .required();
const Register = (props) => {
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

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(regSchema),
  });

  const onSubmit = async (data) => {
    try {
      const registerVal = await axios.post("/api/register", data);
      if (registerVal.data) {
        setMessage(registerVal.data.message);
        handleClicks();
      }
      resetField("first");
      resetField("last");
      resetField("email");
      resetField("pass");
      resetField("confirmPass");
    } catch (err) {
      console.log(err + "hatalı");
    }
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-uppercase text-center mb-4">Register</h3>

        <div className="form-group">
          <TextField
            type="text"
            className="form-control"
            aria-describedby="firstHelp"
            label="FirstName"
            name="first"
            {...register("first")}
            error={errors.first}
            variant="standard"
            onKeyUp={() => {
              trigger("first");
            }}
            InputProps={{
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
            helperText={errors?.first?.message}
          />
        </div>

        <div className="form-group">
          <TextField
            className="form-control"
            {...register("last")}
            type="text"
            error={errors.last}
            variant="standard"
            label="lastname"
            name="last"
            onKeyUp={() => {
              trigger("last");
            }}
            InputProps={{
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
            helperText={errors?.last?.message}
          />
        </div>

        <div className="form-group">
          <TextField
            className="form-control"
            type="password"
            {...register("pass")}
            error={errors.pass}
            variant="standard"
            label="Password"
            onKeyUp={() => {
              trigger("pass");
            }}
            InputProps={{
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
            helperText={errors?.pass?.message}
          />
        </div>

        <div className="form-group">
          <TextField
            className="form-control"
            {...register("confirmPass")}
            error={errors.confirmPass}
            type="password"
            variant="standard"
            label="confirmPass"
            onKeyUp={() => {
              trigger("confirmPass");
            }}
            InputProps={{
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
            helperText={errors?.confirmPass?.message}
          />
        </div>

        <div className="form-group">
          <TextField
            className="form-control"
            {...register("email")}
            type="email"
            error={errors.email}
            variant="standard"
            label="Email"
            onKeyUp={() => {
              trigger("email");
            }}
            InputProps={{
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
            helperText={errors?.email?.message}
          />
        </div>
        <Button simple type="submit" variant="outlined">
          Register
        </Button>

        <p className="my-2">
          You have an account?{" "}
          <Link to="/Login" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
      <SimpleSnackbar
        opens={opens}
        handleCloses={handleCloses}
        message={message}
      />
    </div>
  );
};

export default Register;
