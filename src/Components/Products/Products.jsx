import axios from "axios";
import Product from "../Product/Product";
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";

const Products = () => {
  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery("products", getAllProducts, {
    cacheTime: 10000,
  });

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
          {data?.data.data.map((product) => {
            return (
              <div key={product.id} className="col-md-3">
                <Product product={product} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Products;
