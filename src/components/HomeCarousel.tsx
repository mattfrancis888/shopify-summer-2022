import React, { useEffect, useState, useRef } from "react";
import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useHistory } from "react-router-dom";
import useWindowDimensions from "../windowDimensions";
import history from "../browserHistory";
import {
    LG_SCREEN_SIZE,
    XL_SCREEN_SIZE,
    MED_SCREEN_SIZE,
    SM_SCREEN_SIZE,
} from "../constants";
import { useTransition, animated, useSpring, useTrail } from "react-spring";

import anime from "animejs/lib/anime.es.js";
const timer = 5000;

const slides = [
    {
        title: "Pic1",
        mobileImage:
            "http://www.nasa.gov/sites/default/files/thumbnails/image/wise_nebula.jpg",
        image: "http://www.nasa.gov/sites/default/files/thumbnails/image/wise_nebula.jpg",
        logo: "http://assets.stickpng.com/images/5ecec99f73e4440004f09e7c.png",
        description: "2020 Winner",
        fallbackMobileImage:
            "https://res.cloudinary.com/du8n2aa4p/image/upload/v1620418766/shopify1/Avengers-Infinity-War-Poster.jpg",
        fallbackImage:
            "https://res.cloudinary.com/du8n2aa4p/image/upload/v1620418766/shopify1/Avengers-Infinity-War-Poster.jpg",
        fallbackLogo:
            "http://assets.stickpng.com/images/5ecec99f73e4440004f09e7c.png",
    },
    {
        title: "Pic2",
        mobileImage:
            "https://image.cnbcfm.com/api/v1/image/106194367-1571709112694gettyimages-103017185.jpeg?v=1571710756&w=1600&h=900",
        image: "https://image.cnbcfm.com/api/v1/image/106194367-1571709112694gettyimages-103017185.jpeg?v=1571710756&w=1600&h=900",
        logo: "http://assets.stickpng.com/images/5ecec99f73e4440004f09e7c.png",
        description: "2019 Winner",
        fallbackMobileImage:
            "https://image.cnbcfm.com/api/v1/image/106194367-1571709112694gettyimages-103017185.jpeg?v=1571710756&w=1600&h=900",
        fallbackImage:
            "https://image.cnbcfm.com/api/v1/image/106194367-1571709112694gettyimages-103017185.jpeg?v=1571710756&w=1600&h=900",
        fallbackLogo:
            "http://assets.stickpng.com/images/5ecec99f73e4440004f09e7c.png",
    },
    {
        title: "Pic3",
        mobileImage:
            "https://www.jpl.nasa.gov/edu/images/news/helixnebula-169.jpg",
        image: "https://www.jpl.nasa.gov/edu/images/news/helixnebula-169.jpg",
        logo: "http://assets.stickpng.com/images/5ecec99f73e4440004f09e7c.png",
        description: "2018 Winner",
        fallbackMobileImage:
            "https://www.jpl.nasa.gov/edu/images/news/helixnebula-169.jpg",
        fallbackImage:
            "https://www.jpl.nasa.gov/edu/images/news/helixnebula-169.jpg",
        fallbackLogo:
            "http://assets.stickpng.com/images/5ecec99f73e4440004f09e7c.png",
    },
];

