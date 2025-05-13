import axios from "axios";
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const SubCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const { id } = useParams();

  async function getSubCaregories() {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    setIsLoading(false);
    setSubCategories(data.data);
  }

  useEffect(() => {
    getSubCaregories();
  }, []);

  return (
    <>
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
          {subCategories.map((categorie) => {
            return (
              <div key={categorie._id} className="col-md-4">
                <h3>{categorie.name}</h3>
                <h3>{categorie.slug}</h3>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SubCategories;
