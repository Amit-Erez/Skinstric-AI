import React from "react";

const Categories = () => {
  const savedObject = JSON.parse(localStorage.getItem("analysis"));
  const analysisData = savedObject?.data;

  console.log(analysisData);

  const raceData = analysisData?.race;
  let topRace = null;
  if (raceData) {
    topRace = Object.keys(raceData).reduce((a, b) =>
      raceData[a] > raceData[b] ? a : b
    );
  }

  const ageData = analysisData?.age;
  let topAge = null;
  if (ageData) {
    topAge = Object.keys(ageData).reduce((a, b) =>
      ageData[a] > ageData[b] ? a : b
    );
  }

  const genderData = analysisData?.gender;
  let topGender = null;
  if (genderData) {
    topGender = Object.keys(genderData).reduce((a, b) =>
      genderData[a] > genderData[b] ? a : b
    );
  }

  return (
    <div className="categories">
      <div className="ctg race__ctg">
        <p>{topRace}</p>
        <h4>Race</h4>
      </div>
      <div className="ctg age__ctg">
        <p>{topAge}</p>
        <h4>Age</h4>
      </div>
      <div className="ctg sex__ctg">
        <p>{topGender}</p>
        <h4>Sex</h4>
      </div>
    </div>
  );
};

export default Categories;
