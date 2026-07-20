import React, { useEffect, useState } from "react";
import MenuItems from "../../components/restaurant/MenuItems";
import RestaurantBanner from "../../components/restaurant/RestaurantBanner";
import RestaurantInfoSection from "../../components/restaurant/RestaurantInfoSection";
import LocationMap from "../../components/restaurant/LocationMap";
import Footer from "../../components/layout/Footer";
import PopularRestaurants from "../../components/home/PopularRestaurants";
import CustomerReviews from "../../components/restaurant/CustomerReviews";
import { useDispatch } from "react-redux";
import { fetchCategories, fetchMenuItems } from "../../redux/slices/menuSlice";

export default function RestaurantDetailAshir() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMenuItems());
  }, [dispatch]);
  return (
    <>
      <RestaurantBanner
        name="McDonald's East London"
        rating={3.4}
        reviews={1360}
        minOrder={12}
        deliveryTime="20-25 Minutes"
        openUntil="3:00 AM"
      />

      <MenuItems />

      <RestaurantInfoSection />
      <LocationMap />
      <CustomerReviews />
      <PopularRestaurants />
      <Footer />
    </>
  );
}
