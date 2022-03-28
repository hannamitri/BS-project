import React, { useState } from 'react';
import SearchList from './SearchList';
import '../components/App.css'



function Search({ details }) {

    const [searchField, setSearchField] = useState("");


    const filteredCountries = details.filter(
        country => {
            return (
                country
                    .Name
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                country
                    .Location
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            );
        }
    );


    var list = document.getElementById("searchList");
    var Name = document.getElementById("Name");

    const handleChange = e => {
        setSearchField(e.target.value);
        list.style.display = "block";

        if (Name.value.length == 0)
            list.style.display = "none";
    }

    const display = () => {

    }



    function searchList() {
        return (
            <SearchList filteredCountries={filteredCountries} />
        );
    }

    return (
        <section className="garamond">
            <br />

            <div className="pa2 text-center">
                <input className="pa3 bb br3 grow b--none bg-lightest-blue ma3 Name"
                    type="search" id="Name"
                    placeholder="Search by Location or Name"
                    onChange={handleChange}
                />
            </div>
            <br />
            <br />
            <div id="searchList">
                {searchList()}
            </div>

        </section>
    );
}

export default Search;