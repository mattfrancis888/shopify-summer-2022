import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "./Search";
import Nominees from "./Nominees";
import IronMan from "../img/IronMan.png";
import NASA from "../img/NASA.png";

import HomeCarousel from "./HomeCarousel";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import useOnScreen from "../useOnScreen";
import LazyLoad from "react-lazyload";
export interface Media {
    Title: string;
    Year: string;
    // imdbID: string;
    id: string;
    Type: string;
    Poster: string;
}

const Home: React.FC<{}> = () => {
    let [medias, setMedias] = useState<[]>([]);
    let localMedias = localStorage.getItem("media");
    useEffect(() => {
        if (localMedias != null) {
            let parsedLocalMedias = JSON.parse(localMedias);
            //load persisted cart into state if it exists
            // console.log(parsedLocalCart);
            setMedias(parsedLocalMedias);
        }
    }, []);

    const addItem = (item: Media) => {
        //create a copy of our cart state, avoid overwritting existing state
        let mediasCopy: any = [...medias];

        //assuming we have an ID field in our item
        // let { imdbID } = item;
        let { id } = item;

        //look for item in cart array
        let existingItem = mediasCopy.find(
            (mediaItem: Media) =>
                // mediaItem.imdbID === imdbID
                mediaItem.id === id
        );

        //if item already exists

        if (existingItem) {
        } else {
            //if item doesn't exist, simply add it
            mediasCopy.push(item);
        }

        //update app state
        setMedias(mediasCopy);

        //make cart a string and store in local space
        let stringMedias = JSON.stringify(mediasCopy);
        localStorage.setItem("media", stringMedias);
    };

    const removeItem = (id: String) => {
        //create cartCopy
        let mediasCopy: any = [...medias];

        mediasCopy = mediasCopy.filter(
            (item: Media) =>
                //  item.imdbID !== imdbID
                item.id !== id
        );

        //update state and local
        setMedias(mediasCopy);

        let mediaString = JSON.stringify(mediasCopy);
        localStorage.setItem("media", mediaString);
    };

    const translateTitle = useSpring({
        from: {
            transform: "translate3d(-10% , 0%, 0px)",
        },
        to: {
            transform: "translate3d(0% , 0%, 0px)",
        },

        config: {
            mass: 2,
            friction: 40,
            tension: 70,
        },
    });

    return (
        <React.Fragment>
            <HomeCarousel />
            <div className="homeContentSection">
                <div className="introBanner">
                    <animated.div
                        className="introBannerTextWrap"
                        // style={translateTitle}
                    >
                        <h1 className="introBannerTitle">
                            Explore Mars WIth Nasa
                        </h1>
                        <p className="introBannerTitleDesc">
                            Search rover pictures and like your top 5 pictures
                        </p>
                    </animated.div>
                    {/* <div className="modal__fade"></div> */}
                    {/* <img className="ironManImage" alt="" src={IronMan}></img> */}
                    <img className="nasaImage" alt="" src={NASA}></img>
                </div>

                <LazyLoad once={true}>
                    <Nominees medias={medias} removeItem={removeItem} />
                </LazyLoad>
                <LazyLoad once={true} offset={10}>
                    <Search medias={medias} addItem={addItem} />
                </LazyLoad>
            </div>
        </React.Fragment>
    );
};

export default Home;
