import {CDN_URL} from "../utils/constant";

const RestaurantCard = (props) => {
    const { resData } = props;
    const {cloudinaryImageId,name,cuisines,costForTwo,avgRating}=resData?.info
    console.log(resData.name);

    return (
        <div className="res-card">
            <img 
                className="res-logo" 
                src={CDN_URL+cloudinaryImageId}
                alt={resData.name}
            />
            <h3>{name}</h3>
            <h4>{cuisines}</h4>
            <h4>{costForTwo}</h4>
            <h4>{avgRating}</h4>
        </div>
    );
};

export default RestaurantCard;
