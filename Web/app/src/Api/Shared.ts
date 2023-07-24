export const baseUrl: string = "https://localhost:7069/api";
export const jwt: string =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OGVlZTAyOC02Yjg0LTQ2NDUtYjQzZC1kYTNhZWE2NTAyYTciLCJzdWIiOiJzdHJpbmdAZ21haWwuY29tIiwiZW1haWwiOiJzdHJpbmdAZ21haWwuY29tIiwibmFtZSI6InN0cmluZ0BnbWFpbC5jb20iLCJ1c2VyaWQiOiJmMGE1ODczNi0zOGYzLTQ5MTQtYTZlNi00NGMwNWQwYjRlMGUiLCJ1c2VyIjp0cnVlLCJhZG1pbiI6dHJ1ZSwibmJmIjoxNjkwMjA3NTUzLCJleHAiOjE2OTAyMzYzNTMsImlhdCI6MTY5MDIwNzU1MywiaXNzIjoiaHR0cHM6Ly9yYW5kb213ZWJzaXRlLmNvbSIsImF1ZCI6Imh0dHBzOi8vcmFuZG9td2Vic2l0ZS13ZWItYXBpLmNvbSJ9.fpeGTmyC0yXXd7x0oHErUbQESOl26xcHNSUDW8hDC-E"
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
