import http from "./httpService";
import { getAuthHeader } from "./userService";

const userNotificationEndpoint = "/admin/users/notifications";
const notificationEndpoint = "/admin/notifications";

export async function sendNotification(body) {
  return await http.salesPartnerPost(
    userNotificationEndpoint,
    body,
    getAuthHeader()
  );
}

export async function getNotifications() {
  return await http.salesPartnerGet(notificationEndpoint, getAuthHeader());
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getNotifications,
  sendNotification,
};
