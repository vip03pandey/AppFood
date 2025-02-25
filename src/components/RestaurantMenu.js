import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constant";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const {resId}=useParams();
  console.log(resId)

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const response = await fetch(`${MENU_API}${resId}`);
    const data = await response.json();
    // restaurantdata=data?.data?.cards?.find((item)=>item?.card?.card["@type"].includes("type.googleapis.com/swiggy.presentation.food.v2.Restaurant"))?.card?.card.info
    setResInfo(data); // Extract only the needed info
  };

  if (!resInfo) return <Shimmer />; // Wait for the data to load

  const {name,cuisines,costForTwoMessage,avgRating,totalRatingsString}=resInfo?.data?.cards?.find((item)=>item?.card?.card["@type"].includes("type.googleapis.com/swiggy.presentation.food.v2.Restaurant"))?.card?.card.info;
  // const {itemCards}=resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>c.card?.["card"]?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
  console.log(resInfo?.data?.cards[2]?.card?.card?.info.name)
  // console.log(resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>c.card?.["card"]?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"))
  // // @type: "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2 className="menu-title">{cuisines.join(", ")}</h2>
      <h2 className="menu-title">{costForTwoMessage}</h2>
      <h2 className="menu-title">{avgRating}</h2>
      <h2 className="menu-title">{totalRatingsString}</h2>
      <ul className="menu-list">
        <li>Burger</li>
        <li>Pizza</li>
        <li>Pasta</li>
        <li>Salad</li>
        <li>Sushi</li>
      </ul>
    </div>
  );
};

export default RestaurantMenu;
