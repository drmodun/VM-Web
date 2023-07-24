export const baseUrl: string = "https://localhost:7069/api";
export let jwt: string = localStorage.getItem("token") || "";
//gonna use a temporary jwt just for testing, the login page will be implemented later


export const setJwt = (token: string) => {
  jwt = token;
}

export interface ActionResult {
  success: boolean;
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

//might update later
