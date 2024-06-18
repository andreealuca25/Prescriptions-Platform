import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Avatar,
  Typography,
  CssBaseline,
  Button,
  Grid,
  TextField,
  Box,
  Container,
  IconButton,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import { useStylesInput } from "../Styles/InputStyle";
import "./PatientsContent.css";
export default function PatientsContent() {
  const { id } = useParams();
  const [persInfo, setPersInfo] = useState({});
  const classes = useStylesInput();
  useEffect(() => {
    fetch("http://localhost:3001/patient/getInfoOnId", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "patient-id",
        "patient-id": id,
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setPersInfo(data));
  }, [id]);
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "2%",
        marginLeft: "3%",
        paddingBottom: "3%",
      }}
    >
      <Box
        className="pers-info-box"
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          backgroundColor: "white",
          width: "60%",
          margin: "auto",
          paddingBottom: "2%",
        }}
      >
        <Box>
          <img src={persInfo.profilePic} style={{ height: "15vh" }}></img>
        </Box>

        <Box>
          <Typography variant="h5">Informații personale</Typography>
          <Typography variant="caption">Nume de familie</Typography>
          <Box
            sx={{
              borderColor: "#dc4c4c",
              borderStyle: "solid",
              backgroundColor: "white",
              width: "60%",
              margin: "auto",
              paddingBottom: "2%",
              overflow: "auto",
            }}
          >
            {persInfo.familyName}
          </Box>
          <Typography variant="caption">Prenume</Typography>
          <Box
            sx={{
              borderColor: "#dc4c4c",
              borderStyle: "solid",
              backgroundColor: "white",
              width: "60%",
              margin: "auto",
              paddingBottom: "2%",
              overflow: "auto",
            }}
          >
            {persInfo.firstName}
          </Box>
          <Typography variant="caption">Gen</Typography>
          <Box
            sx={{
              borderColor: "#dc4c4c",
              borderStyle: "solid",
              backgroundColor: "white",
              width: "60%",
              margin: "auto",
              paddingBottom: "2%",
              overflow: "auto",
            }}
          >
            {persInfo.gender}
          </Box>

          <Typography variant="caption">CNP</Typography>
          <Box
            sx={{
              borderColor: "#dc4c4c",
              borderStyle: "solid",
              backgroundColor: "white",
              width: "60%",
              margin: "auto",
              paddingBottom: "2%",
              overflow: "auto",
            }}
          >
            {persInfo.CNP}
          </Box>

          <Typography variant="caption">Data nașterii</Typography>
          <Box
            sx={{
              borderColor: "#dc4c4c",
              borderStyle: "solid",
              backgroundColor: "white",
              width: "60%",
              margin: "auto",
              paddingBottom: "2%",
              overflow: "auto",
            }}
          >
            {persInfo.dateOfBirth}
          </Box>

          <Typography variant="caption">Localitate</Typography>
          <Box
            sx={{
              borderColor: "#dc4c4c",
              borderStyle: "solid",
              backgroundColor: "white",
              width: "60%",
              margin: "auto",
              paddingBottom: "2%",
              overflow: "auto",
            }}
          >
            {persInfo.town}
          </Box>
          <Typography variant="caption">Județ</Typography>
          <Box
            sx={{
              borderColor: "#dc4c4c",
              borderStyle: "solid",
              backgroundColor: "white",
              width: "60%",
              margin: "auto",
              paddingBottom: "2%",
              overflow: "auto",
            }}
          >
            {persInfo.county}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          className={classes.formButton}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {}}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/menuDoctor/create/createPrescription/${id}`}
          >
            Creează o rețetă
          </Link>
        </Button>
        <Button
          className={classes.formButton}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {}}
        >
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/menuDoctor/analyzes/for/${id}`}
          >
            Vezi analizele
          </Link>
        </Button>
      </Box>
    </Container>
  );
}
