import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Rating,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import axios from "axios";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart";
import ProductModal from "./ProductModal";
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
    width: "67rem",
  },
  [theme.breakpoints.down("lg")]: {
    width: "50rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "38rem",
  },
  [theme.breakpoints.down("sm")]: {
    width: "26rem",
  },
}));

const HiddenTypo = styled(Typography)(({ theme }) => ({
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
    marginLeft: "-5rem",
  },
}));

//component for products
const ProductCard = ({ id }) => {
  //handlers for opening product modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = async () => {
    setOpen(false);
    setContent("is updated");
    handleAlertOpen();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    handleAlertClose();
  };
  // handlers for alert box
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
  }, [id, product]);
  const deleteProduct = async () => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    await axios.delete(
      `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/products/${id}`
    );
  };
  const dispatch = useDispatch();
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
          margin: "1rem 3rem",
        }}
      >
        <div>
          <Typography variant="h5" sx={{ fontWeight: "700" }}>
            {product.name}
          </Typography>
          <Typography sx={{ fontWeight: "600", color: "green" }}>
            Rs. {product.price}
          </Typography>
        </div>
        <Rating
          sx={{ marginLeft: "1rem" }}
          name="rating"
          value={product.rating}
          readOnly
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "1rem 3rem",
        }}
      >
        <HiddenTypo sx={{ fontWeight: "500" }}>
          {product.description}
        </HiddenTypo>

        <ColumnFlex style={{ display: "flex", justifyContent: "right" }}>
          <IconButton
            onClick={async () => {
              dispatch(addToCart(id));
              setContent("added to cart");
              handleAlertOpen();
              await new Promise((resolve) => setTimeout(resolve, 1500));
              handleAlertClose();
            }}
            color="primary"
            style={{ marginRight: "1rem" }}
          >
            <AddShoppingCartIcon /> <Typography>Add to Cart</Typography>
          </IconButton>
          <IconButton
            onClick={handleOpen}
            style={{ marginRight: "1rem", color: "gold" }}
          >
            <EditIcon />
          </IconButton>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <ProductModal handleClose={handleClose} id={id} />
            </Box>
          </Modal>
          <IconButton
            onClick={async () => {
              setContent("is deleted");
              handleAlertOpen();
              await new Promise((resolve) => setTimeout(resolve, 1500));
              deleteProduct();
            }}
            style={{ marginRight: "1rem", color: "red" }}
          >
            <DeleteIcon />
          </IconButton>
        </ColumnFlex>
      </div>
    </ResponsiveCard>
  );
};

export default ProductCard;
