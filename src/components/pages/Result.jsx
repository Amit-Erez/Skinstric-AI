import React, { useRef } from "react";
import "./Result.css";
import smallDmnd from "../../assets/Rectangle 2779.svg";
import medDmnd from "../../assets/Rectangle 2780.svg";
import lrgDmnd from "../../assets/Rectangle 2778.svg";
import camera from "../../assets/camera.svg";
import camline from "../../assets/CamLine.svg";
import gallery from "../../assets/gallery.svg";
import iconLeft from "../../assets/buttin-icon-left.svg";
import iconFrame from "../../assets/rect-outer-line.svg"
import { Link } from "react-router-dom";

const Result = () => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("File chosen:", file);
  };

  return (
    <section id="result">
      <div className="to__start">
        <p>TO START ANALYSIS</p>
      </div>
      <div className="result__container">
        <div className="leftBox">
          <img src={camera} alt="take photo" className="camera__icon" />
          <img src={smallDmnd} alt="" className="dmnd small__dmnd" />
          <img src={medDmnd} alt="" className="dmnd med__dmnd" />
          <img src={lrgDmnd} alt="" className="dmnd lrg__dmnd" />
          <img src={camline} alt="" className="camline" />
          <div className="cam__text">
            <p>
              allow A.I.
              <br />
              to scan your face
            </p>
          </div>
        </div>
        <div className="rightBox">
          <img
            src={gallery}
            alt="Upload"
            onClick={handleImageClick}
            className="gallery__icon"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <img src={smallDmnd} alt="" className="dmnd small__dmndR" />
          <img src={medDmnd} alt="" className="dmnd med__dmndR" />
          <img src={lrgDmnd} alt="" className="dmnd lrg__dmndR" />
          <img src={camline} alt="" className="camlineR" />
          <div className="gal__text">
            <p>
              allow A.I.
              <br />
              access gallery
            </p>
          </div>
        </div>
      </div>
      <Link to={"/testing"}>
        <button id="back__btn">
          <img src={iconLeft} alt="left icon" className="back__arrow" />
          <img src={iconFrame} alt="left icon" className="icon__frameL" />
          <p>BACK</p>
        </button>
      </Link>
    </section>
  );
};

export default Result;
