import { RESTAURANT_API } from "../utils/constant.js";
import RestaurantCard from "./RestaurantCard";
import { useState,useEffect } from "react";
import Shimmer from "./Shimmer.js";

export const Body = () => {
    const [listofrestaurants, setListofrestaurants] = useState([]);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData=async()=>{
        const data=await fetch(RESTAURANT_API)
        const json=await data.json()
        const  restaurantdata=json.data?.cards?.find((item)=>item?.card?.card?.id?.includes("restaurant_grid"))?.card?.card?.gridElements?.infoWithStyle?.restaurants
        setListofrestaurants(restaurantdata);
    }


    return ( listofrestaurants.length === 0 ?(
        <Shimmer/>):(    
        <div className="body">
            <div className="filter">
                <button 
                    className="filter-btn" 
                    onClick={() => {
                        setListofrestaurants( listofrestaurants.filter((res)=>res.ratings>4))
                        console.log(listofrestaurants)
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="res-container">
                {listofrestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                ))}
            </div>
        </div>
    ));
};
