import React from "react";
import { Typography } from "@mui/material";
import "./HomePagePatient.css";
export default function HomePagePatient() {
  return (
    <div className="homepage-container">
      <div className="welcome-container">
        <div className="text-box">
          <div
            style={{
              marginBottom: "5%",
            }}
          >
            <img
              style={{ width: "90%", height: "90%" }}
              src="/images/logo-transparent.png"
            ></img>
            <Typography variant="h4">
              <b>Bun venit la </b>
            </Typography>
            <Typography variant="h4" sx={{ color: "#dc4c4c" }}>
              <b>Platforma de prescripții! </b>
            </Typography>
          </div>
          <Typography variant="h5">
            O metodă mai ușoară de comunicare dintre medic și pacient
          </Typography>
        </div>
        <img
          style={{ width: "50%", height: "80%" }}
          src="/images/doctor-with-patient.png"
        ></img>
      </div>
      <Typography variant="h4" sx={{ marginBottom: "2%", color: "#dc4c4c" }}>
        <b>Serviciile noastre</b>
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: "2%" }}>
        <b>Ce oferim?</b>
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: "2%" }}>
        Oferim cele mai bune servicii. Ne pasă întotdeauna de satisfacția
        clienților noștri
      </Typography>
      <div className="offer-container">
        <div className="offer">
          <img className="offer-icon" src="/images/waiting-in-line.png" />
          <Typography
            variant="h4"
            sx={{ marginBottom: "2%", color: "#dc4c4c" }}
          >
            <b>Nu mai ești nevoit să aștepți la coadă</b>
          </Typography>
        </div>
        <div className="offer">
          <img
            className="offer-icon"
            src="/images/visualize-prescription.png"
          />
          <Typography
            variant="h4"
            sx={{ marginBottom: "2%", color: "#dc4c4c" }}
          >
            <b>Poți vizualiza rețetele de oriunde</b>
          </Typography>
        </div>
        <div className="offer">
          <img className="offer-icon" src="/images/doctor-and-patient.png" />
          <Typography
            variant="h4"
            sx={{ marginBottom: "2%", color: "#dc4c4c" }}
          >
            <b>O comunicare eficientă și mai rapidă cu medicul</b>
          </Typography>
        </div>
      </div>
    </div>
  );
}
