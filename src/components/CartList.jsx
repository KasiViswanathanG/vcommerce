import { Grid, Typography, Card } from "@mui/material";
import { useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// component to list all cart items
const CartList = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
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
        <Grid
          display="flex"
          justifyContent="center"
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <ShoppingCartIcon fontSize="large" color="secondary" />
          <Typography variant="h4" fontWeight="700" color="secondary">
            CART
          </Typography>
        </Grid>
        {cartItems.map((cartItem) => {
          return (
            <Grid id={cartItem.id} item key={cartItem.id}>
              <CartItemCard id={cartItem.id} quantity={cartItem.quantity} />
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default CartList;
