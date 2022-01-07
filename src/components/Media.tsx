import React, { useState, useEffect, useRef } from "react";

import Modal from "./Modal";
import { Media as MediaType } from "./Home";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import axios from "axios";
import { MAX_NOMINEE } from "./Nominees";
export interface ModalProps {
    onDismiss(): void;
    title?: string;
    content?: JSX.Element;
    actions?: JSX.Element;
    animation?: any;
    fade?: any;
}

// export const mockObj = {
//     Title: "The Avengers",
//     Year: "2012",
//     Rated: "PG-13",
//     Released: "04 May 2012",
//     Runtime: "143 min",
//     Genre: "Action, Adventure, Sci-Fi",
//     Director: "Joss Whedon",
//     Writer: "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
//     Actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
//     Plot:
//         "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
//     Language: "English, Russian, Hindi",
//     Country: "USA",
//     Awards: "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
//     img_src:
//         "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
// };

interface MediaProps {
    media: any;

    children: any;
}

interface ModalDataType {
    img_src: string;
    rover: any;
    camera: any;
    earth_date: string;
    // Type: string;
    // Year: string;
    // Genre: string;
    // Plot: string;
    // Actors: string;
}
const Media: React.FC<MediaProps> = (props) => {
    let { media } = props;
    const [showModal, setShowModal] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [modalData, setModalData] = useState<ModalDataType | null>(null);

    const transition = useTransition(showModal, {
        from: {
            transform: showModal ? "scale(0)" : "scale(1)",
        },
        enter: {
            transform: showModal ? "scale(1)" : "scale(0)",
        },

        config: {
            duration: 450,
        },
    });
    const fade = useSpring({
        from: {
            backgroundColor: showModal
                ? "rgba(52, 49, 49, 0)"
                : "rgba(52, 49, 49, 0.4)",
            pointerEvents: showModal ? "all" : "none",
        },
        to: {
            backgroundColor: showModal
                ? "rgba(52, 49, 49, 0.4)"
                : "rgba(52, 49, 49, 0)",
            pointerEvents: showModal ? "all" : "none",
        },
    });

    const modalShow = (clickedMedia: any) => {
        setFirstRender(false);
        console.log("modal", clickedMedia);
        setModalData(clickedMedia);
        setShowModal(true);
        // const LINK = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${clickedMedia.imdbID}`;

        // const LINK = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&id=${clickedMedia.id}&api_key=${process.env.REACT_APP_API_KEY}`;
        // axios
        //     .get(LINK)
        //     .then((response) => {
        //         // handle success
        //         //  setShowLoading(false);

        //         // setModalData(response.data.photos[0]);

        //         setShowModal(true);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         // dataSet(INTERNET_ERROR);
        //         console.log("API ERROR:", error);
        //         alert("Check your internet connection and try again");
        //         //setShowLoading(false);
        //     });
    };
    const modalOnCancel = () => {
        setShowModal(false);
    };

    const renderModal = () => {
        return transition((style, item) => {
            if (!firstRender)
                return (
                    <Modal
                        animation={style}
                        fade={fade}
                        content={renderModalContent()}
                        onDismiss={modalOnCancel}
                    />
                );
            else {
                <Modal
                    content={renderModalContent()}
                    onDismiss={modalOnCancel}
                />;
            }
        });
    };

    const renderModalContent = () => {
        if (modalData)
            return (
                <div className="modalContentContainer" onLoad={() => {}}>
                    <div className="modal__banner">
                        <div className="modal__banner-image-wrap">
                            <img src={modalData.img_src} alt=""></img>

                            <div className="modal__fade"></div>
                        </div>
                    </div>
                    <div className="modal__info">
                        <div className="modal__info-text modal__info-text--date-and-desc">
                            <h1 className="modal__media-title">
                                {modalData.rover.name} Rover
                            </h1>
                            <h3 className="modal__media-type">
                                Status: {modalData.rover.status}
                            </h3>
                            <p className="modal__media-desc-other">{`Camera: ${modalData.camera.full_name}`}</p>
                            <p className="modal__media-desc-other">{`Date: ${modalData.earth_date}`}</p>
                            {/* <p className="modal__media-plot">{modalData.Plot}</p>
                            <p className="modal__media-desc-other">
                                {`Cast: ${modalData.Actors}`}
                            </p> */}
                        </div>
                    </div>
                </div>
            );
    };

    return (
        <React.Fragment>
            {renderModal()}
            <div
                className="nomineeMedia"
                onClick={() => {
                    modalShow(media);
                }}
            >
                {props.children}
            </div>
        </React.Fragment>
    );
};
export default Media;
