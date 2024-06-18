import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CreatePrescription.css";
import MedicalDrugsList from "../MedicalDrugsList/MedicalDrugsList";
import * as html2pdf from "html2pdf.js";
import SignatureCanvas from "react-signature-canvas";
import Cookies from "js-cookie";
import { ageCalculator } from "../../usefulFunc/ageCalculator";
import { Button } from "@mui/material";
import { useStylesInput } from "../Styles/InputStyle";
export default function CreatePrescription() {
  const { id } = useParams();
  const doctorSealRef = useRef();
  const imgUploaderRef = useRef();
  const clearBttnRef = useRef();
  const checkBttnRef = useRef();
  const prescriptionFormRef = useRef();
  const [persInfo, setPersInfo] = useState({});
  const [medicalDrugs, setMedicalDrugs] = useState([]);
  const [sourceTarget, setSourceTarget] = useState([]); //for creating the graphs for medicalDrugs
  const classes = useStylesInput();
  useEffect(() => {
    fetch("http://localhost:3001/patient/getInfoOnId", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Expose-Headers": "patient-id",
        "patient-id": id,
        "Access-Control-Expose-Headers": "auth-token",
        "auth-token": Cookies.get("jwt"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => setPersInfo(data));
  }, [id]);

  const addMedicalDrugs = (data, st) => {
    setMedicalDrugs(data);
    setSourceTarget(st);
  };
  return (
    <div className="prescriptions-and-bttns">
      <div className="prescription-form" ref={prescriptionFormRef}>
        <div className="top-part">
          <div className="top-part-1">
            <div className="block">
              <label>Unitatea sanitara: </label>
              <input defaultValue="default" type="text" />
            </div>
            <div className="block">
              <label>Localitatea: </label>
              <input type="text"></input>
            </div>
            <div className="block">
              <label>Judetul: </label>
              <input type="text"></input>
            </div>
          </div>
          <div className="top-part-2">
            <label>Gratuit:</label>
            <div className="block">
              <label>Da</label>
              <input type="radio" name="gratuit"></input>
            </div>
            <div className="block">
              <label>Nu</label>
              <input type="radio" name="gratuit"></input>
            </div>
          </div>
        </div>
        <h1 style={{ alignSelf: "center" }}>Reteta medicala</h1>
        <div className="CNP-box">
          <h3>CNP</h3>
          {Array.from({ length: 13 }, (value, key) => (
            <input
              type="text"
              key={key}
              className="CNP-digit"
              pattern="\d"
              maxLength="1"
              // defaultValue={persInfo.CNP[key]}
            />
          ))}
        </div>
        <div className="middle-part">
          <div className="block-personal-info-wrapper">
            <div className="block">
              <label>Numele: </label>
              <input defaultValue={persInfo.familyName} type="text"></input>
            </div>
            <div className="block">
              <label>Prenumele</label>
              <input defaultValue={persInfo.firstName} type="text"></input>
            </div>
            <div className="block">
              <label>Sex</label>
              <label>F</label>
              <input type="radio" name="sex"></input>
              <label>M</label>
              <input type="radio" name="sex"></input>
            </div>
            <div className="block">
              <label>Varsta</label>
              <input
                type="number"
                key={ageCalculator(persInfo.dateOfBirth)}
                defaultValue={ageCalculator(persInfo.dateOfBirth)}
                style={{ width: "40px" }}
              ></input>
            </div>
          </div>
          <div className="address-info-wrapper">
            <label>Domiciliat: </label>
            <div className="block">
              <label>Judetul</label>
              <input type="text"></input> <br />
            </div>
            <div className="block">
              <label>Localitatea</label>
              <input type="text"></input>
            </div>
            <div className="block">
              <label>Strada</label>
              <input type="text"></input>
            </div>
          </div>
          <div className="diagnosis-and-more-wrapper">
            <div className="block">
              <label>Nr</label>
              <input type="number"></input>
            </div>
            <div className="block">
              <label>Nr fisa</label>
              <input type="number"></input>
            </div>
            <div className="block">
              <label>Diagnostic</label>
              <input type="text"></input>
            </div>
          </div>
        </div>
        <div
          style={{ alignSelf: "center" }}
          className="prescriptions-block-wrapper"
        >
          <label style={{ marginLeft: "5%" }}>Reteta prescrisa:</label>
          <MedicalDrugsList onAdding={addMedicalDrugs} />
        </div>
        <div className="bottom-part">
          <div className="block">
            <label>Data:</label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            ></input>
          </div>
          <div style={{ display: "flex" }} className="block">
            <label>Semnatura:</label>
            <button
              className="clear-bttn"
              ref={clearBttnRef}
              style={{ height: "25px" }}
              onClick={() => {
                const canvas = document.getElementsByClassName("sigCanvas")[0];
                const context = canvas.getContext("2d");
                context.clearRect(0, 0, canvas.width, canvas.height);
              }}
            >
              <i className="fa fa-undo" aria-hidden="true"></i>
            </button>
            <button
              className="check-bttn"
              ref={checkBttnRef}
              style={{ height: "25px" }}
            >
              <i className="fa fa-check" aria-hidden="true" />
            </button>
            <SignatureCanvas
              penColor="black"
              canvasProps={{
                width: 100,
                height: 50,
                className: "sigCanvas",
              }}
            />
          </div>
          <div className="block">
            <label>Parafa medicului: </label>
            <img
              ref={doctorSealRef}
              id="doctor-seal"
              src=""
              alt="Doctor Seal"
            />
            <div ref={imgUploaderRef} className="img-uploader">
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={(event) => {
                  let fReader = new FileReader();
                  try {
                    fReader.readAsDataURL(event.target.files[0]);
                  } catch (error) {
                    console.log(error);
                  }
                  fReader.onload = function (e) {
                    //waits until the result of the FileReader is ready
                    doctorSealRef.current.src = fReader.result;
                  };
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="save-bttns">
        <Button
          className={classes.formButton}
          sx={{ margin: "5%" }}
          onClick={() => {
            clearBttnRef.current.style.display = "none"; //remove the buttons
            checkBttnRef.current.style.display = "none";
            imgUploaderRef.current.style.display = "none";

            let opt = {
              margin: 1,
              jsPDF: {
                format: "a4",
                orientation: "portrait",
              },
            };

            html2pdf()
              .from(prescriptionFormRef.current)
              .set(opt)
              .save(
                `prescription-${persInfo.firstName}-${persInfo.familyName}.pdf`
              );
          }}
        >
          Salvează
        </Button>
        <Button
          className={classes.formButton}
          sx={{ margin: "5%" }}
          onClick={() => {
            clearBttnRef.current.style.display = "none"; //remove the buttons
            checkBttnRef.current.style.display = "none";
            imgUploaderRef.current.style.display = "none";

            let opt = {
              margin: 1,
              jsPDF: {
                format: "a4",
                orientation: "portrait",
              },
            };

            html2pdf()
              .from(prescriptionFormRef.current)
              .set(opt)
              .toPdf()
              .output("blob")
              .then((data) => {
                var reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onloadend = function () {
                  var base64data = reader.result;
                  fetch("http://localhost:3001/insertPDF", {
                    method: "POST",
                    body: JSON.stringify({
                      idPatient: id,
                      idDoctor: Cookies.get("jwt"),
                      addedDate: new Date(),
                      status: "pending",
                      pdfFile: base64data,
                      medicalDrugs: medicalDrugs,
                      sourceTarget: sourceTarget,
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
              });
          }}
        >
          Trimite pacientului
        </Button>
      </div>
    </div>
  );
}
