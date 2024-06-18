import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./Login.css";
import "../../../node_modules/font-awesome/css/font-awesome.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  setLogging,
  toggleRememberMe,
} from "../../redux/features/LoggingSlicer";
import { setPatient, setDoctor } from "../../redux/features/RoleSlicer";
import { changeColorBox } from "../../usefulFunc/changeColorBox";
import {
  Avatar,
  Typography,
  CssBaseline,
  Button,
  Grid,
  FormControlLabel,
  TextField,
  Checkbox,
  Box,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useStyles } from "../Styles/SignInStyle";
function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setisFormValid] = useState({
    email: false,
    password: false,
  });

  const classes = useStyles();
  const rememberMe = useSelector((state) => state.logging.rememberMe);
  const addEmail = (event) => {
    setEmail(event.target.value);
    setisFormValid({
      ...isFormValid,
      email: event.target.value.trim().includes("@"),
    });
    changeColorBox(event.target, event.target.value.trim().includes("@"));
  };

  const addPassword = (event) => {
    setPassword(event.target.value);
    setisFormValid({
      ...isFormValid,
      password: event.target.value.trim().length > 6,
    });

    changeColorBox(event.target, event.target.value.trim().length > 6);
  };

  const handleSubmit = async (event) => {
    let headers, loginResponse, jwt;
    event.preventDefault();

    if (isFormValid) {
      //check if the user exists in the database
      const user = { email: email, password: password };
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        headers = response.headers;
        loginResponse = await response.json();
      }
      for (let pair of headers.entries())
        if (pair[0] === "auth-token") jwt = pair[1];

      if (loginResponse.answer === "inactive") navigate("/confirmEmail");
      else if (loginResponse.answer === "connected") {
        dispatch(setLogging("true"));

        if (rememberMe) Cookies.set("jwt", jwt, { expires: 7 });
        else Cookies.set("jwt", jwt);
        if (loginResponse.role === "doctor") {
          dispatch(setDoctor());
          navigate("/menuDoctor/homepage");
        } else {
          dispatch(setPatient());
          navigate("/menuPatient/homepage");
        }
      } else alert("Please enter a correct email and password.");
    }
  };

  return (
    <Container
      className={classes.container}
      bordercolor="primary"
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#dc4c4c" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Conectează-te
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            className={classes.textField}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresa de email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={addEmail}
          />
          <TextField
            className={classes.textField}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Parola"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={addPassword}
          />
          <FormControlLabel
            control={<Checkbox color="primary" value="remember" />}
            label="Păstrează-mă autentificat"
            onChange={() => {
              dispatch(toggleRememberMe());
            }}
          />
          <Button
            type="submit"
            className={classes.signInBttn}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Autentificare
          </Button>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item xs>
              <Link
                className="link-primary"
                to="/forgotPassword"
                variant="body2"
              >
                Ți-ai uitat parola?
              </Link>
            </Grid>
            <Grid item>
              <Link
                className="link-primary"
                to="/patientOrDoctor"
                variant="body2"
              >
                Nu ai cont? Creează unul <u>aici.</u>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default Login;
