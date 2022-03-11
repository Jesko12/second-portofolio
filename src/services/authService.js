import http from "./httpService";
import jwtDecode from "jwt-decode";
import { getAuthHeader } from "./userService";

const authEndpoint = "/login";
const tokenKey = "token";
const logoutEndpoint = "/admin/logout";

export async function login(email, password) {
  const { data } = await http.corePost(
    authEndpoint,
    {
      email: email,
      password: password,
    },
    {
      headers: {
        "X-Source": "monsieur",
      },
    }
  );
  localStorage.setItem(tokenKey, data["access_token"]);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
}

export async function logout() {
  await http.salesPartnerDelete(logoutEndpoint, getAuthHeader());
  localStorage.removeItem(tokenKey);
}

export function getToken() {
  return localStorage.getItem(tokenKey);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
  getToken,
};
