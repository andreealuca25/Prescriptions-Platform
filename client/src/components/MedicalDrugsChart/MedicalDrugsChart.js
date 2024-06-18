import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
export default function MedicalDrugsChart() {
  const { id } = useParams();
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/getAllMedicationsForPatient", {
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
        let map = new Map();
        for (let drug in data.answer.medicalDrugs) {
          let key = data.answer.medicalDrugs[drug];
          if (map.get(key)) map.set(key, 1 + map.get(key));
          else map.set(key, 1);
        }

        let labels = [],
          values = [],
          colors = [];
        for (const [key, value] of map) {
          labels.push(key);
          values.push(value);
          colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
        }
        setLabels(labels);
        setValues(values);
        setBackgroundColors(colors);
      });
  }, [id]);
  console.log(backgroundColors);
  const state = {
    labels: labels,
    datasets: [
      {
        label: "Medicamente",
        backgroundColor: backgroundColors,
        borderWidth: 2,
        data: values,
      },
    ],
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Uzul mediu de medicamente",
            fontSize: 40,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}
