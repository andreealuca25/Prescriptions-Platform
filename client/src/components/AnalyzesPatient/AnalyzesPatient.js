import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import { useStyles } from "../Styles/SignInStyle";

import "./AnalyzesPatient.css";
export default function AnalyzesPatient() {
  const [refreshTable, setRefreshTable] = useState(false);
  const [file, setFile] = useState({});
  const [analyzes, setAnalyzes] = useState([{}]);
  const classes = useStyles();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nameFile", headerName: "Nume fișier", width: 130 },
    {
      field: "addedDate",
      headerName: "Dată adăugare",
      type: "number",
      width: 130,
    },
    {
      field: "vizualizare",
      headerName: "Vizualizare",
      width: 130,
      renderCell: (cellValues) => {
        return (
          <Button
            className={classes.signInBttn}
            onClick={() => {
              let win = window.open();
              win.document.write(
                '<iframe src="' +
                  cellValues.row.pdfFile +
                  '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
              );
              win.document.close();
            }}
          >
            Vizualizează
          </Button>
        );
      },
    },
    {
      field: "descarcare",
      headerName: "Descărcare",
      width: 130,
      renderCell: (cellValues) => {
        return (
          <Button
            className={classes.signInBttn}
            onClick={() => {
              let a = document.createElement("a");
              a.href = cellValues.row.pdfFile;
              a.download = `${cellValues.row.nameFile}`;
              a.click();
            }}
          >
            Descarcă
          </Button>
        );
      },
    },
    {
      field: "sterge",
      headerName: "Ștergere",
      width: 130,
      renderCell: (cellValues) => {
        return (
          <Button
            className={classes.signInBttn}
            onClick={() => {
              fetch("http://localhost:3001/patient/removeAnalysis", {
                method: "DELETE",
                body: JSON.stringify({ idAnalysis: cellValues.row._id }),
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
                  if (data.answer === "analysis found")
                    setRefreshTable(!refreshTable);
                });
            }}
          >
            Șterge
          </Button>
        );
      },
    },
  ];

  const handleAnalysis = () => {
    setRefreshTable(true);
    let reader = new FileReader();
    reader.readAsDataURL(file.fileData);
    reader.onloadend = function () {
      let base64data = reader.result;
      fetch("http://localhost:3001/patient/addAnalysis", {
        method: "POST",
        body: JSON.stringify({
          idPatient: Cookies.get("jwt"),
          addedDate: new Date(),
          nameFile: file.name,
          pdfFile: base64data,
        }),
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
        .then((data) => console.log(data));
    };
  };

  useEffect(() => {
    fetch("http://localhost:3001/patient/getAnalyzes", {
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let i = 0;
        data.answer.forEach(function (element) {
          element.id = i;
          i++;
        });
        setAnalyzes(data.answer);
      });
  }, [refreshTable]);

  return (
    <>
      <div className="input-file-container">
        <Typography sx={{ mb: "5%" }} variant="h5">
          Selectează fișa de analize pe care vrei să o încarci:
        </Typography>
        <input
          type="file"
          id="file-uploader"
          accept=".jpg, .png, .pdf"
          onChange={(e) => {
            setFile({
              name: e.target.files[0].name,
              fileData: e.target.files[0],
            });
            setRefreshTable(false);
          }}
        />
        <Button onClick={handleAnalysis}>Salvează</Button>
      </div>
      {analyzes.length > 1 && (
        <DataGrid
          sx={{ width: "80%", margin: "auto", marginTop: "4%" }}
          rows={analyzes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}
    </>
  );
}
