import React from 'react';

function Card({ country }) {
    return (
        <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">

            <div>
                <h2 style={{ fontSize: "24px" }}>{country.Name} , {country.Location}</h2>
            </div>
        </div>
    );
}

export default Card;