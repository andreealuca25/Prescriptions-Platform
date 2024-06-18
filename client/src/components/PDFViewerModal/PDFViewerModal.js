import React, { useState } from "react";
import Modal from "react-modal";
import PDFItem from "../PDFItem/PDFItem";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import "./PDFViewerModal.css";
import Cookies from "js-cookie";
import { saveAs } from "file-saver";
import { useStylesInput } from "../Styles/InputStyle";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
function PDFViewerModal(props) {
  const role = useSelector((state) => state.role.value);
  const [modalIsOpen, setIsOpen] = useState(false);
  const classes = useStylesInput();
  return (
    <div>
      {role === "patient" && (
        <Button
          className={classes.bttn}
          onClick={() =>
            fetch("http://localhost:3001/updatePDF", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Expose-Headers": "auth-token",
                "auth-token": Cookies.get("jwt"),
              },
              body: JSON.stringify({ idPdf: props.idPdf }),
            })
          }
        >
          Marchează ca luată
        </Button>
      )}
      <Button
        className={classes.bttn}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Deschide
      </Button>
      <Button
        className={classes.bttn}
        onClick={() => {
          fetch("http://localhost:3001/deletePDF", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Expose-Headers": "auth-token",
              "auth-token": Cookies.get("jwt"),
            },
            body: JSON.stringify({ idPdf: props.idPdf }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.answer === "pdf found") props.onUpdate(true);
            });
        }}
      >
        Șterge
      </Button>
      <Modal
        style={customStyles}
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <Button
          className={classes.bttn}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          x
        </Button>

        <Button
          className={classes.bttn}
          onClick={() => {
            var canvas = document.getElementsByClassName(
              "react-pdf__Page__canvas"
            )[props.indexPdf];
            canvas.toBlob(function (blob) {
              saveAs(blob, "prescription.jpg");
            });
          }}
        >
          Descarcă
        </Button>
        <PDFItem base64data={props.pdf}></PDFItem>
      </Modal>
    </div>
  );
}

export default PDFViewerModal;
