import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import Transaction from "./components/Transaction";
import RootLayout from "./components/RootLayout";
import Checkout from "./components/Checkout";
import Invoice from "./components/Invoice";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />}>
            <Route path="product/:category" element={<Products />} />
          </Route>
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/invoice/:id" element={<Invoice />} />
          <Route path="/product/:category/:id" element={<ProductDetail />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
