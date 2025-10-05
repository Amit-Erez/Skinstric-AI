import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import radioButton from "../assets/radio-button.svg";
import radioButtonSel from "../assets/radio-button-selected.svg";
import "./Grid.css";

const Grid = () => {
  const [sort, setSort] = useState("race");
  const [selected, setSelected] = useState({
    race: null,
    age: null,
    gender: null,
  });

  const savedObject = JSON.parse(localStorage.getItem("analysis"));
  const analysisData = savedObject?.data;
  const sortData = analysisData?.[sort];
  const sortArray = sortData ? Object.entries(sortData) : [];

  const getTopKey = (obj) =>
    obj ? Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b)) : null;

  const topRace = getTopKey(analysisData?.race);
  const topAge = getTopKey(analysisData?.age);
  const topGender = getTopKey(analysisData?.gender);

  useEffect(() => {
    if (!selected[sort] && sortData) {
      const topKey = getTopKey(sortData);
      setSelected((prev) => ({
        ...prev,
        [sort]: { label: topKey, value: sortData[topKey] },
      }));
    }
  }, [sort, sortData]);

  const current = selected[sort];

  return (
    <div className="chart__grid">
      <div className="categories">
        <div className={`ctg race__ctg ${sort === "race" ? "active" : ""}`} onClick={() => setSort("race")}>
          <p>{selected.race ? selected.race.label : topRace}</p>
          <h4>Race</h4>
        </div>
        <div className={`ctg age__ctg ${sort === "age" ? "active" : ""}`} onClick={() => setSort("age")}>
          <p>{selected.age ? selected.age.label : topAge}</p>
          <h4>Age</h4>
        </div>
        <div className={`ctg gender__ctg ${sort === "gender" ? "active" : ""}`} onClick={() => setSort("gender")}>
          <p>{selected.gender ? selected.gender.label : topGender}</p>
          <h4>Sex</h4>
        </div>
      </div>
      <div className="circular">
        <p className="circular__title">
          {current?.label}
          {sort === "age" && (
            <span style={{ textTransform: "lowercase" }}> y.o.</span>
          )}
        </p>
        <div className="circular__container">
          <CircularProgressbar
            className="circle"
            strokeWidth={1.5}
            value={Math.floor((current?.value || 0) * 100)}
            styles={buildStyles({
              pathColor: "#000", // progress color
              textColor: "#000", // text color
              trailColor: "#C1C2C3", // background circle
              textSize: "10px",
              strokeLinecap: "butt",
            })}
          />
          <p className="circle__value">
            {Math.floor((current?.value || 0) * 100)}
            <span>%</span>
          </p>
        </div>
        <p className="mobile__circ--para">If A.I. estimate is wrong, select the correct one.</p>
      </div>
      <div className="ctg__info">
        <div className="ctg__info--container">
          <div className="ctg__info--title">
            <h4>Race</h4>
            <h4>A.I. Confidence</h4>
          </div>
          {sortArray &&
            sortArray.map(([label, value]) => (
              <div
                className={`ctg__info--percentage ${
                  current?.label === label ? "selected" : ""
                }`}
                key={label}
                onClick={() =>
                  setSelected((prev) => ({
                    ...prev,
                    [sort]: { label, value },
                  }))
                }
              >
                <div className="left__title">
                  {current?.label === label ? (
                    <img src={radioButtonSel} alt="" />
                  ) : (
                    <img src={radioButton} alt="" />
                  )}
                  <span>{label}</span>
                </div>
                <span className="value">{Math.floor(value * 100)}%</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
