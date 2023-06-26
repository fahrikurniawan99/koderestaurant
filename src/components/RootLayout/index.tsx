import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import useProfile from "../../hooks/useProfile";
import Loading from "../Loading";

export default function RootLayout() {
  const { status } = useProfile();
  const token = localStorage.getItem("token");

  if ((status === "loading" || status === "idle") && token) {
    return <Loading />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
      <p className="mt-10 text-center font-semibold text-gray-700">
        koderestaurant&#169;2023
      </p>
      <p className="mb-5 text-center text-xs text-gray-400">
        develop by mohammad fahri kurniawan
      </p>
    </>
  );
}
