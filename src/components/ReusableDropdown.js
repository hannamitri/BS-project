import React, { useState, useEffect, useRef } from 'react';
import { fetchRefData } from '../api/api'


const ReusableDropdown = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, [])


    const loadData = async () => {
        console.log(props);
        let info = props.info;
        const response = await fetchRefData(info);
        console.log(response);
        const userName = localStorage.getItem("user");

        try {
            setData(response?.data);
        } catch (error) {
            console.log(error);
        }
        finally {
        }
    }



    return (
        <div className="container">
            <select>
                {(data) ? (data.map((item, index) => {
                    return (<option key={index} id={item.TicketNo}>{item.Departure}</option>)
                })) : null}
            </select>
        </div >
    );
};



export default ReusableDropdown;