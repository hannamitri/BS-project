import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import travel from "../images/travel-1.png";
import { useLocation, Link } from "react-router-dom";

import Contact from "./Contact";
import map from "../images/map.png";
import Fall from "../images/Fall.jpeg";
import Winter from "../images/Winter.jpeg";
import Summer from "../images/Summer.jpeg";
import Spring from "../images/Spring.jpeg";
import WeatherApiTable from "./WeatherApiTable";

const Travel = ({ id }) => {
  let location = useLocation();

  useEffect(() => {
    console.log(location?.state?.Name);
  }, []);

  return (
    <div className="container-body">
      <div className="row">
        <div className="col image">
          <img src={travel} alt="" class="img" />
        </div>
      </div>

      <div className="row">
        <div className="col-1"></div>
        <div className="col-5 image about-text">
          <div className="about">
            <br />
            <span className="text-center">About Lebanon</span>
            <br />
            <div className="about">
              Lebanon, country located on the eastern shore of the Mediterranean
              Sea; it consists of a narrow strip of territory and is one of the
              world’s smaller sovereign states. The capital is Beirut.It has 7
              districts as you can see on the map. The Lebanon Mountains, which
              run parallel to the western coast, cover most of the country,
              while on the eastern border is the Anti-Lebanon range.Between the
              two lies the Bekaa Valley, the principal agricultural area.
            </div>
          </div>
        </div>

        <div className="col-6">
          <img src={map} alt="" class="img" />
        </div>
      </div>

      <div className="row seasons">
        <div className="col-12 text-center">
          <h1> Lebanon's Four Seasons</h1>
        </div>

        <div className="row" style={{ height: "40px" }}></div>

        <div className="row season-first-row">
          <div className="col-5 text-center">
            <img src={Fall} alt="" class="img" />
            <label className="caption">Fall Season</label>
          </div>
          <div className="col-5 text-center ">
            <img src={Winter} alt="" class="img" />
            <label className="caption">Winter Season</label>
          </div>
        </div>

        <div className="row" style={{ height: "40px" }}></div>

        <div className="row season-first-row">
          <div className="col-5 text-center">
            <img src={Summer} alt="" class="img" />
            <label className="caption ">Summer Season</label>
          </div>
          <div className="col-5 text-center">
            <img src={Spring} alt="" class="img" />
            <label className="caption text-center">Spring Season</label>
          </div>
        </div>

        <div
          className="col-12"
          style={{
            height: "150px",
            backgroundColor: "white",
          }}
        ></div>

        <div className="col-12 desc">
          <div className="col-12 text-center">
            <div className="title-about">About Lebanon's Four Seasons</div>
          </div>

          <div className="description">
            Lebanon has a typically Mediterranean climate, characterized by a
            long, hot, and dry summer. Winter can be rather cool and rainyThere
            are four seasons in Lebanon. Summer (June to September) is hot on
            the coast and cooler in the mountains. Spring and autumn are warm
            and pleasant. Winter (December to mid March) is the rainy season,
            with major precipitation. Traveling to Lebanon during any season
            will result in an enjoyable trip full fo tourism and activities to
            do.
          </div>
        </div>
        {/* <div style={{ height: "100px", backgroundColor: "#282d32" }}>

                </div> */}

        <div
          className="col-2"
          style={{
            height: "150px",
            backgroundColor: "white",
          }}
        ></div>
        <div
          className="col-8"
          style={{
            height: "150px",
            backgroundColor: "#282d32",
            width: "auto",
            color: "white",
          }}
        >
          <div className="title-about text-center" style={{ color: "white" }}>
            View Lebanon's Live Weather in ℃
          </div>
        </div>
        <div
          className="col-2"
          style={{
            height: "150px",
            backgroundColor: "white",
          }}
        ></div>

        <div
          className="row"
          style={{
            height: "100px",
            backgroundColor: "white",
          }}
        ></div>

        <div className="description">
          <WeatherApiTable />
        </div>
      </div>

      <Contact />
    </div>
  );
};
export default Travel;
