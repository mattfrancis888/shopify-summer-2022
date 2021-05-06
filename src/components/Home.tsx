import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
import NoImageFound from "../img/NoImageFound.jpg";
export interface Media {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
const MAX_NOMINEE = 5;
const Home: React.FC<{}> = () => {
    let [cart, setCart] = useState<[]>([]);
    let localCart = localStorage.getItem("cart");
    useEffect(() => {
        if (localCart != null) {
            let parsedLocalCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            // console.log(parsedLocalCart);
            setCart(parsedLocalCart);
        }
    }, []);

    const addItem = (item: Media) => {
        //create a copy of our cart state, avoid overwritting existing state
        let cartCopy: any = [...cart];

        //assuming we have an ID field in our item
        let { imdbID } = item;

        //look for item in cart array
        let existingItem = cartCopy.find(
            (cartItem: Media) => cartItem.imdbID === imdbID
        );

        //if item already exists

        if (existingItem) {
        } else {
            //if item doesn't exist, simply add it
            cartCopy.push(item);
        }

        //update app state
        setCart(cartCopy);

        //make cart a string and store in local space
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart);
    };

    const removeItem = (imdbID: String) => {
        //create cartCopy
        let cartCopy: any = [...cart];

        cartCopy = cartCopy.filter((item: Media) => item.imdbID !== imdbID);

        //update state and local
        setCart(cartCopy);

        let cartString = JSON.stringify(cartCopy);
        localStorage.setItem("cart", cartString);
    };

    const renderMedias = () => {
        if (cart) {
            if (cart.length > 0)
                return (
                    <React.Fragment>
                        {cart.map((media: Media, index: number) => {
                            return (
                                <div key={index} className="nomineeMedia">
                                    <img
                                        src={
                                            media.Poster !== "N/A"
                                                ? media.Poster
                                                : NoImageFound
                                        }
                                        onError={(e: any) => {
                                            e.target.src = NoImageFound; // some replacement image
                                            // e.target.style = 'padding: 8px; margin: 16px' // inline styles in html format
                                        }}
                                        alt="poster"
                                    />
                                    <div className="nomineeMediaTextWrap">
                                        <h1>{media.Title}</h1>
                                        <p>{media.Year}</p>
                                    </div>
                                    <button
                                        className="removeButton"
                                        onClick={() => removeItem(media.imdbID)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                    </React.Fragment>
                );
            else {
                return (
                    <h1 className="noResultText">You Have No Nominations</h1>
                );
            }
        }
    };

    return (
        <React.Fragment>
            <div className="introBanner">
                <img
                    className="introBannerImage"
                    alt=""
                    src="https://allears.net/wp-content/uploads/2020/10/Avengers-Infinity-War-Poster.jpg"
                ></img>
                <div className="introBannerTextWrap">
                    <h1 className="introBannerTitle">2021 Nominees</h1>
                    <p className="introBannerTitleDesc">
                        Search titles on OMDB and nominate your top 5.
                    </p>
                </div>
                <div className="modalFade"></div>
                <img
                    className="ironManImage"
                    alt=""
                    src="https://purepng.com/public/uploads/large/purepng.com-ironmanironmansuperheromarvel-comicscharactermarvel-studiosrobert-downey-jrtony-stark-1701528612052n7gmm.png"
                ></img>
            </div>
            <div className="searchAndNomineeSection">
                <Searchbar cart={cart} addItem={addItem} />
                <h1 className="searchAndNomineeTitle">Nominees</h1>

                {
                    //@ts-ignore
                    cart.length === MAX_NOMINEE && (
                        <div className="maxNomineesBanner">
                            <h1 className="maxNomineesTitle">
                                Your 2021 Winners
                            </h1>
                            <p className="maxNomineesDesc">
                                You have picked your top 5 nominees
                            </p>
                        </div>
                    )
                }
                <div className="nomineeMediaContainer">{renderMedias()}</div>
            </div>
        </React.Fragment>
    );
};

export default Home;
