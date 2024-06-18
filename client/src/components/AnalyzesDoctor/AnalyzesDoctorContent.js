import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Cookies from "js-cookie";
import { useStyles } from "../Styles/SignInStyle";

export default function AnalyzesDoctorContent() {
  const { id } = useParams();
  const [refreshTable, setRefreshTable] = useState(false);
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
  ];

  useEffect(() => {
    fetch("http://localhost:3001/doctor/getAnalyzes", {
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
        "id-patient": id,
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
      {analyzes.length <= 1 && (
        <div className="welcome-container">
          <div
            style={{
              margin: "auto",
            }}
          >
            <Typography variant="h4">
              <b>Nu ai nicio analiză de vizualizat momentan.</b>
            </Typography>
            <Typography variant="h4" sx={{ color: "#dc4c4c" }}>
              <b>
                Contactează-ți <u>pacientul</u> pentru mai multe detalii.{" "}
              </b>
            </Typography>
          </div>
          <img src="/images/no-files.png"></img>
        </div>
      )}
      {analyzes.length > 1 && (
        <DataGrid
          sx={{ width: "70%", margin: "auto", marginTop: "4%" }}
          rows={analyzes}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}
    </>
  );
}
