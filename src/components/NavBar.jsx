import * as React from "react";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Badge,
  Modal,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import ProductModal from "./ProductModal";
import { useSelector, useDispatch } from "react-redux";
import { sort, unSort } from "../features/sort";
import { cartView, unCartView } from "../features/cartView";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35rem",
  p: 4,
  boxShadow: "0 0 5px #3f50b5, 0 0 3px #3f50b5",
  background: "white",
};

// component for navigation bar
const NavBar = () => {
  //Add product handlers
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //gets redux data
  const isSort = useSelector((state) => state.sort.isSort);
  const isCartView = useSelector((state) => state.cartView.isCartView);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        sx={{ padding: "0rem 5rem", backgroundColor: "#3095CB" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, marginRight: "1rem" }}
          >
            VCommerce
          </Typography>
          <Button
            variant="contained"
            sx={{ my: 2, color: "white" }}
            endIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add product
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <ProductModal handleClose={handleClose} />
            </Box>
          </Modal>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            {isCartView ? (
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  dispatch(unCartView());
                }}
              >
                <Typography marginRight="0.5rem" variant="body1">
                  Back To Home
                </Typography>
                <HomeIcon />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  dispatch(cartView());
                }}
              >
                <Typography marginRight="0.5rem" variant="body1">
                  Go to cart
                </Typography>
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          margin: "2rem 6.7rem",
        }}
      >
        {!isCartView &&
          (isSort ? (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ImportExportIcon />}
              endIcon={<CloseIcon />}
              onClick={() => {
                dispatch(unSort());
              }}
            >
              Sort By Price
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ImportExportIcon />}
              onClick={() => {
                dispatch(sort());
              }}
            >
              Sort By Price
            </Button>
          ))}
      </div>
    </Box>
  );
};

export default NavBar;
