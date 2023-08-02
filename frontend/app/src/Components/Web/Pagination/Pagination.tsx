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
  const [pages, setPages] = useState<number[]>(
    Array.from(Array(totalPages).keys()).map((i) => i + 1)
  );

  useEffect(() => {
    setPages(Array.from(Array(totalPages).keys()).map((i) => i + 1));
  }, [totalPages]);

  useEffect(() => {
    const temp = Array.from(Array(totalPages).keys()).map((i) => i + 1);
    setPages(Array.from(Array(totalPages+1).keys()).map((i) => i + 1));
    console.log(totalPages, pages, temp);
  }, []);

  return (
    <div className={classes.Container}>
      <button
        className={classes.Button}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        {"<<"}
      </button>
      <button
        className={classes.Button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {pages
        .splice(
          Math.max(0, currentPage - 3),
          Math.min(Math.max(6, totalPages), currentPage + 3)
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
      <button
        className={classes.Button}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {">>" /*TODO: implement iconst instead of this*/}
      </button>
    </div>
  );
};
