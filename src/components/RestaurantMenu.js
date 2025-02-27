import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API ,RESTAURANT_MENU_IMG} from "../utils/constant";
import React from "react";
import "/menu.css";
const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [resMenu, setResMenu] = useState([]);
  const { resid } = useParams();

  useEffect(() => {
      // Fetching Restaurant Menu
      const fetchRestaurantMenu = async () => {
          try {
              const response = await fetch(MENU_API + resid);
              if (!response.ok) {
                  throw new Error("Failed to fetch restaurant menu");
              } else {
                  const json = await response.json();

                  // Restaurant info data
                  const restaurantInfo = json?.data?.cards?.find((obj) =>
                      obj?.card?.card["@type"]?.includes("food.v2.Restaurant")
                  )?.card?.card?.info;

                  // Restaurant menu data
                  const menuData = json?.data?.cards
                      ?.find((obj) => obj?.groupedCard)
                      ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
                          (obj) =>
                              obj?.card?.card["@type"]?.includes(
                                  "ItemCategory"
                              ) ||
                              obj?.card?.card["@type"]?.includes(
                                  "NestedItemCategory"
                              )
                      );

                  const organisedMenuData = menuData?.map((obj) => {
                      const type = obj?.card?.card["@type"];
                      const title = obj?.card?.card?.title;
                      const itemCards = obj?.card?.card?.itemCards;
                      const categories = obj?.card?.card?.categories;

                      if (type?.includes("Nested")) {
                          return {
                              title,
                              type: "nested",
                              categories: categories?.map((subcategory) => ({
                                  title: subcategory?.title,
                                  itemCards: subcategory?.itemCards
                              }))
                          };
                      } else {
                          return {
                              title,
                              type: "item",
                              itemCards
                          };
                      }
                  });
                  setResInfo(restaurantInfo);
                  setResMenu(organisedMenuData);
              }
          } catch (err) {
              console.error(err.message);
          }
      };
      fetchRestaurantMenu();
  }, []);

  if (resInfo === null) return <Shimmer />;

  const { name, areaName, cuisines, costForTwoMessage } = resInfo;

  return (
      <div
          className="menu-container"
          style={{
              margin: "30px auto"
          }}
      >
          <div
              style={{
                  margin: "0 0 20px 0"
              }}
          >
              <h2>{name}</h2>
              <p>
                  Outlet: <span>{areaName}</span>
              </p>
              <p>
                  {cuisines?.join(", ")} - {costForTwoMessage}
              </p>
          </div>

          <div className="menu-categories">
              {resMenu?.map((category) =>
                  category?.type === "nested" ? (
                      <NestedMenuCategory
                          key={category?.title}
                          category={category}
                      />
                  ) : (
                      <MenuCategory
                          key={category?.title}
                          category={category}
                      />
                  )
              )}
          </div>
      </div>
  );
};

const MenuCategory = (props) => {
  const { category } = props;
  return (
      <div className="menu-category">
          <h3 className="category-name">
              <div>
                  {category?.title} ({category?.itemCards?.length})
              </div>
              <span>▼</span>
          </h3>
          <div className="menu-items">
              {category?.itemCards?.map((item) => (
                  <MenuItem
                      key={item?.card?.info?.id}
                      item={item?.card?.info}
                  />
              ))}
          </div>
      </div>
  );
};

const NestedMenuCategory = (props) => {
  const { category } = props;
  return (
      <div className="nested-menu-category">
          <h3 className="nested-category-name">{category?.title}</h3>
          {category?.categories?.map((subcategory) => (
              <div
                  style={{
                      padding: "20px 0 0 40px"
                  }}
                  key={subcategory?.title}
              >
                  <h4 className="category-name">
                      <div>
                          {subcategory?.title} (
                          {subcategory?.itemCards?.length})
                      </div>
                      <span>▼</span>
                  </h4>
                  <div className="menu-items">
                      {subcategory?.itemCards?.map((item) => (
                          <MenuItem
                              key={item?.card?.info?.id}
                              item={item?.card?.info}
                          />
                      ))}
                  </div>
              </div>
          ))}
      </div>
  );
};

const MenuItem = ({ item }) => {
  const { name, description, price, defaultPrice, imageId } = item;

  return (
      <div className="menu-item">
          <div className="left">
              {name && <h4>{name}</h4>}
              {/* {description && <p>{description}</p>} */}
              {price && <p>Price: ₹{(price / 100).toFixed(2)}</p>}
              {defaultPrice && (
                  <p>Price: ₹{(defaultPrice / 100).toFixed(2)}</p>
              )}
          </div>

          {imageId && <img className="leftimg" src={RESTAURANT_MENU_IMG + imageId} alt={name} />}
      </div>
  );
};

export default RestaurantMenu;


