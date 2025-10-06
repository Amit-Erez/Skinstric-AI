import React from "react";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconRight from "../../assets/buttin-icon-right.svg";
import iconFrame from "../../assets/rect-outer-line.svg";
import Grid from "../Grid";

import "./Summary.css";

const Summary = () => {

  return (
    <section id="summary">
      <div className="sum__container">
        <div className="sum__top">
          <h2>A.I. Analysis</h2>
          <h3>Demographics</h3>
          <h4>Predicted Race & Age</h4>
        </div>
        <div className="grid__margin-top"></div>
        <Grid />
        <div className="sum__footer">
          <Link to={"/select"}>
            <button id="back__btn--sum">
              <img src={iconLeft} alt="left icon" className="back__arrow sum" />
              <img src={iconFrame} alt="" className="mobile__sum--no-arrow" />
              <p>BACK</p>
            </button>
          </Link>
          <p className="sum__footer-para">
            If A.I. estimate is wrong, select the correct one
          </p>
          <Link to={"/"}>
            <button id="home__btn">
              <p>HOME</p>
              <img
                src={iconRight}
                alt="right icon"
                className="proceed__arrow--home"
              />
              <img src={iconFrame} alt="" className="mobile__sum--no-arrow" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Summary;
