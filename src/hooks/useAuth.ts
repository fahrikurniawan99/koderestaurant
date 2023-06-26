import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function useAuth() {
  const state = useSelector((state: RootState) => state.auth);
  const auth = {
    user: state.user,
  };
  return auth;
}
