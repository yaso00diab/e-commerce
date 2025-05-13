import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const CategoriesSlider = () => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const [categories, setCategories] = useState([]);
  async function getAllCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <div className="container py-3">
        <h2 className="mb-3">Show Popular Categories</h2>
        <Slider {...settings}>
          {categories.map((categorie, i) => {
            return (
              <div key={i} className="item px-1">
                <img
                  src={categorie.image}
                  height={"220px"}
                  className="w-100"
                  alt="categories"
                />
                <h5>{categorie.name}</h5>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default CategoriesSlider;
