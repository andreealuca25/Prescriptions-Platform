import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Input } from "@mui/material";
import { useStylesInput } from "../Styles/InputStyle";
import Cookies from "js-cookie";
import { validateCNP } from "../../usefulFunc/CNPValidator";
import DownloadIcon from "@mui/icons-material/Download";
import "./HomePageDoctor.css";
export default function HomePageDoctor() {
  const [shareCode, setShareCode] = useState("");
  const [cnp, setCnp] = useState("");
  const [hasFile, setHasFile] = useState(false);
  const [file, setFile] = useState({});
  const classes = useStylesInput();
  useEffect(() => {
    fetch("http://localhost:3001/doctor/getCUIM", {
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
      .then((data) => setShareCode(data.CUIM));
  }, []);

  const handleSendCNP = () => {
    if (validateCNP(cnp)) {
      fetch("http://localhost:3001/doctor/insertCnpForDoctor", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Expose-Headers": "auth-token",
          "auth-token": Cookies.get("jwt"),
        },
        body: JSON.stringify({ cnp: cnp }),
      });
      setCnp("");
    } else alert("CNP incorect.");
  };
  return (
    <>
      <Container
        sx={{
          paddingTop: "2%",

          marginTop: "2%",
          backgroundColor: "white",
          overflow: "auto",
        }}
      >
        <Box>
          <Typography variant="h5">
            Distribuie acest cod:
            <p style={{ color: "red" }}>
              {shareCode}
              {"    "}
              <Button
                className={classes.formButton}
                onClick={() => {
                  navigator.clipboard.writeText(shareCode);
                }}
              >
                Copiază
              </Button>
            </p>
            cu viitorii dumneavoastră pacienți pentru a putea accesa această
            pagină.
          </Typography>

          <hr></hr>
        </Box>
        <Box
          sx={{
            marginBottom: "5%",
          }}
        >
          <Typography variant="h5">
            Adaugă CNP-ul unui pacient manual:
          </Typography>
          <Input
            className={classes.inputForm}
            value={cnp}
            onChange={(e) => {
              setCnp(e.target.value);
            }}
          ></Input>
          <Button className={classes.formButton} onClick={handleSendCNP}>
            Adaugă
          </Button>
          <hr></hr>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            Adaugă un fișier CSV care conține CNP-urile mai multor pacienți.
          </Typography>
          <div
            id="drop_zone"
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.items) {
                setHasFile(true);
                for (let i = 0; i < e.dataTransfer.items.length; i++) {
                  if (e.dataTransfer.items[i].kind === "file") {
                    let file = e.dataTransfer.items[i].getAsFile();
                    console.log(file);
                  }
                }
              }
            }}
            onDragOver={(e) => {
              console.log("File(s) in drop zone");
              e.preventDefault();
            }}
          >
            <img
              src="https://100dayscss.com/codepen/upload.svg"
              className="upload-icon"
            />
            <span className="filename"></span>
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            ></input>
            <Button
              className={classes.formButton}
              onClick={() => {
                let fr = new FileReader(),
                  arr;
                fr.onload = function () {
                  arr = fr.result.split(",");
                  arr.forEach(function (element, index, array) {
                    array[index] = element.replace("\r\n", "");
                  });
                  console.log(arr);
                  fetch("http://localhost:3001/doctor/insertCnpsForDoctor", {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      "Access-Control-Expose-Headers": "auth-token",
                      "auth-token": Cookies.get("jwt"),
                    },
                    body: JSON.stringify({ cnp: arr }),
                  });
                };
                fr.readAsText(file);
              }}
            >
              Salvează
            </Button>
          </div>
          <Box sx={{ marginTop: "2%" }}>
            <hr></hr>
            <Typography variant="h5" sx={{ marginBottom: "2%" }}>
              Un exemplu de fișier csv:
            </Typography>
            <Button className={classes.formButton}>
              <a href="/model-csv.csv" download="model-csv.csv">
                <DownloadIcon />
              </a>
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
