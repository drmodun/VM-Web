export const baseUrl: string = "https://localhost:7069/api";
export let jwt: string = localStorage.getItem("token") || "";

export const setJwt = (token: string) => {
  jwt = token;
  accountInfo = parseJwt(token);
  localStorage.setItem("loginTime", new Date().toString());
  console.log(parseJwt(token));
};

export let accountInfo =
  localStorage.getItem("token") &&
  new Date(localStorage.getItem("loginTime") ?? "") >
    new Date(Date.now() - 1000 * 60 * 60 * 8) &&
  parseJwt(jwt);

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  console.log(JSON.parse(jsonPayload));
  return JSON.parse(jsonPayload);
}

export interface ActionResult {
  success: boolean;
  id?: string; 
}

export interface Sorting {
  Attribute: number;
  SortType: number;
}

export interface Pagination {
  Page: number;
  PageSize: number;
}

export interface PageInfo {
  page: number;
  pageSize: number;
  totalItems?: number;
  totalPages?: number;
}

export interface PaginationResult<T> {
  pageInfo: PageInfo;
  items: T[];
}

