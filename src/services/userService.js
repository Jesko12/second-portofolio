import http from "./httpService";
import { getToken } from "./authService";

const userEndpoint = "/admin/users";
const userClientEndpoint = "/admin/user/";

export async function getUsers() {
  return http.salesPartnerGet(userEndpoint, getAuthHeader());
}

export async function getUserDetails(email, kind) {
  const { data } = await http.salesPartnerGet(
    userClientEndpoint + `${email}/${kind}`,
    getAuthHeader()
  );
  return data;
}

export async function verifyUser(body) {
  const { data } = await http.salesPartnerPut(
    userClientEndpoint + "bank",
    body,
    getAuthHeader()
  );
  return data;
}
export function getAuthHeader() {
  return {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserDetails,
  verifyUser,
};
