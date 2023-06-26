import * as React from "react";
import { useDispatch } from "react-redux";
import ApiAuth from "../api/auth";
import { setUser } from "../app/auth";

export default function useProfile() {
  const [status, setStatus] = React.useState<
    "loading" | "error" | "idle" | "success"
  >("idle");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token") ?? "";

  const fetchProfile = React.useCallback(async () => {
    if (token) {
      setStatus("loading");
      try {
        const response = await ApiAuth.fetchProfile();
        const profile = response.data.data;
        dispatch(setUser(profile));
        setStatus("success");
      } catch (error: any) {
        setStatus("error");
      }
    }
  }, [token]);

  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);
  return { status };
}
