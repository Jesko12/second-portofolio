import http from "./httpService";
import { getToken } from "./authService";



const productsEndpoint = "/admin/products";
const productEndpoint = "/admin/product"
const usersEndpoint = "/admin/users";
const discoversEndpoint = "/admin/discovers";
const discoverEndpoint = "/admin/discover";
const ordersEndpoint = "/admin/orders";
const orderEndpoint = "/admin/order";

export async function getOrders() {
  return http.coreGet(ordersEndpoint, getAuthHeaders());
}

export async function getDiscovers() {
  return http.coreGet(discoversEndpoint, getAuthHeaders());
}

export async function getProducts() {
  return http.coreGet(productsEndpoint, getAuthHeaders());
}

export async function getProductByID(id) {
  return await http.coreGet(productEndpoint + `/${id}`,
    getAuthHeaders());
}

export async function updateOrderStatus(id, body) {
  return await http.corePatch(
    orderEndpoint + `/${id}`,
    body,
    getAuthHeaders());
}

export async function getOrderByID(id) {
  return await http.coreGet(orderEndpoint + `/${id}`,
    getAuthHeaders());
}

export async function addProduct(body) {
  return await http.corePost(
    productEndpoint,
    body,
    getAuthHeaders());
}

export async function addDiscover(body) {
  return await http.corePost(
    discoverEndpoint,
    body,
    getAuthHeaders());
}

async function editProduct(id, body) {
  return await http.corePut(
    productEndpoint + `/${id}`,
    body,
    getAuthHeaders());
}

export async function deleteProduct(id) {
  return await http.coreDelete(
    productEndpoint + `/${id}`,
    getAuthHeaders());
}

export async function getUsers() {
    return http.coreGet(usersEndpoint, getAuthHeaders());
  }


  export function getAuthHeaders() {
    return {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
  }
  
  /* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
  export default { 
    getProducts,
    getOrderByID,
    getOrders,
    getDiscovers,
    getProductByID,
    getUsers,
    updateOrderStatus,
    addProduct,
    addDiscover,
    editProduct,
    deleteProduct
  }