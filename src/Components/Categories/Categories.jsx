import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getCaregories() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getCaregories();
  }, []);
  return (
    <>
      <Helmet>
        <title>Categories | Fresh-Cart</title>
      </Helmet>
      {isLoading ? (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass="justify-content-center py-5"
          visible={true}
        />
      ) : (
        <div className="container">
          <div className="row">
            {categories.map((categorie, i) => {
              return (
                <div key={i} className="col-md-4 py-4">
                  <h5 className="text-center main-color fw-bold mb-2">
                    {categorie.name}
                  </h5>
                  <img
                    src={categorie.image}
                    height={"250px"}
                    className="w-100 rounded-2"
                    alt={categorie.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
