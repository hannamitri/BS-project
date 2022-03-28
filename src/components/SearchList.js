import React from 'react';
import Card from './Card';

function SearchList({ filteredCountries }) {

    const filtered = filteredCountries.map(country => <Card key={country.Name} country={country} />);

    const displayResult = () => {
        if (filteredCountries.length === 0) {
            return (<div style={{ fontSize: "30px" }}> No Result! Try entering another Location or Name.</div >);
        }
    }


    return (
        <div className="text-center">
            {filtered}
            {
                displayResult()
            }
        </div>

    );
}

export default SearchList;