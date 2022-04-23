import React from "react";
import "./DataCollectedCard.scss";
import * as timeago from "timeago.js";

const DataCollectedCard = ({
  dataCollectedImage,
  dataCollectedDate,
  dataCollectedLocation,
  dataCollectedTime,
  dataCollectedDescription,
}) => {
  return (
    <div>
      <div className="data-collected__image">
        <img src={dataCollectedImage} alt="" />
      </div>
      <div>
        <div className="data-collected__date">
          {timeago.format(dataCollectedDate, "en_US")}
          {console.log(dataCollectedDate)}
        </div>
      </div>
    </div>
  );
};

export default DataCollectedCard;
