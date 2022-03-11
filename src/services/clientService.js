import http from "./httpService";
import { getAuthHeader } from "./userService";

const clientsEndpoint = "/admin/clients";
const clientEndpoint = "/admin/client";

export async function getClients() {
  return await http.salesPartnerGet(clientsEndpoint, getAuthHeader());
}

async function updateClientStatus(id, body) {
  return await http.salesPartnerPut(
    clientEndpoint + `/${id}`,
    body,
    getAuthHeader()
  );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getClients,
  updateClientStatus,
};
