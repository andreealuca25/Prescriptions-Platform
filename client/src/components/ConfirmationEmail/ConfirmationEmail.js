import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, TextField, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../Styles/SignInStyle";
import "./ConfirmationEmail.css";
export default function ConfirmationEmail() {
  const classes = useStyles();
  let navigate = useNavigate();
  return (
    <Container
      className={classes.container}
      bordercolor="primary"
      component="main"
      maxWidth="xs"
    >
      <Typography sx={{ mb: "5%" }} component="h1" variant="h4">
        Confirmarea contului
      </Typography>
      <Typography component="p" variant="caption">
        Suntem încântați să începeți. În primul rând, trebuie să vă confirmați
        contul. Verificați-vă contul de mail.
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
    </Container>
  );
}
