import React from "react";
import "./PatientOrDoctor.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPatient, setDoctor } from "../../redux/features/RoleSlicer";
import { Container, Button, Typography, Grid } from "@mui/material";
export default function PatientOrDoctor() {
  const dispatch = useDispatch();

  return (
    <Container sx={{ backgroundColor: "white" }} id="patient-or-doctor-box">
      <Typography variant="h4" color="inherit" noWrap>
        <strong>Alege-ți rolul:</strong>
      </Typography>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-around",
          flexWrap: "nowrap",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src="/images/patient.png" alt="patient"></img>
          <Button
            onClick={() => {
              dispatch(setPatient());
            }}
          >
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              Sunt un pacient.{" "}
            </Link>
          </Button>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src="/images/doctor.png" alt="doctor"></img>
          <Button
            onClick={() => {
              dispatch(setDoctor());
            }}
          >
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              {" "}
              Sunt un medic.{" "}
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
