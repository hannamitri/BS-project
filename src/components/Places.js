import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import places from '../images/places-1.png';
import Rouche from '../images/Rouche.jpeg';
import Baatara from '../images/Baatara.jpeg';
import Bacchus from '../images/Bacchus.jpeg';
import Sidon from '../images/Sidon.jpeg';
import Tannourine from '../images/Tannourine.jpeg';
import Island from '../images/Island.jpeg';
import Contact from './Contact';
import Search from './Search'
import { getCountrybyCategory } from '../api/api';


const Places = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadPlaces();
    }, [])

    const loadPlaces = async () => {


        let Country = {
            Category: "Sites"
        }

        const response = await getCountrybyCategory(Country);

        try {
            setData(response?.data);
        } catch (error) {
            console.log(error);
        }
        finally {

        }
    }

    function displayImages(Image) {
        if (Image === 'Rouche') {
            return (<img src={Rouche} alt="" className="img countryImages" />);
        }
        else if (Image === 'Baatara') {
            return (<img src={Baatara} alt="" className="img countryImages" />);
        }
        else if (Image === 'Bacchus') {
            return (<img src={Bacchus} alt="" className="img countryImages" />);
        }
        else if (Image === 'Sidon') {
            return (<img src={Sidon} alt="" className="img countryImages" />);
        }
        else if (Image === 'Tannourine') {
            return (<img src={Tannourine} alt="" className="img countryImages" />);
        }
        else if (Image === 'Island') {
            return (<img src={Island} alt="" className="img countryImages" />);
        }


    }

    return (
        <div className="container-body" style={{ backgroundColor: "#282d32", color: "white" }}>
            <div className="row">
                <div className="col">
                    <img src={places} alt="" class="img" />
                </div>
            </div>

            <div className="row search">
                <div className="col-12">
                    <h2 className="text-center">Search for Places to visit</h2>
                </div>
                <div className="col">
                    <Search details={data} />
                </div>
            </div>

            < div className="row" style={{ backgroundColor: "white" }} >
                <div className="col" style={{ height: "90px" }}>
                </div>
            </div>
            {
                (data) ? data.map((item, index) => {

                    return (

                        <div className="row" key={index} >
                            <div className="col-1" style={{ backgroundColor: "white" }} ></div>
                            <div className="col-4" style={{ backgroundColor: "white" }} >
                                {displayImages(item.Image)}
                            </div>

                            <div className="col-1" style={{ backgroundColor: "white" }} ></div>
                            <div className="col-5 information ">
                                <br />
                                <div className="name">{item.Name}</div>
                                <br />
                                <div className="details">Located in: {item.Location}</div>
                                <br />
                                <div className="details">{item.Description}</div>
                                <br />
                            </div>
                            <div className="col-1" style={{ backgroundColor: "white" }} ></div>
                            < div className="row" style={{ backgroundColor: "white" }} >
                                <div className="col" style={{ height: "90px" }}>
                                </div>
                            </div>
                        </div >

                    )

                }) : null
            }
            <Contact />

        </div >

    );
}
export default Places;