import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import activities from '../images/Activities.png';
import museum from '../images/museum.jpeg';
import Sursock from '../images/Sursock.jpeg';
import Kadisha from '../images/Kadisha.jpeg';
import Mzaar from '../images/Mzaar.jpeg';
import Zaituna from '../images/Zaituna.jpeg';
import paragliding from '../images/paragliding.jpeg';
import Ksara from '../images/Ksara.jpeg';
import Contact from './Contact';
import climbing from '../images/climbing.jpeg';
import Search from './Search'
import { getCountrybyCategory } from '../api/api';


const Activities = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        loadPlaces();
    }, [])

    const loadPlaces = async () => {
        let Country = {
            Category: "Activities"
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
        if (Image === 'museum') {
            return (<img src={museum} alt="" className="img countryImages" />);
        }
        else if (Image === 'Sursock') {
            return (<img src={Sursock} alt="" className="img countryImages" />);
        }
        else if (Image === 'Kadisha') {
            return (<img src={Kadisha} alt="" className="img countryImages" />);
        }
        else if (Image === 'Mzaar') {
            return (<img src={Mzaar} alt="" className="img countryImages" />);
        }
        else if (Image === 'Zaituna') {
            return (<img src={Zaituna} alt="" className="img countryImages" />);
        }
        else if (Image === 'Ksara') {
            return (<img src={Ksara} alt="" className="img countryImages" />);
        }
        else if (Image === 'paragliding') {
            return (<img src={paragliding} alt="" className="img countryImages" />);
        }
        else if (Image === 'climbing') {
            return (<img src={climbing} alt="" className="img countryImages" />);
        }

    }





    return (

        <div className="container-body" style={{ backgroundColor: "#282d32", color: "white" }} >
            < div className="row" >
                <div className="col">
                    <img src={activities} alt="" class="img" />
                </div>
            </div >


            <div className="row search">
                <div className="col-12">
                    <h2 className="text-center">Search for Activities to try</h2>
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
                                <div className="name">{item.Name}</div>
                                <div className="details">Located in: {item.Location}</div>
                                <div className="details">{item.Description}</div>
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
export default Activities;