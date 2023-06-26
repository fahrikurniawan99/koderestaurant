import { api, apiWithBearer } from "./api";

const ApiAuth = {
  fetchProfile() {
    return apiWithBearer.get("/auth/profile");
  },
  login(email: string, password: string) {
    return api.post("/auth/login", {
      email,
      password,
    });
  },
  register(name: string, email: string, password: string) {
    return api.post("/auth/register", {
      name,
      email,
      password,
    });
  },
  logout() {
    return apiWithBearer.post("/auth/logout");
  },
};

export default ApiAuth;
