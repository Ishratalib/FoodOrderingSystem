export const BASE_URL = "http://127.0.0.1:8000";

export const AUTH_ENDPOINTS = {
  LOGIN: "/user/login/",
  REGISTER: "/user/register/",
};

export const MENU_ENDPOINTS = {
  LIST: "/restaurants/all-menuitem",
  SINGLE: (id) => `/restaurants/menuitem/${id}`,
  CREATE: "/restaurants/create-menuitem/",
  UPDATE: (id) => `/restaurants/update-menuitem/${id}/`,
  DELETE: (id) => `/restaurants/delete-menuitem/${id}/`,
  RESTAURANTS: "/restaurants/all-restaurant",
  CATEGORIES: "/restaurants/all-category",
};

export const ANALYTICS_ENDPOINTS = {
  OVERVIEW: "/order/admin/analytics/overview/",
  POPULAR_ITEMS: "/order/admin/analytics/popular-items/",
  POPULAR_DEALS: "/order/admin/analytics/popular-deals/",
  ORDERS_BY_STATUS: "/order/admin/analytics/orders-by-status/",
  REVENUE_BY_RESTAURANT: "/order/admin/analytics/revenue-by-restaurant/",
  REVENUE_OVER_TIME: "/order/admin/analytics/revenue-over-time/",
};
