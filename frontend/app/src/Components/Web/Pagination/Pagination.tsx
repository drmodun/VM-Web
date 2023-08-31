import { useEffect, useState } from "react";
import classes from "./Pagination.module.scss";
interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  useEffect(() => {}, []);

  return (
    <div className={classes.Container}>
      <div className={classes.Pagination}>
        <button
          className={classes.Button}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          className={classes.Button}
          onClick={() =>
            onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1)
          }
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from(Array(totalPages).keys())
          .map((i) => i + 1)
          .splice(
            currentPage + 2 > totalPages
              ? Math.max(currentPage - (5 - (totalPages - currentPage)), 0)
              : Math.max(0, currentPage - 3),
            Math.min(5, totalPages)
          )
          .map((page) => (
            <button
              key={page}
              className={page === currentPage ? classes.Active : classes.Button}
              onClick={() => onPageChange(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ))}
        <button
          className={classes.Button}
          onClick={() =>
            onPageChange(
              currentPage + 1 < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          className={classes.Button}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};
