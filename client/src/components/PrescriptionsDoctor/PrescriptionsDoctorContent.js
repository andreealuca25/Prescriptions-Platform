import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import _ from "underscore";
import Cookies from "js-cookie";
import PDFItem from "../PDFItem/PDFItem";
import PDFViewerModal from "../PDFViewerModal/PDFViewerModal";
import "./PrescriptionsDoctor.css";
export default function PrescriptionsDoctorContent() {
  const { id } = useParams(); //parameters from route
  const [useModal, setUseModal] = useState(false);
  const [prescriptions, setPrescriptions] = useState([{}]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([{}]);
  const [updateOnDelete, setUpdateOnDelete] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/getPDFs", {
      type: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "id-patient",
        "id-patient": id,
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPrescriptions(data.answer);
        setFilteredPrescriptions(data.answer);
        setUpdateOnDelete(false);
      });
  }, [id, updateOnDelete]);

  return (
    <>
      {filteredPrescriptions.length >= 1 && (
        <div className="patient-prescriptions-wrapper">
          <div className="topbar">
            <div className="filter-wrapper">
              Filtrează după:
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
                <option value="All">Toate</option>
                <option value="Pending">În așteptare</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
            <div className="sorter-wrapper">
              Sortează după:
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
                  <option value="Ascending Time">Timp ascendent</option>
                  <option value="Descending Time">Timp descendent</option>
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
      {filteredPrescriptions < 1 && (
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
                Creează una{" "}
                <Link to={`/menuDoctor/create/createPrescription/${id}`}>
                  aici
                </Link>
                .
              </b>
            </Typography>
          </div>
          <img src="/images/no-files.png"></img>
        </div>
      )}
    </>
  );
}
