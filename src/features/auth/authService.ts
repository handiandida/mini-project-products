import api from "../../services/api";
import type { LoginPayload, User } from "../../types/auth.types";

export const loginAPI = (payload: LoginPayload) =>
  api.post<User>("/auth/login", payload);

export const getCurrentUser = () => api.get<User>("/auth/me");
