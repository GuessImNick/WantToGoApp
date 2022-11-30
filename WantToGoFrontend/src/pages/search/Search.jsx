import React, { useState } from "react";
import "./Search.css";
import { RiSearchLine, RiCloseLine, RiSearchEyeLine } from "react-icons/ri";
import { RestaurantApi } from "../../api/restaurantApi";
import RestaurantCard from "../../components/restaurantCard/RestaurantCard";

const Search = () => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState({});


  const getRestaurants = async () => {
    if(searchString.length > 0) {
        const results = await RestaurantApi.searchRestaurants(searchString);
        setSearchResults(results);
    }
  }

  const onKeyDown = (e) => {
    const elem = document.querySelector('.searchInput');
    if (elem === document.activeElement && e.key === 'Enter') {
            getRestaurants();    
    }
  };

  const clearSearch = () => {
    setSearchResults({});
    setSearchString("");
  }

  return (
    <div className="seach-container">
      <div className="search-header">
        <RiSearchLine className="search-icons" />
        <input
          type="text"
          placeholder="Search for a restaurant..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="searchInput"
          onKeyDown={onKeyDown}
        />
        {searchString.length > 0 ? (
          <RiCloseLine className="search-icons" onClick={clearSearch} />
        ) : (
          <div className="x-filler"></div>
        )}
      </div>
      <div className="search">
        {searchResults.length > 0 ? searchResults.map(res => <RestaurantCard restaurant={res} key={res.id} />) : (
          <div className="no-notifications">
            <RiSearchEyeLine className="no-notifcation-icon" />
            <p>Start Typing to begin searching for a restaurant!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
