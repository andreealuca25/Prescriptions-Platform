import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Typography,
  Input,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useStyles } from "../Styles/MenuStyle";
import { useStylesInput } from "../Styles/InputStyle";
export default function CreateDoctorSideMenu() {
  const [patients, setPatients] = useState([{}]);
  const patientsList = useRef();
  const classes = useStyles();
  const classesInput = useStylesInput();
  useEffect(() => {
    fetch("http://localhost:3001/doctor/getPatients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setPatients(data));
  }, []);
  return (
    <Box className="side-menu" sx={{ width: "30%", mr: "3%" }}>
      <Typography sx={{ mb: "5%", mr: "auto" }} component="h1" variant="h5">
        Pacienți
      </Typography>
      <hr></hr>
      <Box className="search-box">
        <Input
          type="text"
          className={classesInput.inputForm}
          placeholder="Caută..."
          onKeyUp={(event) => {
            const input = event.target.value;

            for (let i = 0; i < patientsList.current.children.length; i++) {
              let patient = patientsList.current.children[i];

              if (
                !patient.textContent.toLowerCase().includes(input.toLowerCase())
              ) {
                patient.style.display = "none";
              } else patient.style.display = "block";
            }
          }}
        />
        <SearchIcon />
      </Box>
      <List ref={patientsList}>
        {patients.map((patient, index) => (
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#fceded",
            }}
            key={index.toString()}
          >
            <Avatar
              sx={{ width: "20%", height: "20%" }}
              src={patient.profilePic}
            ></Avatar>

            <Link to={`createPrescription/${patient._id}`}>
              <ListItemText
                primary={`${patient.firstName}  ${patient.familyName}`}
                sx={{ fontSize: "x-large" }}
                className={classes.sideMenuLink}
              />
            </Link>
            <hr></hr>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
