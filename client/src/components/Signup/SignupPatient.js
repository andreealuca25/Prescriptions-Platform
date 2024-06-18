import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import {
  setCUIMPatient,
  setGenderPatient,
  setCNPPatient,
  setDateOfBirthPatient,
  setCountyPatient,
  setTownPatient,
  setProfilePicPatient,
} from "../../redux/features/SignupPatientSlicer";
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
export default function SignupPatient() {
  const [isFormValid, setIsFormValid] = useState({
    CNP: false,
    dateOfBirth: false,
    CUIM: false,
    town: false,
    county: false,
  });
  const dispatch = useDispatch();
  const infoPatient = useSelector((state) => state.signupPatient);
  let registerResponse,
    navigate = useNavigate();

  const classes = useStyles();
  const handleSignup = async () => {
    if (
      isFormValid.town &&
      isFormValid.county &&
      isFormValid.CNP &&
      isFormValid.dateOfBirth &&
      isFormValid.CUIM
    ) {
      let fReader = new FileReader(),
        data,
        blob;
      if (infoPatient.gender === "M") {
        data = await fetch("/images/patient-male-icon.jpg");
      } else {
        data = await fetch("/images/patient-female-icon.jpg");
      }
      blob = await data.blob();
      console.log(blob);
      try {
        fReader.readAsDataURL(blob);
      } catch (error) {
        console.log(error);
      }
      fReader.onload = async function () {
        dispatch(setProfilePicPatient(fReader.result));
        const response = await fetch("http://localhost:3001/patient/register", {
          //add patient to db
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(infoPatient),
        });
        if (response.ok) {
          registerResponse = await response.json();
        }
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
                  dispatch(setCNPPatient(event.target.value));
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
                    dateOfBirth: true,
                  });

                  dispatch(setDateOfBirthPatient(event.target.value));
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
              dispatch(setCUIMPatient(event.target.value));
            }}
          />

          <Grid item xs={12} sm={6}>
            <InputLabel id="gender-label">Sex</InputLabel>
            <select
              className="gender-select"
              onChange={(event) => {
                dispatch(setGenderPatient(event.target.value));
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
              dispatch(setTownPatient(event.target.value));
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
              dispatch(setCountyPatient(event.target.value));
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
