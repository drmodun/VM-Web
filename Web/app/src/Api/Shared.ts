export const baseUrl: string = "https://localhost:7069/api";
export const jwt: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYzI5NmI3NS01ODM5LTQxODktYmIwMS0wNDU4NGQxODNiM2IiLCJzdWIiOiJzdHJpbmdAZ21haWwuY29tIiwiZW1haWwiOiJzdHJpbmdAZ21haWwuY29tIiwibmFtZSI6InN0cmluZ0BnbWFpbC5jb20iLCJ1c2VyaWQiOiI5NTgxMjJjYS03ZjQ5LTRlZDctOTFjMy00NGUzMGViOGQ4ZWYiLCJ1c2VyIjp0cnVlLCJhZG1pbiI6dHJ1ZSwibmJmIjoxNjg5MTk3Mzk4LCJleHAiOjE2ODkyMjYxOTgsImlhdCI6MTY4OTE5NzM5OCwiaXNzIjoiaHR0cHM6Ly9yYW5kb213ZWJzaXRlLmNvbSIsImF1ZCI6Imh0dHBzOi8vcmFuZG9td2Vic2l0ZS13ZWItYXBpLmNvbSJ9.-Bo6TFNMeVdpqk0W-PRJqBlJGXgEBiWQzsiNH5t_-Qg";
localStorage.setItem("token", jwt);
//gonna use a temporary jwt just for testing, the login page will be implemented later

export interface ActionResult {
  success: boolean;
}

export interface Sorting {
  field: string;
  sortType: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
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
