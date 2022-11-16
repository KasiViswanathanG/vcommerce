import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import ProductsList from "./components/ProductsList";
import CartList from "./components/CartList";
import NavBar from "./components/NavBar";

function App() {
  const isCartView = useSelector((state) => state.cartView.isCartView);
  return (
    <div className="App">
      <NavBar />
      {isCartView ? <CartList /> : <ProductsList />}
    </div>
  );
}

export default App;
