import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import {
  setCUIMDoctor,
  setGenderDoctor,
  setCNPDoctor,
  setDateOfBirthDoctor,
  setTownDoctor,
  setCountyDoctor,
  setSanitaryUnit,
  setProfilePicDoctor,
} from "../../redux/features/SignupDoctorSlicer";
import {
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CssBaseline,
  Button,
  Grid,
  TextField,
  Box,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import { changeColorBox } from "../../usefulFunc/changeColorBox";
import { validateCNP } from "../../usefulFunc/CNPValidator";
import { useStyles } from "../Styles/SignInStyle";
export default function SignupDoctor() {
  const [isFormValid, setIsFormValid] = useState({
    CNP: false,
    dateOfBirth: false,
    CUIM: false,
    county: false,
    town: false,
    sanitaryUnit: false,
  });

  const infoDoctor = useSelector((state) => state.signupDoctor);
  const dispatch = useDispatch();

  let registerResponse,
    navigate = useNavigate();

  const classes = useStyles();
  const handleSignup = async () => {
    if (
      isFormValid.CNP &&
      isFormValid.dateOfBirth &&
      isFormValid.CUIM &&
      isFormValid.county &&
      isFormValid.town &&
      isFormValid.sanitaryUnit
    ) {
      let fReader = new FileReader(),
        data,
        blob;
      if (infoDoctor.gender === "M") {
        data = await fetch("/images/doctor-male-icon.jpg");
      } else {
        data = await fetch("/images/doctor-female-icon.jpg");
      }
      blob = await data.blob();
      console.log(blob);
      try {
        fReader.readAsDataURL(blob);
      } catch (error) {
        console.log(error);
      }
      fReader.onload = async function () {
        dispatch(setProfilePicDoctor(fReader.result));
        const response = await fetch("http://localhost:3001/doctor/register", {
          //add doctor to db
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(infoDoctor),
        });
        if (response.ok) {
          registerResponse = await response.json();
        }
        console.log(registerResponse);
        if (registerResponse.answer != "incorrect") {
          navigate("/confirmEmail");
          await fetch("http://localhost:3001/sendConfEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(registerResponse),
          }).then((response) => response.json());
        } else alert("Introduceți datele corecte.");
      };
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
        <Typography component="h1" variant="h4">
          Informații personale
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                margin="normal"
                required
                id="CNP"
                label="CNP"
                name="CNP"
                autoComplete="CNP"
                autoFocus
                onChange={(event) => {
                  setIsFormValid({
                    ...isFormValid,
                    CNP: validateCNP(event.target.value),
                  });
                  changeColorBox(event.target, validateCNP(event.target.value));
                  dispatch(setCNPDoctor(event.target.value));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                margin="normal"
                required
                defaultValue={"2000-01-01"}
                type="date"
                name="date-of-birth"
                label="Data nașterii"
                id="date-of-birth"
                autoComplete="date-of-birth"
                onChange={(event) => {
                  setIsFormValid({
                    ...isFormValid,
                    dateOfBirth:
                      new Date(event.target.value) < new Date("01/01/2001"),
                  });
                  changeColorBox(
                    event.target,
                    new Date(event.target.value) < new Date("01/01/2001")
                  );
                  dispatch(setDateOfBirthDoctor(event.target.value));
                }}
              />
            </Grid>
          </Grid>
          <TextField
            className={classes.textField}
            required
            id="CUIM"
            label="CUIM"
            name="CUIM"
            autoComplete="CUIM"
            onChange={(event) => {
              const digits_only = (string) =>
                [...string].every((c) => "0123456789".includes(c));
              setIsFormValid({
                ...isFormValid,
                CUIM:
                  digits_only(event.target.value) &&
                  event.target.value.length === 10,
              });
              changeColorBox(
                event.target,
                digits_only(event.target.value) &&
                  event.target.value.length === 10
              );
              dispatch(setCUIMDoctor(event.target.value));
            }}
          />

          <Grid item xs={12} sm={6}>
            <InputLabel id="gender-label">Sex</InputLabel>

            <select
              className="gender-select"
              onChange={(event) => {
                dispatch(setGenderDoctor(event.target.value));
              }}
            >
              <option value="F">F</option>
              <option value="M">M</option>
            </select>
          </Grid>
          <TextField
            className={classes.textField}
            margin="normal"
            required
            name="unitate-sanitara"
            label="Unitate sanitară"
            id="unitate-sanitara"
            autoComplete="date-of-birth"
            onChange={(event) => {
              setIsFormValid({
                ...isFormValid,
                sanitaryUnit: event.target.value.trim().length > 2,
              });
              changeColorBox(
                event.target,
                event.target.value.trim().length > 2
              );
              dispatch(setSanitaryUnit(event.target.value));
            }}
          />

          <TextField
            className={classes.textField}
            margin="normal"
            required
            name="judet"
            label="Județ"
            id="judet"
            autoComplete="judet"
            onChange={(event) => {
              setIsFormValid({
                ...isFormValid,
                county: event.target.value.trim().length > 2,
              });
              changeColorBox(
                event.target,
                event.target.value.trim().length > 2
              );
              dispatch(setCountyDoctor(event.target.value));
            }}
          />
          <TextField
            className={classes.textField}
            margin="normal"
            required
            name="localitate"
            label="Localitate"
            id="localitate"
            autoComplete="localitate"
            onChange={(event) => {
              setIsFormValid({
                ...isFormValid,
                town: event.target.value.trim().length > 2,
              });
              changeColorBox(
                event.target,
                event.target.value.trim().length > 2
              );
              dispatch(setTownDoctor(event.target.value));
            }}
          />
          <Grid sx={{ display: "flex" }} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                className={classes.signInBttn}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <Link
                  style={{ color: "black", textDecoration: "none" }}
                  to="/signup"
                >
                  Înapoi
                </Link>
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                className={classes.signInBttn}
                variant="contained"
                onClick={handleSignup}
                sx={{ mt: 3, mb: 2 }}
              >
                Înregistrează-te
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></Grid>
        </Box>
      </Box>
    </Container>
  );
}
