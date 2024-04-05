import React, { useState, useEffect } from "react";
import { app } from "./config";
import { one } from "./table";
import systems from "./systems.json";
import "./PeriodicTable.css";

export default function PeriodicTable() {
  const [element, setElement] = useState("");
  const data = one.filter((item) => item.name.toLowerCase() === element.trim());
  const newdata = systems;
  console.log(newdata.prefixes);

  return (
    <div className="table_container">
      <div className="container">
        <h1 className="title">The Periodic Tabletop</h1>
        <input
          className="input"
          type="text"
          name="element"
          value={element}
          onChange={(e) => setElement(e.target.value)}
        />
        {data.map((point) => (
          <div>
            <div
              style={{
                backgroundColor: "#" + point["cpk-hex"] + 75,
                color: "#bbbbbb",
              }}
              className="tab"
            >
              <small>{point.number}</small>
              <label className="symbol">{point.symbol}</label>
              <label>{point.name}</label>
              <small>{point.atomic_mass}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="chatbot">
        {data.map((point) => (
          <div className="info_container">
            <label className="element_name">{point.name}</label>
            <div className="small_container">
              <small style={{ marginRight: 12, paddingBottom: 10 }}>
                <strong>Number:</strong>
                {point.number}
              </small>
              |{" "}
              <small style={{ marginRight: 12, paddingBottom: 10 }}>
                <strong>Period:</strong>
                {point.period}
              </small>
              |{" "}
              <small style={{ marginRight: 12, paddingBottom: 10 }}>
                <strong>Group:</strong>
                {point.group}
              </small>
            </div>
            <div>
              <small htmlFor="" style={{ marginRight: 12, paddingBottom: 10 }}>
                <strong>Melt Point:</strong>
                {point.melt}K
              </small>{" "}
              |{" "}
              <small style={{ marginRight: 12, paddingBottom: 10 }}>
                <strong>Boil Point:</strong>
                {point.boil}K
              </small>
            </div>
            <small style={{ marginRight: 12, paddingBottom: 10 }}>
              <strong>Energy Levels:</strong>
              {point.shells.map((item) => (
                <small style={{ marginRight: 8 }}>{item}</small>
              ))}
            </small>
            <small
              style={{
                marginRight: 12,
                paddingBottom: 10,
                textTransform: "capitalize",
              }}
            >
              <strong htmlFor="">{point.category}</strong>
            </small>
            <label>{point.summary}</label>
            <img
              src={point.image.url}
              style={{ width: 350, marginTop: 24 }}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
