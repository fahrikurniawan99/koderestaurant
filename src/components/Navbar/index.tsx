import clsx from "clsx";
import * as React from "react";
import {
  LuCookie,
  LuHistory,
  LuHome,
  LuMenu,
  LuShoppingCart,
  LuX,
} from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import Container from "../Container";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const toggle = () => {
    setOpen(!open);
    if (open) {
      document.body.classList.remove("overflow-hidden");
    } else {
      document.body.classList.add("overflow-hidden");
    }
  };

  return (
    <>
      <Container className="flex items-baseline justify-between py-4">
        <div className="flex gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-green-300 bg-green-500 text-white">
            <LuCookie className="text-lg" />
          </div>
          <div>
            <Link to="/" className="flex items-center gap-1 text-xl font-bold">
              Kode Restaurant
            </Link>
            <p className="text-sm text-gray-400">
              Solusi pemesanan makanan online
            </p>
          </div>
        </div>
        <button onClick={toggle} className="text-3xl">
          {open ? <LuX className="text-red-500" /> : <LuMenu />}
        </button>
      </Container>
      <Container>
        {open && (
          <ul className="mb-4 space-y-3">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  clsx(
                    "inline-flex items-center gap-1 hover:opacity-50",
                    isActive
                      ? "text-green-500 hover:hover:opacity-100"
                      : "text-gray-400"
                  )
                }
              >
                <LuHome className="text-xl" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/shopping-cart"}
                className={({ isActive }) =>
                  clsx(
                    "inline-flex items-center gap-1 hover:opacity-50",
                    isActive
                      ? "text-green-500 hover:hover:opacity-100"
                      : "text-gray-400"
                  )
                }
              >
                <LuShoppingCart className="text-xl" />
                Keranjang
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/transaction"}
                className={({ isActive }) =>
                  clsx(
                    "inline-flex items-center gap-1 hover:opacity-50",
                    isActive
                      ? "text-green-500 hover:hover:opacity-100"
                      : "text-gray-400"
                  )
                }
              >
                <LuHistory className="text-xl" />
                Transaksi
              </NavLink>
            </li>
          </ul>
        )}
      </Container>
    </>
  );
}
