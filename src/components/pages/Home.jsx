import React, { useState } from "react";
import "./Home.css";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconRight from "../../assets/buttin-icon-right.svg";

function leftHover() {
  document.querySelector(".main__heading").classList.add("moveright");
  document.querySelector(".skincare").classList.add("moveright");
  document.getElementById("right__section").classList.add("moveright")
}

function rightHover() {
  document.querySelector(".main__heading").classList.add("moveleft")
  document.querySelector(".skincare").classList.add("moveleft")
  document.getElementById("left__section").classList.add("moveleft")
}

function leftUnhover() {
  document.querySelector(".main__heading").classList.remove("moveright");
  document.querySelector(".skincare").classList.remove("moveright");
  document.getElementById("right__section").classList.remove("moveright")
}

function rightUnhover() {
   document.querySelector(".main__heading").classList.remove("moveleft");
  document.querySelector(".skincare").classList.remove("moveleft");
  document.getElementById("left__section").classList.remove("moveleft")
}

const Home = () => {
  return (
    <section id="landing">
      <div className="landing__wrapper">
        <div className="main__container">
          <div className="main__heading">
            <h1 className="skinspan">
              Sophisticated
              <br />
              <span className="skincare">skincare</span>
            </h1>
          </div>
        </div>
        <div className="landing__para">
          <p>
            Skinstric developed an A.I. that creates a
            <br />
            highly-personalised routine tailored to
            <br />
            what your skin needs.
          </p>
        </div>
        <div id="left__section">
          <div className="relative__left">
            <div className="left__box"></div>
          </div>
          <button
            id="discover__btn"
            onMouseEnter={leftHover}
            onMouseLeave={leftUnhover}
          >
            <img src={iconLeft} alt="left icon" className="discover__arrow" />
            <p>DISCOVER A.I</p>
          </button>
        </div>
        <div id="right__section">
          <div className="relative__right">
            <div className="right__box"></div>
          </div>
          <button id="test__btn"
          onMouseEnter={rightHover}
            onMouseLeave={rightUnhover}>
            <p>TAKE TEST</p>
            <img src={iconRight} alt="right icon" className="test__arrow" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
