export const ENDPOINTS = {
  // Customer
  GET_ALL_CATEGORIES: "/restaurants/all-category",
  GET_ALL_MENU_ITEMS: "/restaurants/all-menuitem",

  // Cart
  GET_CART: "/order/cart/",
  ADD_TO_CART: "/order/cart/add/",
  UPDATE_CART_ITEM: "/order/cart/update-item/",
  DELETE_CART_ITEM: "/order/cart/delete-item/",

  // Orders
  CHECKOUT: "/order/checkout/",
  GET_ORDERS: "/order/orders/",
  GET_SINGLE_ORDER: "/order/order/",
  CANCEL_ORDER: "/order/order/",

  // Admin Orders
  GET_ALL_ORDERS: "/order/admin/orders",
  UPDATE_ORDER_STATUS: "/order/admin/orders/",

  // Analytics
  ADMIN_OVERVIEW: "/order/admin/analytics/overview/",
  ADMIN_REVENUE_OVER_TIME: "/order/admin/analytics/revenue-over-time/",
  ADMIN_ORDERS_BY_STATUS: "/order/admin/analytics/orders-by-status/",
  ADMIN_POPULAR_ITEMS: "/order/admin/analytics/popular-items/",
  ADMIN_POPULAR_DEALS: "/order/admin/analytics/popular-deals/",
  ADMIN_REVENUE_BY_RESTAURANT: "/order/admin/analytics/revenue-by-restaurant/",

  // Menu CRUD
  MENU_LIST: "/restaurants/all-menuitem",
  MENU_SINGLE: (id) => `/restaurants/menuitem/${id}`,
  MENU_CREATE: "/restaurants/create-menuitem/",
  MENU_UPDATE: (id) => `/restaurants/update-menuitem/${id}/`,
  MENU_DELETE: (id) => `/restaurants/delete-menuitem/${id}/`,
  MENU_RESTAURANTS: "/restaurants/all-restaurant",
  MENU_CATEGORIES: "/restaurants/all-category",

  GET_ALL_DEALS: "/restaurants/all-deal/",
  GET_DEAL_BY_ID: "/restaurants/deal/",
};
