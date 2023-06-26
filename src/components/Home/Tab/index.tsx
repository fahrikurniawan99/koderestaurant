import Container from "../../Container";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

type Props = {};

export default function Tab({}: Props) {
  return (
    <Container className="mt-4">
      <div className="flex h-10 gap-4 border-b text-gray-400">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            clsx(
              "flex h-full items-center justify-center",
              isActive && "border-b border-green-500 text-gray-800"
            )
          }
        >
          Semua
        </NavLink>
        <NavLink
          to={"/product/Makanan"}
          className={({ isActive }) =>
            clsx(
              "flex h-full items-center justify-center",
              isActive && "border-b border-green-500 text-gray-800"
            )
          }
        >
          Makanan
        </NavLink>
        <NavLink
          to={"/product/Minuman"}
          className={({ isActive }) =>
            clsx(
              "flex h-full items-center justify-center",
              isActive && "border-b border-green-500 text-gray-800"
            )
          }
        >
          Minuman
        </NavLink>
        {/* <NavLink
          to={"/product/Pastry"}
          className={({ isActive }) =>
            clsx(
              "flex h-full items-center justify-center",
              isActive && "border-b border-green-500 text-gray-800"
            )
          }
        >
          Pastry
        </NavLink> */}
      </div>
    </Container>
  );
}
