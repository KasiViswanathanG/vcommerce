import React, { useState, useEffect } from "react";
import {
  Card,
  TextField,
  Button,
  TextareaAutosize,
  Paper,
  IconButton,
} from "@mui/material";
import axios from "axios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import AlertDialog from "./AlertDialog";

// modal for adding and updating product
const ProductModal = ({ handleClose, id }) => {
  // handlers for alert box
  const [openAlert, setOpenAlert] = useState(false);
  const [content, setContent] = useState("");
  const handleAlertOpen = () => {
    setOpenAlert(true);
  };
  const handleAlertClose = () => {
    setOpenAlert(false);
  };
  //post or fetch and put data
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    rating: 0,
    imgSrc: "",
    id: 1,
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
    if (id) getProduct();
  }, [id]);
  const postProduct = async () => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    const newProduct = {
      name: product.name,
      description: product.description,
      price: product.price,
      rating: product.rating,
      imgSrc: product.imgSrc,
    };
    await axios.post(
      `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/products`,
      newProduct
    );
  };
  const updateProduct = async () => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    await axios.put(
      `${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/products/${id}`,
      product
    );
  };
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "35rem",
        background: "inherit",
      }}
    >
      <AlertDialog
        open={openAlert}
        handleAlertClose={handleAlertClose}
        imgSrc={product.imgSrc}
        name={product.name}
        content={content}
      />
      <IconButton
        onClick={handleClose}
        style={{ position: "absolute", right: "0", top: "0" }}
      >
        <CloseIcon />
      </IconButton>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "inherit",
        }}
      >
        <Card
          sx={{
            width: "20rem",
            padding: "2rem 1rem 1rem 1rem",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "none",
            background: "inherit",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{
              width: "15rem",
              marginBottom: "1rem",
              input: {
                fontSize: "1.1rem",
              },
            }}
            value={product.name}
            onChange={(e) => {
              setProduct(() => {
                return {
                  ...product,
                  name: e.target.value,
                };
              });
            }}
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            sx={{
              width: "15rem",
              marginBottom: "1rem",
              input: {
                fontSize: "1rem",
              },
            }}
            value={product.price}
            onChange={(e) => {
              setProduct(() => {
                return {
                  ...product,
                  price: parseInt(e.target.value),
                };
              });
            }}
          />
          <TextField
            label="Rating"
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: {
                max: 5,
                min: 0,
              },
            }}
            sx={{
              width: "15rem",
              marginBottom: "1rem",
              input: {
                fontSize: "1rem",
              },
            }}
            value={product.rating}
            onChange={(e) => {
              setProduct(() => {
                return {
                  ...product,
                  rating: parseInt(e.target.value),
                };
              });
            }}
          />
        </Card>
        <div>
          <input
            type="file"
            name="upload"
            accept="image/*"
            onChange={(e) => {
              let image = e.target.files[0];
              let imageReader = new FileReader();
              imageReader.readAsDataURL(image);
              imageReader.onload = () => {
                setProduct(() => {
                  return {
                    ...product,
                    imgSrc: imageReader.result,
                  };
                });
              };
            }}
            style={{
              display: "none",
            }}
            id="button-file"
          />
          <div
            style={{
              width: "7.5rem",
              height: "7.5rem",
              border: "1.5px dashed #c7c7c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {product.imgSrc === "" ? (
              <label htmlFor="button-file">
                <IconButton color="primary" component="span">
                  <AddPhotoAlternateIcon />
                </IconButton>
              </label>
            ) : (
              <img
                style={{
                  height: "7.5rem",
                  width: "7.5rem",
                }}
                src={product.imgSrc}
                alt="cartImg"
              ></img>
            )}
          </div>
        </div>
      </Paper>
      <TextareaAutosize
        minRows={3}
        placeholder="Enter the Description"
        style={{
          width: "27rem",
          padding: "1rem",
          background: "none",
          borderRadius: "0.5rem",
          border: "1px solid #c7c7c7",
          fontSize: "1.1rem",
          margin: "0rem 0rem 2rem 1rem",
        }}
        value={product.description}
        onChange={(e) => {
          setProduct(() => {
            return {
              ...product,
              description: e.target.value,
            };
          });
        }}
      />
      {id ? (
        <Button
          variant="contained"
          onClick={() => {
            updateProduct();
            handleClose();
          }}
        >
          Update Product
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={async () => {
            setContent("is added");
            handleAlertOpen();
            await new Promise((resolve) => setTimeout(resolve, 1500));
            postProduct();
            handleClose();
          }}
        >
          Add Product
        </Button>
      )}
    </Paper>
  );
};

export default ProductModal;
