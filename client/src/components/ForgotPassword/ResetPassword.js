import React, { useState } from "react";
import { changeColorBox } from "../../usefulFunc/changeColorBox";
import { Typography, Button, TextField, Box, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useStyles } from "../Styles/SignInStyle";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { token } = useParams();
  const classes = useStyles();
  let navigate = useNavigate();

  return (
    <Container
      className={classes.container}
      bordercolor="primary"
      component="main"
      maxWidth="xs"
    >
      <Typography component="h1" variant="h4">
        Resetează parola
      </Typography>

      <TextField
        className={classes.textField}
        margin="normal"
        required
        fullWidth
        id="pass"
        label="Parola"
        autoComplete="pass"
        autoFocus
        onChange={(event) => {
          setPassword(event.target.value);
          changeColorBox(event.target, event.target.value.trim().length > 6);
        }}
      />
      <TextField
        className={classes.textField}
        margin="normal"
        required
        fullWidth
        id="pass-new"
        label="Parola din nou"
        autoComplete="pass-new"
        autoFocus
        onChange={(event) => {
          setPasswordConfirm(event.target.value);
          changeColorBox(event.target, event.target.value === password);
        }}
      />
      <Button
        className={classes.signInBttn}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => {
          if (password === passwordConfirm) {
            fetch("http://localhost:3001/resetPass", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Expose-Headers": "auth-token",
                "auth-token": token,
              },
              body: JSON.stringify({ password: passwordConfirm }),
            })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                if (data.answer === "updated") navigate("/login");
              });
          } else alert("Parolele nu sunt identice. Încearcă din nou, te rog.");
        }}
      >
        Resetează
      </Button>
    </Container>
  );
}
