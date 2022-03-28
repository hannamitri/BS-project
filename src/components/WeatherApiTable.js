import React, { useState, useEffect, useRef } from 'react';


const TableExternal = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            console.log("fetching weather.")
            getWeatherData();
        }, 2 * 1000);
        return () => clearInterval(interval);
    }, []);



    const getWeatherData = async () => {
        const url = "https://api.openweathermap.org/data/2.5/weather?q=Beirut&units=metric&APPID=2334e3880a1325e8cbef4b5368ee97d6"

        let response = await fetch(url, {
            method: "GET",
        });

        let result = await response.json();

        let item = {
            temp: 0,
            feelsLike: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            humidity: 0,
        };

        let data = [];

        Object.entries(result.main).forEach(([key, value]) => {
            item = {
                temp: Number(result.main.temp),
                feelsLike: Number(result.main.feels_like),
                temp_min: Number(result.main.temp_min),
                temp_max: Number(result.main.temp_max),
                pressure: Number(result.main.pressure),
                humidity: Number(result.main.humidity),
            }
        });

        data.push(item)
        setData(data);
    }


    return (
        <div className="container">
            <table className="table" >
                <thead>
                    <tr className="text-center">

                        <th>Temperature </th>
                        <th>Feels like temperature</th>
                        <th>Lowest temperature</th>
                        <th>Highest temperature</th>
                        <th>Pressure</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        (data) ? data.map((item, index) => {
                            return (
                                <tr key={index} className="text-center">

                                    <td>{item.temp}</td>
                                    <td >{item.feelsLike}</td>
                                    <td >{item.temp_min}</td>
                                    <td >{item.temp_max}</td>
                                    <td >{item.pressure}</td>
                                    <td >{item.humidity}</td>

                                </tr>
                            )
                        }) : null
                    }

                </tbody>
            </table >
        </div >

    )
}



export default TableExternal;
