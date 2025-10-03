import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Circular = () => {
  const savedObject = JSON.parse(localStorage.getItem("analysis"));
  const analysisData = savedObject?.data;

  const raceData = analysisData?.race;
  let topRace = null;
  if (raceData) {
    topRace = Object.keys(raceData).reduce((a, b) =>
      raceData[a] > raceData[b] ? a : b
    );
  }

  return (
    <div className="circular">
      <p className="circular__title">{topRace}</p>
      <div className="circular__container">
        <CircularProgressbar
          className="circle"
          strokeWidth={1.5}
          value={Math.floor(raceData[topRace] * 100)}
          styles={buildStyles({
            pathColor: "#000", // progress color
            textColor: "#000", // text color
            trailColor: "#C1C2C3", // background circle
            textSize: "10px",
            strokeLinecap: "butt",
          })}
        />
        <p className="circle__value">
          {Math.floor(raceData[topRace] * 100)}
          <span>%</span>
        </p>
      </div>
    </div>
  );
};

export default Circular;
