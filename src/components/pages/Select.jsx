import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Select.css";
import selDmndLrg from "../../assets/selDmndLrg.svg";
import selDmndMed from "../../assets/selDmndMed.svg";
import selDmndSml from "../../assets/selDmndSml.svg";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconRight from "../../assets/buttin-icon-right.svg";
import iconFrame from "../../assets/rect-outer-line.svg";

const Select = () => {
  const [hover, setHover] = useState(null);
  const objectRef = useRef(null);

  return (
    <section id="select">
      <div className="select__title">
        <h1>A.I Analysis</h1>
        <p>
          A.I. has estimated the following. 
          <br />
          Fix estimated information if needed.
        </p>
      </div>
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
          <Link
            to={"/summary"}
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
      <Link to={"/result"}>
        <button id="back__btn">
          <img src={iconLeft} alt="left icon" className="back__arrow" />
          <img src={iconFrame} alt="left icon" className="icon__frameL" />
          <p>BACK</p>
        </button>
      </Link>
      <Link to={"/summary"}>
          <button id="summary__btn">
            <p className="summary__btn--desktop-p">GET SUMMARY</p>
            <p className="summary__btn--mobile-p">SUM</p>
            <img src={iconRight} alt="right icon" className="proceed__arrow" />
            <img src={iconFrame} alt="left icon" className="icon__frameR" />
          </button>
        </Link>
    </section>
  );
};

export default Select;
