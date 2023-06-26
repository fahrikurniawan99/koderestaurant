import { Outlet, useLocation } from "react-router-dom";
import Products from "../Products";
import Searching from "../Searching";
import Banner from "./Banner";
import Tab from "./Tab";

export default function Home() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Searching />
      <Banner />
      <Tab />
      {isHomePage && <Products />}
      <Outlet />
    </>
  );
}
