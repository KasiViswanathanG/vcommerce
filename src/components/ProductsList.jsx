import React, { useState, useEffect } from "react";
import { Grid, Card } from "@mui/material";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useSelector } from "react-redux";

// component to list all products
const ProductsList = () => {
  const [products, setProducts] = useState([
    {
      name: "",
      description: "",
      price: 0,
      rating: 0,
      imgSrc: "",
      id: 1,
    },
  ]);
  //handles sort
  const isSort = useSelector((state) => state.sort.isSort);
  const bubblesort = (products) => {
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < products.length - i - 1; j++) {
        if (products[j].price > products[j + 1].price) {
          let temp = products[j];
          products[j] = products[j + 1];
          products[j + 1] = temp;
        }
      }
    }
    return products;
  };
  useEffect(() => {
    const getProducts = async () => {
      const devEnv = process.env.NODE_ENV !== "production";
      const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
      await axios
        .get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/products`)
        .then((response) => {
          setProducts(response.data);
        });
    };
    const getSortedProducts = async () => {
      const devEnv = process.env.NODE_ENV !== "production";
      const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
      await axios
        .get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/products`)
        .then((response) => {
          setProducts(bubblesort(response.data));
        });
    };
    isSort ? getSortedProducts() : getProducts();
  }, [isSort, products]);
  return (
    <Card
      sx={{
        height: "30rem",
        overflow: "auto",
        "&::-webkit-scrollbar": { display: "none" },
        boxShadow: "none",
      }}
    >
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        container
        spacing={2}
      >
        {products.map((product) => {
          return (
            <Grid id={product.id} item key={product.id}>
              <ProductCard id={product.id} />
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default ProductsList;
