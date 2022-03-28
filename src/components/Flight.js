import * as React from 'react';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import {
    useLocation,
    useHistory,
} from "react-router-dom";
import { getTickets, insertFlight } from '../api/api';
import flight from '../images/Flight.png';
import Contact from './Contact';
import ResuableDropdown from './ReusableDropdown';
import ResuableRadioButton from './ReusableRadioButton';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';


let info = {
    tableName: "Tickets",
    TicketNo: "TicketNo",
    Departure: "Departure"
}

let information = {
    tableName: "survey",
    id: "id",
    visitLebanon: "visitLebanon"
}



const Flight = ({ id }) => {


    const [data, setData] = useState([]);


    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        loadTickets();

    }, [])


    const loadTickets = async () => {
        const response = await getTickets();
        try {
            setData(response?.data);
            const userName = localStorage.getItem("username");
            console.log("UserName is " + localStorage.getItem("username"));
        } catch (error) {
            console.log(error);
        }
        finally {

        }
    }

    const purchaseFlight = (Ticket) => async (event) => {
        event.preventDefault();
        let Flight = {
            user_id: id,
            TicketNo: Ticket,
        }
        const info = await insertFlight(Flight);
        alert(info?.data.msg);
        history.push("/flight");
    }


    return (

        <div className="container-body text-center">
            <div className="row">
                <div className="col">
                    <img src={flight} alt="" class="img" />
                </div>
            </div>
            <div className="row" style={{ height: "40px" }}></div>
            <div className="container">
                <h1>Below are the available flights</h1>
                <div className="row" style={{ height: "40px" }}></div>
                <table className="table text-center" >
                    <thead>
                        <tr style={{ backgroundColor: "#282d32", color: "white" }}>
                            <th>Ticket Number</th>
                            <th>Time</th>
                            <th>Departure</th>
                            <th>Destination</th>
                            <th>Price</th>
                            <th>Purchase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (data) ? data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td >{item.TicketNo}</td>
                                        <td>{item.Time}</td>
                                        <td >{item.Departure}</td>
                                        <td >{item.Destination}</td>
                                        <td style={{ color: "red", fontWeight: "900" }}>${item.Price}</td>
                                        <td><button className="btn btn-primary" onClick={purchaseFlight(item.TicketNo)}>Purchase</button></td>
                                    </tr>
                                )
                            }) : null
                        }
                    </tbody>
                </table >
                <div className="row" style={{ height: '100px' }}>

                </div>


                <div className="col-12 desc">
                    <div className="col-12 text-center">
                        <div className="title" style={{ backgroundColor: "#282d32", color: "white" }}>
                            Prices of tickets with respect to departure location
                        </div>

                        <div style={{ height: "150px" }}>

                        </div>
                        <ResponsiveContainer aspect={2}>
                            <LineChart data={data} margin={{ right: 0 }} aspect={2}>
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="Departure"
                                    interval={'preserveStartEnd'} />
                                <YAxis type="number" domain={[0, 3500]}></YAxis>
                                <Legend />
                                <Tooltip />
                                <Line dataKey="Price"
                                    type="monotone" stroke="#8884d8" activeDot={{ r: 10 }} />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                    <div style={{ height: "150px" }}></div>
                </div>

                <div className="title" style={{ backgroundColor: "#282d32", color: "white" }}>
                    Please take 2 minitues to fill this survey:
                </div>

                <div className="description">
                    <h3 style={{
                        color: '#008060',
                        fontWeight: "900",
                    }}>Are you planning on visiting Lebanon soon?</h3>
                    <br />
                    <br />
                    <ResuableRadioButton information={information} style={{ width: "200px" }} id="select" />
                    <br />
                    <br />
                    <div className="row">
                        <div className="col">
                            Departure Location
                        </div>
                        <div className="col">
                            <ResuableDropdown info={info} style={{ width: "200px" }} id="select" />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="col">
                        <button style={{ marginLeft: "850px", backgroundColor: '#008060' }} className="btn btn-success" >Submit</button>
                    </div>
                </div>

            </div>
            <Contact />
        </div >


    );
}
export default Flight;