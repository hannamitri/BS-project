import React, { useState, useEffect, useRef } from 'react';
import { fetchOptions } from '../api/api'

const ReusableDropdown = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, [])


    const loadData = async () => {
        console.log(props);
        let information = props.information;
        const response = await fetchOptions(information);
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

    const insertResults = async (event) => {
        event.preventDefault();
        let insertInformation = props.insertInformation;
        const info = await insertResults(insertInformation);
        alert(info?.data.msg);
    }



    return (
        <div className="container">

            {(data) ? (data.map((item, index) => {
                return (
                    <div key={index}>
                        <label className="containerR" for={item.id}>{item.visitLebanon}
                            <input type="radio" name="radio" id={item.id} />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                )
            })) : null}

        </div >
    );
};



export default ReusableDropdown;