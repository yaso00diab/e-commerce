import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Product from "../Product/Product";
import { BallTriangle } from "react-loader-spinner";
import Pagination from "react-js-pagination";

const HomeProducts = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activePage, setActivePage] = useState(1);
  const [results, setResults] = useState(1);
  const [metadata, setMetadata] = useState({});

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
    getHomeProducts(pageNumber);
  }

  async function getHomeProducts(pageNumber) {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products?page=" + pageNumber
    );
    setHomeProducts(data.data);
    setResults(data.results);
    setMetadata(data.metadata);
    setIsLoading(false);
  }

  useEffect(() => {
    getHomeProducts(1);
  }, []);

  useMemo(() => {
    window.scrollTo({ top: 900 });
  }, [activePage]);

  return (
    <>
      <h2 className="h1 mt-2">Products</h2>
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
          {homeProducts.map((product) => {
            return (
              <div key={product.id} className="col-md-3">
                <Product product={product} />
              </div>
            );
          })}
        </div>
      )}

      <Pagination
        activePage={activePage}
        itemsCountPerPage={metadata.limit}
        totalItemsCount={results}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </>
  );
};

export default HomeProducts;
