import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmailDoctor,
  setPasswordDoctor,
  setFirstNameDoctor,
  setFamilyNameDoctor,
} from "../../redux/features/SignupDoctorSlicer";
import {
  setEmailPatient,
  setPasswordPatient,
  setFamilyNamePatient,
  setFirstNamePatient,
} from "../../redux/features/SignupPatientSlicer";
import { changeColorBox } from "../../usefulFunc/changeColorBox";
import {
  Avatar,
  Typography,
  CssBaseline,
  Button,
  Grid,
  TextField,
  Box,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useStyles } from "../Styles/SignInStyle";
export default function Signup() {
  const [isFormValid, setisFormValid] = useState({
    email: false,
    password: false,
    familyName: false,
    firstName: false,
  });
  const role = useSelector((state) => state.role.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const addEmail = (event) => {
    setisFormValid({
      ...isFormValid,
      email: event.target.value.trim().includes("@"),
    });

    changeColorBox(event.target, event.target.value.trim().includes("@"));
    if (role === "patient") dispatch(setEmailPatient(event.target.value));
    else dispatch(setEmailDoctor(event.target.value));
  };

  const addPassword = (event) => {
    setisFormValid({
      ...isFormValid,
      password: event.target.value.trim().length > 6,
    });

    changeColorBox(event.target, event.target.value.trim().length > 6);
    if (role === "patient") dispatch(setPasswordPatient(event.target.value));
    else dispatch(setPasswordDoctor(event.target.value));
  };

  const handleSubmit = (event) => {
    if (
      isFormValid.email &&
      isFormValid.password &&
      isFormValid.firstName &&
      isFormValid.familyName
    ) {
      event.preventDefault();
      if (role === "patient") navigate("/signupPatient");
      else navigate("/signupDoctor");
    } else {
      alert("Introduce datele corecte pentru a trece la pasul următor.");
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
          Înregistrare
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                autoComplete="family-name"
                name="familyName"
                required
                fullWidth
                id="familyName"
                label="Nume de familie"
                autoFocus
                onChange={(event) => {
                  setisFormValid({
                    ...isFormValid,
                    familyName: event.target.value.trim().length > 2,
                  });
                  changeColorBox(
                    event.target,
                    event.target.value.trim().length > 2
                  );
                  if (role == "doctor")
                    dispatch(setFamilyNameDoctor(event.target.value));
                  else dispatch(setFamilyNamePatient(event.target.value));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                required
                fullWidth
                id="firstName"
                label="Prenume"
                name="firstName"
                autoComplete="given-name"
                onChange={(event) => {
                  setisFormValid({
                    ...isFormValid,
                    firstName: event.target.value.trim().length > 2,
                  });
                  changeColorBox(
                    event.target,
                    event.target.value.trim().length > 2
                  );
                  if (role == "doctor")
                    dispatch(setFirstNameDoctor(event.target.value));
                  else dispatch(setFirstNamePatient(event.target.value));
                }}
              />
            </Grid>
          </Grid>
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
          <Button
            type="submit"
            className={classes.signInBttn}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Următoarea pagină
          </Button>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Link className="link-primary" to="/login" variant="body2">
                Ai un cont? Autentifică-te <u>aici.</u>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
