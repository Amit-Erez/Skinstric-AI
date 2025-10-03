import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconRight from "../../assets/buttin-icon-right.svg";
import iconFrame from "../../assets/rect-outer-line.svg";
import radioButton from "../../assets/radio-button.svg";
import Categories from "../Categories";
import Circular from "../Circular";
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
        <div className="chart__grid">
           <Categories /> 
           <Circular />
          
          <div className="ctg__info">
            <div className="ctg__info--container">
              <div className="ctg__info--title">
                <h4>Race</h4>
                <h4>A.I. Confidence</h4>
              </div>
              <div className="ctg__info--percentage">
                <div className="left__title">
                  <img src={radioButton} alt="" />
                  <span>Middle eastern</span>
                </div>
                <span className="value">65%</span>
              </div>
              <div className="ctg__info--percentage">
                <div className="left__title">
                  <img src={radioButton} alt="" />
                  <span>Middle eastern</span>
                </div>
                <span className="value">65%</span>
              </div>
              <div className="ctg__info--percentage">
                <div className="left__title">
                  <img src={radioButton} alt="" />
                  <span>Middle eastern</span>
                </div>
                <span className="value">65%</span>
              </div>
              <div className="ctg__info--percentage">
                <div className="left__title">
                  <img src={radioButton} alt="" />
                  <span>Middle eastern</span>
                </div>
                <span className="value">65%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sum__footer">
          <Link to={"/select"}>
            <button id="back__btn--sum">
              <img src={iconLeft} alt="left icon" className="back__arrow" />
              <img src={iconFrame} alt="left icon" className="icon__frameL" />
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
                className="proceed__arrow home"
              />
              <img src={iconFrame} alt="left icon" className="icon__frameR" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Summary;
