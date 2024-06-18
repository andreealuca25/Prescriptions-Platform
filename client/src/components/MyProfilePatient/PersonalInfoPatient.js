import React, { useState, useEffect, useRef } from "react";
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
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useStylesInput } from "../Styles/InputStyle";
import { changeColorBox } from "../../usefulFunc/changeColorBox";
export default function PersonalInfoPatient() {
  const [toEdit, setToEdit] = useState(false);
  const [persInfo, setPersInfo] = useState({});
  const profImg = useRef();
  const classes = useStylesInput();
  useEffect(() => {
    if (toEdit === false) {
      fetch("http://localhost:3001/patient/getPersonalInfo", {
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
          setPersInfo(data);
          // setPersInfo({
          //   ...persInfo,
          //   dateOfBirth: persInfo.dateOfBirth.split("T")[0],
          // });
        });
    }
  }, [toEdit]);

  const handleSubmit = () => {
    console.log(persInfo);
    fetch("http://localhost:3001/patient/updatePersonalInfo", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
      },
      body: JSON.stringify(persInfo),
    });
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "white",
        marginTop: "5%",
        paddingBottom: "3%",
        paddingTop: "3%",
      }}
    >
      {toEdit == false && (
        <>
          <Box>
            <Typography variant="h5">Poză de profil</Typography>
            <hr />
            <Box
              sx={{
                borderColor: "#dc4c4c",
                borderStyle: "solid",
              }}
            >
              <img src={persInfo.profilePic} style={{ height: "30vh" }}></img>
            </Box>
          </Box>
          <Box>
            <Typography variant="h5">Informații personale</Typography>
            <Typography variant="caption">Nume de familie</Typography>
            <Box
              sx={{
                borderColor: "#dc4c4c",
                borderStyle: "solid",
                backgroundColor: "white",
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
                overflow: "auto",
              }}
            >
              {persInfo.county}
            </Box>
          </Box>
          <Box>
            <Button
              className={classes.formButton}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                setToEdit(true);
              }}
            >
              Editează
            </Button>
          </Box>
        </>
      )}

      {toEdit == true && (
        <>
          <Box>
            <Typography variant="h5">Poză de profil</Typography>
            <hr />
            <Box
              sx={{
                borderColor: "#dc4c4c",
                borderStyle: "solid",
              }}
            >
              <img
                src={persInfo.profilePic}
                ref={profImg}
                style={{ height: "30vh" }}
              ></img>
            </Box>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(event) => {
                  let fReader = new FileReader();
                  try {
                    fReader.readAsDataURL(event.target.files[0]);
                  } catch (error) {
                    console.log(error);
                  }
                  fReader.onload = function (e) {
                    //waits until the result of the FileReader is ready
                    profImg.current.src = fReader.result;
                    setPersInfo({ ...persInfo, profilePic: fReader.result });
                  };
                }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>

          <Box>
            <Typography variant="h5">Informații personale</Typography>
            <Typography variant="caption">Nume de familie</Typography>
            <Box
              sx={{
                borderColor: "#dc4c4c",
                borderStyle: "solid",
                backgroundColor: "white",
                overflow: "auto",
              }}
            >
              <Input
                className={classes.inputForm}
                defaultValue={persInfo.familyName}
                onChange={(e) => {
                  if (e.target.value.trim().length > 2)
                    setPersInfo({ ...persInfo, familyName: e.target.value });

                  changeColorBox(e.target, e.target.value.trim().length > 2);
                }}
              />
            </Box>
            <Typography variant="caption">Prenume</Typography>
            <Box
              sx={{
                borderColor: "#dc4c4c",
                borderStyle: "solid",
                backgroundColor: "white",
                overflow: "auto",
              }}
            >
              <Input
                className={classes.inputForm}
                defaultValue={persInfo.firstName}
                onChange={(e) => {
                  if (e.target.value.trim().length > 2)
                    setPersInfo({ ...persInfo, firstName: e.target.value });

                  changeColorBox(e.target, e.target.value.trim().length > 2);
                }}
              />
            </Box>
            <Typography variant="caption">Gen</Typography>
            <Box
              sx={{
                borderColor: "#dc4c4c",
                borderStyle: "solid",
                backgroundColor: "white",
                overflow: "auto",
              }}
            >
              <select
                defaultValue={persInfo.gender}
                style={{
                  border: "0",
                  outline: "0",
                  backgroundColor: "transparent",
                }}
                onChange={(e) => {
                  setPersInfo({ ...persInfo, gender: e.target.value });
                }}
              >
                <option value="F">F</option>
                <option value="M">M</option>
              </select>
            </Box>

            <Typography variant="caption">CNP</Typography>
            <Box
              sx={{
                borderColor: "#dc4c4c",
                borderStyle: "solid",
                backgroundColor: "white",
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
              }}
            >
              <Input
                defaultValue={persInfo.town}
                className={classes.inputForm}
                onChange={(e) => {
                  if (e.target.value.trim().length > 2)
                    setPersInfo({ ...persInfo, town: e.target.value });

                  changeColorBox(e.target, e.target.value.trim().length > 2);
                }}
              />
            </Box>
            <Typography variant="caption">Județ</Typography>
            <Box
              sx={{
                borderColor: "#dc4c4c",
                borderStyle: "solid",
                backgroundColor: "white",
              }}
            >
              <Input
                defaultValue={persInfo.county}
                className={classes.inputForm}
                onChange={(e) => {
                  if (e.target.value.trim().length > 2)
                    setPersInfo({ ...persInfo, county: e.target.value });

                  changeColorBox(e.target, e.target.value.trim().length > 2);
                }}
              />
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
              onClick={() => {
                setToEdit(false);
              }}
            >
              Anulează
            </Button>
            <Button
              className={classes.formButton}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                handleSubmit();
                setToEdit(false);
              }}
            >
              Salvează
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}
