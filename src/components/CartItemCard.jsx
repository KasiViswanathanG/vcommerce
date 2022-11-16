import React, { useState, useEffect } from "react";
import { Card, Typography, Rating, IconButton, TextField } from "@mui/material";
import axios from "axios";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { changeQuantity, removeFromCart } from "../features/cart";
import AlertDialog from "./AlertDialog";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35rem",
  p: 4,
  boxShadow: "0 0 5px #3f50b5, 0 0 3px #3f50b5",
  background: "white",
};

const ResponsiveCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    maxWidth: "67rem",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "50rem",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "38rem",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "26rem",
  },
}));

const HiddenTypo = styled(Typography)(({ theme }) => ({
  marginBottom: "3rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ColumnFlex = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "-4rem",
  },
}));

//component for cart item
const CartItemCard = ({ id, quantity }) => {
  //alert box handlers
  const [openAlert, setOpenAlert] = useState(false);
  const [content, setContent] = useState("");
  const handleAlertOpen = () => {
    setOpenAlert(true);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
  };
  //fetch product from database
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    rating: 0,
    imgSrc: "",
    id: 0,
  });
  const [q, SetQ] = useState(quantity);
  useEffect(() => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    const getProduct = async () => {
      await axios
        .get(
          `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/products/${id}`
        )
        .then((response) => {
          setProduct(response.data);
        });
    };
    getProduct();
  }, [id]);
  const dispatch = useDispatch();
  //handles change in quantity
  useEffect(() => {
    dispatch(changeQuantity({ id, q }));
    // eslint-disable-next-line
  }, [q]);
  return (
    <ResponsiveCard
      variant="outlined"
      sx={{
        padding: "2rem",
        display: "flex",
      }}
    >
      <AlertDialog
        open={openAlert}
        handleAlertClose={handleAlertClose}
        imgSrc={product.imgSrc}
        name={product.name}
        content={content}
      />
      <img
        style={{ height: "10rem", width: "10rem" }}
        src={product.imgSrc}
        alt={product.name}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          margin: "1rem 3rem 1rem 2rem",
          width: "30%",
        }}
      >
        <div>
          <Typography variant="h5" sx={{ fontWeight: "700" }}>
            {product.name}
          </Typography>
          <Rating
            sx={{ marginLeft: "1rem" }}
            name="rating"
            value={product.rating}
            readOnly
          />
        </div>
        <IconButton
          onClick={async () => {
            setContent("removed from cart");
            handleAlertOpen();
            await new Promise((resolve) => setTimeout(resolve, 1500));
            dispatch(removeFromCart(id));
          }}
          sx={{ color: "red" }}
        >
          <RemoveShoppingCartIcon />
          <Typography sx={{ marginLeft: "0.5rem" }}>Remove</Typography>
        </IconButton>
      </div>
      <ColumnFlex
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          width: "35rem",
        }}
      >
        <div>
          <HiddenTypo fontWeight="700">Price</HiddenTypo>
          <Typography sx={{ fontWeight: "600", color: "green" }}>
            Rs. {product.price}
          </Typography>
        </div>
        <div>
          <HiddenTypo fontWeight="700">Quantity</HiddenTypo>
          <TextField
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: {
                max: 100,
                min: 1,
              },
            }}
            sx={{ minWidth: "5rem" }}
            value={q}
            onChange={(e) => {
              SetQ(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <HiddenTypo fontWeight="700">Amount</HiddenTypo>
          <Typography sx={{ fontWeight: "600", color: "green" }}>
            Rs. {product.price * q}
          </Typography>
        </div>
      </ColumnFlex>
    </ResponsiveCard>
  );
};

export default CartItemCard;
