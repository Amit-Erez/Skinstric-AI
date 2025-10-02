import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Select.css";
import selDmndLrg from "../../assets/selDmndLrg.svg";
import selDmndMed from "../../assets/selDmndMed.svg";
import selDmndSml from "../../assets/selDmndSml.svg";

const Select = () => {
  const [hover, setHover] = useState(null);

  return (
    <section id="select">
      <div className="select__container">
      <img
        src={selDmndLrg}
        alt=""
        className={`selDmnd selDmndLrg ${hover === "large" ? "hover" : ""}`}
      />
      <img
        src={selDmndMed}
        alt=""
        className={`selDmnd selDmndMed ${hover === "medium" ? "hover" : ""}`}
      />
      <img
        src={selDmndSml}
        alt=""
        className={`selDmnd selDmndSml ${hover === "small" ? "hover" : ""}`}
      />
        <div className="gridBox">
          <Link to={"/summary"}
            className="cell demographics"
            onMouseEnter={() => {
              setHover("small");
            }}
            onMouseLeave={() => {
              setHover(null);
            }}
          >
            <div className="gridDmndDark"></div>
            <p className="cell__para">DEMOGRAPHICS</p>
          </Link>
          <div
            className="cell cosmetic"
            onMouseEnter={() => {
              setHover("medium");
            }}
            onMouseLeave={() => {
              setHover(null);
            }}
          >
            <div className="gridDmndLight"></div>
            <p className="cell__para">COSMETIC CONCERNS</p>
          </div>
          <div
            className="cell skin"
            onMouseEnter={() => {
              setHover("medium");
            }}
            onMouseLeave={() => {
              setHover(null);
            }}
          >
            <div className="gridDmndLight"></div>
            <p className="cell__para">SKIN TYPE DETAILS</p>
          </div>
          <div
            className="cell weather"
            onMouseEnter={() => {
              setHover("large");
            }}
            onMouseLeave={() => {
              setHover(null);
            }}
          >
            <div className="gridDmndLight"></div>
            <p className="cell__para">WEATHER</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Select;
