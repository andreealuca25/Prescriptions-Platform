import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import Cookies from "js-cookie";
import { setLogging } from "../../redux/features/LoggingSlicer";
import { setPatient, setDoctor } from "../../redux/features/RoleSlicer";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import { useStyles } from "../Styles/ButtonStyle";
import "./StartPage.css";
export default function StartPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("jwt")) {
      fetch("http://localhost:3001/loginViaJwt", {
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
        .then((data) => {
          if (data.role === "doctor") {
            dispatch(setDoctor());
            dispatch(setLogging("true"));
            navigate("/menuDoctor");
          } else if (data.role === "patient") {
            dispatch(setPatient());
            dispatch(setLogging("true"));
            navigate("/menuPatient");
          }
        });
    }
    // let logoAnimator = function ($logo, speed) {
    //   $logo.animate(
    //     {
    //       left: "35%",
    //     },
    //     speed
    //   );
    // };
    // $(function () {
    //   logoAnimator($(".logo"), 5000);
    // });
  });
  const classes = useStyles();
  return (
    <div className="start-page-wrapper">
      <div className="logo-wrapper">
        <img className="logo" src="/images/logo-transparent.png" alt="logo" />
      </div>
      <div className="buttons-wrapper">
        <Button className={classes.startPageBttn}>
          <Link className="link-primary" to="/patientOrDoctor">
            Înregistrare
          </Link>
        </Button>
        <Button className={classes.startPageBttn}>
          <Link className="link-primary" to="/login">
            Autentificare
          </Link>
        </Button>
      </div>
    </div>
  );
}
