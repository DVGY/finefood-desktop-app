import { ResourceList } from './resourceList';

export const enum RouteList {
  DASHBOARD = `/${ResourceList.DASHBOARD}`,
  ORDERS = `/${ResourceList.ORDERS}`,
  USERS = `/${ResourceList.USERS}`,
  PRODUCTS = `/${ResourceList.PRODUCTS}`,
  STORES = `/${ResourceList.STORES}`,
  LOGOUT = `/${ResourceList.LOGOUT}`,
}
