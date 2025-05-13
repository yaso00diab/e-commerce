import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Helmet } from "react-helmet";
import HomeProducts from "../HomeProducts/HomeProducts";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Fresh-Cart</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <HomeProducts />
    </>
  );
};

export default Home;
