import React from "react";
import MenuItems from "../../components/restaurant/MenuItems";
import RestaurantBanner from "../../components/restaurant/RestaurantBanner";
import RestaurantInfoSection from "../../components/restaurant/RestaurantInfoSection";
import LocationMap from "../../components/restaurant/LocationMap";
import Footer from "../../components/layout/Footer";
export default function RestaurantDetail() {
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
      <Footer />
    </>
  );
}
