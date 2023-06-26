import { avataaarsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import * as React from "react";
import { LuLoader2, LuLogOut } from "react-icons/lu";
import ApiAuth from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import Container from "../Container";

export default function Profile() {
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const avatar = React.useMemo(() => {
    return createAvatar(avataaarsNeutral, {
      seed: auth.user?.name,
    }).toDataUriSync();
  }, []);
  const cart = useCart();

  return (
    auth.user && (
      <Container className="text-gray-700">
        <div className="flex gap-2 rounded-md border p-3 lg:p-5">
          <img src={avatar} className="w-14 rounded-full" alt="Avatar" />
          <div>
            <h1 className="font-bold">{auth.user.name}</h1>
            <h2>{auth.user.email}</h2>
          </div>
          <p className="ml-auto text-sm font-semibold text-gray-500">
            #{auth.user.customerId}
          </p>
        </div>
        <button
          disabled={isSubmitting}
          onClick={async () => {
            try {
              setIsSubmitting(true);
              await ApiAuth.logout();
              cart.clear();
              localStorage.removeItem("token");
              window.location.reload();
            } catch (error) {
              console.log(error);
            } finally {
              setIsSubmitting(false);
            }
          }}
          className="ml-auto mt-4 flex items-center justify-center gap-2 rounded-md bg-red-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-70"
        >
          {isSubmitting ? "Loading" : "Logout"}
          {isSubmitting ? (
            <LuLoader2 className="animate-spin stroke-[2.5px]" />
          ) : (
            <LuLogOut className="stroke-[2.5px]" />
          )}
        </button>
      </Container>
    )
  );
}
