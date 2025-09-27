import React, { useState } from "react";
import { Link } from "react-router-dom";
import MiniHome from "./MiniHome";
import "./Home.css";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconRight from "../../assets/buttin-icon-right.svg";

const Home = () => {
  const [hoverSide, setHoverSide] = useState(null);

  return (
    <section id="landing">
      <div className="landing__wrapper">
        <div className="main__container">
          <div
            className={`main__heading ${
              hoverSide === "left" ? "moveright" : ""
            } ${hoverSide === "right" ? "moveleft" : ""}`}
          >
            <h1 className="skinspan">
              Sophisticated
              <br />
              <span
                className={`skincare ${
                  hoverSide === "left" ? "moveright" : ""
                } ${hoverSide === "right" ? "moveleft" : ""}`}
              >
                skincare
              </span>
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
        <div
          id="left__section"
          className={hoverSide === "right" ? "moveleft" : ""}
        >
          <div className="relative__left">
            <div className="left__box"></div>
          </div>
          <button
            id="discover__btn"
            onMouseEnter={() => setHoverSide("left")}
            onMouseLeave={() => setHoverSide(null)}
          >
            <img src={iconLeft} alt="left icon" className="discover__arrow" />
            <p>DISCOVER A.I</p>
          </button>
        </div>
        <div
          id="right__section"
          className={hoverSide === "left" ? "moveright" : ""}
        >
          <div className="relative__right">
            <div className="right__box"></div>
          </div>
          <Link to={"./testing"}>
            <button
              id="test__btn"
              onMouseEnter={() => setHoverSide("right")}
              onMouseLeave={() => setHoverSide(null)}
            >
              <p>TAKE TEST</p>
              <img src={iconRight} alt="right icon" className="test__arrow" />
            </button>
          </Link>
        </div>
        <div id="mini__landing">
          <div className="miniborders">
            <div className="inner__border"></div>
            <div className="outer__border"></div>
          </div>
          <MiniHome />
        </div>
      </div>
    </section>
  );
};

export default Home;
