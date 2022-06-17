import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import SimpleSnackbar from "./Alert";
import { AuthContext } from "./../Context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputAdornment from "@material-ui/core/InputAdornment";
import Lock from "@material-ui/icons/Lock";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = (props) => {
  const authContext = useContext(AuthContext);

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

  const regSchema = yup
    .object()
    .shape({
      password: yup
        .string()
        .min(4)
        .max(20)
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
          "Invalid password"
        )
        .required(),

      Email: yup.string().email().required(),
    })
    .required();

  const {
    register,
    trigger,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(regSchema),
  });

  const onSubmit = async (data) => {
    try {
      const login = await axios.post("/api/login", data, {
        withCredentials: true,
      });

      if (login.status === 200 && login.data.isAuthenticated === true) {
        authContext.setUser(login.data.user);
        authContext.setIsAuthenticated(!authContext.ısAuthenticated);
        props.history.push("/");
      } else {
        handleClicks();
        setMessage(login.data.message);

        resetField("Email");
        resetField("password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-uppercase text-center mb-4">Login</h3>

        <div className="form-group">
          <TextField
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            label="Email"
            name="Email"
            {...register("Email")}
            error={errors.Email}
            variant="standard"
            onKeyUp={() => {
              trigger("Email");
            }}
            InputProps={{
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
            helperText={errors?.password?.message}
          />
        </div>

        <div className="form-group">
          <TextField
            className="form-control"
            id="exampleInputPassword1"
            {...register("password")}
            error={errors.password}
            variant="standard"
            label="Password"
            onKeyUp={() => {
              trigger("password");
            }}
            InputProps={{
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock />
                </InputAdornment>
              ),
            }}
            helperText={errors?.password?.message}
          />
        </div>
        <Button simple type="submit" variant="outlined">
          Login
        </Button>

        <p className="my-2">
          You don't have an account?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
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

export default Login;
