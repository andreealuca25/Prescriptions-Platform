import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import _ from "underscore";
import Cookies from "js-cookie";
import PDFItem from "../PDFItem/PDFItem";
import PDFViewerModal from "../PDFViewerModal/PDFViewerModal";
import { Typography } from "@mui/material";

export default function PrescriptionsPatientContent() {
  const [useModal, setUseModal] = useState(false);
  const [prescriptions, setPrescriptions] = useState([{}]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([{}]);
  const [updateOnDelete, setUpdateOnDelete] = useState(false);
  const [havePresc, setHavePresc] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/getPDFsForPatient", {
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
        console.log(data);
        setPrescriptions(data.answer);
        setFilteredPrescriptions(data.answer);
        setUpdateOnDelete(false);
      });
    if (filteredPrescriptions.length >= 1) setHavePresc(true);
  }, [updateOnDelete]);

  return (
    <>
      {havePresc === true && (
        <div
          className="patient-prescriptions-wrapper"
          style={{ margin: "auto" }}
        >
          <div className="topbar">
            <div className="filter-wrapper">
              Filter by:
              <div className="filter-options"></div>
              <select
                onChange={(event) => {
                  switch (event.target.value) {
                    case "Pending":
                      setFilteredPrescriptions(
                        prescriptions.filter(
                          (prescription) => prescription.status === "pending"
                        )
                      );

                      break;
                    case "Complete":
                      setFilteredPrescriptions(
                        prescriptions.filter(
                          (prescription) => prescription.status === "complete"
                        )
                      );
                      break;
                    case "All":
                      setFilteredPrescriptions(prescriptions);
                      break;
                    default:
                      setFilteredPrescriptions(
                        prescriptions.filter(prescriptions)
                      );
                  }
                }}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
            <div className="sorter-wrapper">
              Sort by:
              <div className="sorter-options">
                <select
                  onChange={(event) => {
                    switch (event.target.value) {
                      case "Ascending Time":
                        setFilteredPrescriptions(
                          _.sortBy(filteredPrescriptions, "addedDate") //should be by added date
                        );
                        break;
                      case "Descending Time":
                        setFilteredPrescriptions(
                          _.sortBy(filteredPrescriptions, "addedDate").reverse()
                        );
                        break;
                      default:
                        setFilteredPrescriptions(
                          _.sortBy(filteredPrescriptions, "addedDate")
                        );
                    }
                  }}
                >
                  <option value="Ascending Time">Ascending Time</option>
                  <option value="Descending Time">Descending Time</option>
                </select>
              </div>
            </div>
          </div>
          <div className="prescriptions">
            {filteredPrescriptions.map((prescription, index) => (
              <div
                className="prescription"
                key={index.toString()}
                onClick={() => {
                  setUseModal(true);
                }}
              >
                <PDFViewerModal
                  idPdf={prescription._id}
                  pdf={prescription.pdfFile}
                  useModal={useModal}
                  indexPdf={index}
                  onUpdate={(value) => {
                    setUpdateOnDelete(value);
                  }}
                />
                <PDFItem base64data={prescription.pdfFile}></PDFItem>
              </div>
            ))}
          </div>
        </div>
      )}
      {havePresc === false && (
        <div className="welcome-container">
          <div
            style={{
              margin: "auto",
            }}
          >
            <Typography variant="h4">
              <b>Nu ai nicio rețetă de vizualizat momentan.</b>
            </Typography>
            <Typography variant="h4" sx={{ color: "#dc4c4c" }}>
              <b>
                Contactează-ți <u>doctorul</u> pentru mai multe detalii.{" "}
              </b>
            </Typography>
          </div>
          <img src="/images/no-files.png"></img>
        </div>
      )}
    </>
  );
}
