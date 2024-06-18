import React, { useState, useRef } from "react";

export default function MedicalDrugsList(props) {
  const [drugName, setDrugName] = useState("");
  const [drugQuantity, setDrugQuantity] = useState("");
  const prescriptionList = useRef();
  const prescriptionLine = useRef();
  return (
    <>
      <ul
        id="prescript-list"
        style={{ listStyle: "none", alignSelf: "center" }}
        ref={prescriptionList}
      ></ul>
      <div className="prescription-line" ref={prescriptionLine}>
        <input
          type="text"
          value={drugName}
          id="drugName"
          onChange={(event) => {
            setDrugName(event.target.value);
          }}
        ></input>
        <input
          type="text"
          value={drugQuantity}
          id="quantity"
          onChange={(event) => {
            setDrugQuantity(event.target.value);
          }}
        ></input>
        <button
          className="plus-button plus-button--small"
          onClick={() => {
            let node = document.createElement("li");
            let prescription = document.createElement("p");
            let rmvBttn = document.createElement("button");
            let iRmv = document.createElement("i");

            prescription.innerText = drugName + " - " + drugQuantity;
            prescription.setAttribute("contenteditable", "true"); //so you can edit the content
            prescription.style.display = "inline-block";
            /*in order to have the medicine and the remove button on the same line*/
            node.appendChild(prescription);

            rmvBttn.className = "rmv-bttn";
            iRmv.className = "fa fa-remove";
            rmvBttn.appendChild(iRmv);
            rmvBttn.onclick = () => {
              node.style.display = "none";
            };

            node.appendChild(rmvBttn);
            prescriptionList.current.appendChild(node);
            setDrugName("");
            setDrugQuantity("");
          }}
        >
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
        <button
          onClick={() => {
            let drugs = Array(),
              sourceTarget = Array();
            let items = prescriptionList.current.getElementsByTagName("li");
            for (let i = 0; i < items.length; i++) {
              drugs.push(items[i].innerText.split("-")[0]);
            }
            for (let i = 0; i < drugs.length; i++)
              for (let j = i + 1; j < drugs.length; j++)
                sourceTarget.push(drugs[i] + "-" + drugs[j]);
            props.onAdding(drugs, sourceTarget);

            //display only the drugName and quantity
            prescriptionLine.current.style.display = "none";
            var rmvBttns = document.getElementsByClassName("rmv-bttn");
            for (let i = 0; i < rmvBttns.length; i++)
              rmvBttns.item(i).style.display = "none";
          }}
        >
          <i className="fa fa-check" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
