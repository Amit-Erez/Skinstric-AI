import React from 'react'
import './Nav.css'
import { Link, useLocation } from 'react-router-dom'
import Intro from "../assets/Intro.svg"

const Nav = () => {
  const location = useLocation();
  const isSummary = location.pathname === "/summary";

  return (
    <header className={isSummary ? "nav nav--summary" : "nav"}>
        <div className="container">
           <div className="left__nav">
                <Link to={"/"}>
                <p>SKINSTRIC</p>
                </Link>
                <img src={Intro} alt='IntroImg' className='intro__img'/>
            </div> 
            <button className='code__btn'>ENTER CODE</button>
        </div>
    </header>
  )
}

export default Nav