// const slides = [
//     {
//         title: "Crash Bandicoot",
//         mobileImage: "",
//         image:
//             "https://images.blz-contentstack.com/v3/assets/blte0bbc3c063f45866/blt7bcb2291026d0dde/6025e2a8415d5f4e80324945/D2R_2021_Blizzard.comDesktop_2500x514_MB01.png",
//         logo: "",
//         description: "Coming Soon!",
//     },
//     {
//         title: "Warzone",
//         mobileImage: "",
//         image:
//             "https://images.blz-contentstack.com/v3/assets/blte0bbc3c063f45866/blt430768244603486e/6036f8ed0b1d853be8ad56fc/CODCW_S2_Keyart-Bnet-Home_Banner_Desktop_Home-2500x514.webp?auto=webp&format=pjpg",
//         logo: "",
//         description: "Season 2  now live",
//     },
// ];
interface IShowSlide {
    index: number;
    stopAutoplay: boolean;
}
const HomeCarousel: React.FC<{}> = () => {
    const { width } = useWindowDimensions();
    const [showSlide, setShowSlide] = useState<IShowSlide>({
        index: 0,
        stopAutoplay: false,
    });

    const itemEls = useRef(new Array());
    useEffect(() => {
        let fillTimeOut: any;
        if (!showSlide.stopAutoplay) {
            itemEls.current[showSlide.index].children[0].click();
            fillTimeOut = setTimeout(() => {
                //Note: dont put  itemEls.current[showSlide].children[0].click();
                //here, for some reason it acts weird
                if (showSlide.index > slides.length - 2) {
                    //Reset after third button
                    setShowSlide({
                        index: 0,
                        stopAutoplay: false,
                    });
                } else
                    setShowSlide({
                        index: showSlide.index + 1,
                        stopAutoplay: false,
                    });
            }, timer);
        } else {
            itemEls.current[showSlide.index].children[0].click();
        }
        //There is a reason why I used anime.js, look at renderSlides()
        anime({
            targets: ".pictureImageWrap",
            opacity: [
                {
                    value: [0, 1],
                    duration: timer,
                    easing: "easeOutQuad",
                },
            ],
            translateX: [
                {
                    value: ["0%", "2%"],
                    duration: timer,
                    easing: "easeOutQuad",
                },
            ],
        });

        anime({
            targets: ".slideImageLogoAndDescWrap",
            opacity: [
                {
                    value: [0, 1],
                    duration: timer,
                    easing: "easeOutQuad",
                },
            ],
            translateX: [
                {
                    value: ["0%", "2%"],
                    duration: timer,
                    easing: "easeOutQuad",
                },
            ],
        });

        return () => {
            clearTimeout(fillTimeOut);
        };
    }, [showSlide]);

    const transition = useTransition(showSlide, {
        from: {
            transform: "translate3d(2% , 0px, 0px)",

            opacity: 0,
        },
        enter: {
            transform: "translate3d(0px , 0px, 0px)",
            opacity: 1,
        },

        config: {
            duration: timer,
        },
    });

    const fill = useTransition(showSlide, {
        from: {
            width: "0%",
        },
        enter: {
            width: "100%",
        },

        config: {
            duration: timer,
        },
    });

    const renderSlides = () => {
        return slides.map((slide, index) => {
            return (
                <Slide
                    index={index}
                    key={index}
                    className={`homeCarouselContainer`}
                >
                    <div className="backgroundContainer">
                        {/* Whenever the slide gets clicked, it makes a network request for the image becasue of
                        the hook this is bad.
                        Issue on: https://github.com/pmndrs/react-spring/discussions/1377
                        I solved this by using animejs to animate it;
                        // it will NOT make a new network request call when we re-render 
                        // with a hook's setStatd - 
                        //we are manipulating button onclick instead of using it to render a
                        //image with a new src :)
                        {transition((style, item) => {
                            return (
                                <animated.div
                                    className="pictureImageWrap"
                                    style={style}
                                >
                                     <picture>
                                        <source
                                            media={`(min-width:${MED_SCREEN_SIZE}px)`}
                                            srcSet={slide.image}
                                        />
                                        <source
                                            media={`(min-width:320px`}
                                            srcSet={slide.mobileImage}
                                        />

                                        <img src={slide.image} alt="project" />
                                    </picture> 
                                </animated.div>
                            );
                        })} */}

                        <div className="pictureImageWrap">
                            <picture>
                                <source
                                    media={`(min-width:${MED_SCREEN_SIZE}px)`}
                                    srcSet={slide.image}
                                    onError={(e: any) => {
                                        e.target.onError = null;
                                        e.target.src = `${slide.fallbackImage}`;
                                    }}
                                />
                                <source
                                    media={`(min-width:320px`}
                                    srcSet={slide.mobileImage}
                                    onError={(e: any) => {
                                        e.target.onError = null;
                                        e.target.src = `${slide.fallbackMobileImage}`;
                                    }}
                                />

                                <img
                                    src={slide.image}
                                    onError={(e: any) => {
                                        e.target.onError = null;
                                        e.target.src = `${slide.fallbackImage}`;
                                    }}
                                    alt="project"
                                />
                            </picture>
                        </div>
                        {/* Same situation as above
                         {transition((style, item) => {
                            return (
                                <div
                                    className={`slideImageLogoAndDescWrap
                                    `}
                                >
                                    <animated.div style={style}>
                                        <img
                                            className="slideImageLogo"
                                            src={slide.logo}
                                            alt="game slide"
                                            onError={(e: any) => {
                                                e.target.onError = null;
                                                e.target.src = `${slide.fallbackLogo}`;
                                            }}
                                        ></img>
                                        <h1 className="slideDesc">
                                            {slide.description}
                                        </h1>
                                    </animated.div>
                                </div>
                            );
                        })} */}
                        <div
                            className={`slideImageLogoAndDescWrap
                                    `}
                        >
                            <div>
                                <img
                                    className="slideImageLogo"
                                    src={slide.logo}
                                    alt="game slide"
                                    onError={(e: any) => {
                                        e.target.onError = null;
                                        e.target.src = `${slide.fallbackLogo}`;
                                    }}
                                ></img>
                                <h1 className="slideDesc">
                                    {slide.description}
                                </h1>
                            </div>
                        </div>
                    </div>
                </Slide>
            );
        });
    };

    const renderDots = () => {
        return slides.map((slide, index) => {
            return (
                <div
                    className="dotInnerWrap"
                    key={index}
                    //Because of the ref click above, using onClick={..} would trigger this unintentionally
                    //But if we do onfocus, when a user clicks on the button, it will stop the autoplay
                    onFocus={() => {
                        //If we don't use the setHook below, the animation for slide changing won't be rendered.
                        setShowSlide({ index: index, stopAutoplay: true });
                    }}
                    ref={(element) => (itemEls.current[index] = element)}
                >
                    {fill((style, item) => {
                        return (
                            <Dot
                                disabled={false}
                                //Must USE DISABLED, OR else when the carousel first renders..Dot's onclick won't be rendered
                                // for the first Dot because it was automatically selected by the carousel
                                slide={index}
                                children={
                                    item.index === index ? (
                                        <animated.div
                                            className={
                                                item.stopAutoplay
                                                    ? "dotFillHide"
                                                    : "dotFill"
                                            }
                                            style={style}
                                        ></animated.div>
                                    ) : (
                                        ""
                                    )
                                }
                            />
                        );
                    })}
                </div>
            );
        });
    };

    const renderHeight = () => {
        if (width < SM_SCREEN_SIZE) {
            return 90;
        } else if (width < MED_SCREEN_SIZE) {
            return 70;
        } else if (width < LG_SCREEN_SIZE) {
            return 50;
        } else if (width < XL_SCREEN_SIZE) {
            return 50;
        } else if (width >= XL_SCREEN_SIZE) {
            return 40;
        }
        return 1;
    };

    const renderCarousel = (): JSX.Element | JSX.Element[] => {
        return (
            <div
                onMouseEnter={(e) => {
                    // setStyle({ opacity: "1" });
                }}
                onMouseLeave={(e) => {
                    // setStyle({ opacity: "0" });
                }}
            >
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={renderHeight()}
                    visibleSlides={1}
                    totalSlides={slides.length}
                    infinite={true}
                    step={1}
                    // isPlaying={stopAutoplay ? false : true}
                    // interval={5000}
                >
                    <div className="sliderAndDotWrap">
                        <Slider>{renderSlides()}</Slider>
                        <div className="dotWrap">{renderDots()}</div>
                    </div>
                </CarouselProvider>
            </div>
        );
    };

    return <div>{renderCarousel()}</div>;
};

export default HomeCarousel;
