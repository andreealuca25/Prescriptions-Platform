import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import { Typography, Button, TextField, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../Styles/SignInStyle";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const classes = useStyles();
  let navigate = useNavigate();
  return (
    <Container
      className={classes.container}
      bordercolor="primary"
      component="main"
      maxWidth="xs"
    >
      {emailSent === false && (
        <>
          <Typography sx={{ mb: "5%" }} component="h1" variant="h4">
            Resetați parola
          </Typography>
          <Typography component="p" variant="caption">
            Vă rugăm să introduceți mai jos adresa dvs. de email și vă vom
            trimite informații pentru a vă schimba parola.
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <Button
              className={classes.signInBttn}
              fullWidth
              variant="contained"
              size="small"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                fetch("http://localhost:3001/sendForgotPassEmail", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({ email: email }),
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    setEmailSent(data.answer == "emailSent");
                    console.log("aici ", email, emailSent);
                  });
              }}
            >
              Resetați
            </Button>
          </Box>
        </>
      )}
      {emailSent === true && (
        <>
          <Typography sx={{ mb: "5%" }} component="h1" variant="h4">
            Resetați parola
          </Typography>
          <Typography component="p" variant="caption">
            Ați primit un e-mail cu un link pentru a vă reseta parola.
          </Typography>
          <Button
            className={classes.signInBttn}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Conectează-te
          </Button>
        </>
      )}
    </Container>
  );
}
