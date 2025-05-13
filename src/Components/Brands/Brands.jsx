import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getBrands() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setIsLoading(false);
    setBrands(data.data);
    console.log(data.data);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands | Fresh-Cart</title>
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
        <div className="row">
          {brands.map((brand) => {
            return (
              <div key={brand._id} className="col-md-4">
                <img src={brand.image} className="w-100" alt={brand.name} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Brands;
