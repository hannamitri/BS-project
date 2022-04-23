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
    <div className="data-collected__card">
      <div>
        <div className="data-collected__image">
          <img src={dataCollectedImage} alt="" />
        </div>

        <div className="date-collected__data--wrapper">
          <div className="data-collected__date--wrapper">
            <div className="data-collected__date">
              {timeago.format(dataCollectedDate, "en_US")}
            </div>
            <div className="data-collected__date">08:10 am</div>
          </div>
          <h2 className="data-collected__title">Nights in Koura</h2>
          <div className="data-collected__description">
            {dataCollectedDescription}
          </div>
        </div>
      </div>
      <div className="data-collected__name">
        Posted by <span>Hanna Mitri</span>
      </div>
    </div>
  );
};

export default DataCollectedCard;
