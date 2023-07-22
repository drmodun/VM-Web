export const baseUrl: string = "https://localhost:7069/api";
export const jwt: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmM2NkODQ5Ni04ZDlkLTQ3ZjYtYmUyOC04MjFhMDU1N2YwMWQiLCJzdWIiOiJzdHJpbmdAZ21haWwuY29tIiwiZW1haWwiOiJzdHJpbmdAZ21haWwuY29tIiwibmFtZSI6InN0cmluZ0BnbWFpbC5jb20iLCJ1c2VyaWQiOiI5NTgxMjJjYS03ZjQ5LTRlZDctOTFjMy00NGUzMGViOGQ4ZWYiLCJ1c2VyIjp0cnVlLCJhZG1pbiI6dHJ1ZSwibmJmIjoxNjkwMDYwMjYyLCJleHAiOjE2OTAwODkwNjIsImlhdCI6MTY5MDA2MDI2MiwiaXNzIjoiaHR0cHM6Ly9yYW5kb213ZWJzaXRlLmNvbSIsImF1ZCI6Imh0dHBzOi8vcmFuZG9td2Vic2l0ZS13ZWItYXBpLmNvbSJ9.HpMsWmBaZ2GMCT7CiU9lTDXMNeOoFHx4HoxmWQirs60";
localStorage.setItem("token", jwt);
//gonna use a temporary jwt just for testing, the login page will be implemented later

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
