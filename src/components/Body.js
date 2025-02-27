import { RESTAURANT_API } from "../utils/constant.js";
import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer.js";
import { Link } from "react-router-dom";
import React from "react";
export const Body = () => {
    const [listofrestaurants, setListofrestaurants] = useState([]);
    const [filteredRestro, setfilteredRestro] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
    const [searchText, setsearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const toggleFilter = () => {
        if (isFiltered) {
            setfilteredRestro(listofrestaurants);
        } else {
            setfilteredRestro(listofrestaurants.filter((res) => res.info.avgRating > 4));
        }
        setIsFiltered(!isFiltered);
    };

    const fetchData = async () => {
        const data = await fetch(RESTAURANT_API);
        const json = await data.json();
        const restaurantdata = json.data?.cards?.find((item) =>
            item?.card?.card?.id?.includes("restaurant_grid")
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        setListofrestaurants(restaurantdata);
        setfilteredRestro(restaurantdata);
    };

    const handleSearch = () => {
        const filteredData = listofrestaurants.filter((res) =>
            res.info.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setfilteredRestro(filteredData);
    };

    return listofrestaurants.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="m-3 p-4">
                <input
                    type="text"
                    placeholder="Search for restaurant..."
                    value={searchText}
                    onChange={(e) => setsearchText(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="filter">
                <button className="filter-btn" onClick={toggleFilter}>
                    {isFiltered ? "Show All" : "Top Rated Restaurants"}
                </button>
            </div>
            <div className="res-container">
                {filteredRestro.map((restaurant) => (
                    <Link to={"/restaurant/" + restaurant.info.id} key={restaurant.info.id}>
                        <RestaurantCard resData={restaurant} />
                    </Link>
                ))}
            </div>
        </div>
    );
};
