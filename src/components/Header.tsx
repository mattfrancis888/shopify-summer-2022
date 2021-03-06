import React, { useState, useEffect } from "react";
import useWindowDimensions from "../windowDimensions";
import Modal from "./Modal";
import { LG_SCREEN_SIZE, MED_SCREEN_SIZE } from "../constants";
import { useSpring, useTransition, animated } from "react-spring";
import { GiHamburgerMenu } from "react-icons/gi";
// import LolSvg from "./LoLSvg";
const Header = () => {
    return (
        <nav role="navigation">
            <img
                className="logo"
                alt="logo"
                src="https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png"
            />
            <div className="header-text-wrap">
                <h1>Spacestagram - Mars</h1>
            </div>
        </nav>
    );
};

export default Header;
