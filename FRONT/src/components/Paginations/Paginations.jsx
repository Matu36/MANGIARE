import React from "react";
import s from "../Paginations/Paginations.module.css";

export default function Paginations(props) {
  const { numberOfPage, currentPage, handlePageNumber } = props;

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const handleClick = (newPage) => {
    handlePageNumber(newPage);
  };

  return (
    <div className={s.pagesButtons}>
      {currentPage > 1 && (
        <button className={s.buttonsPagination} onClick={() => handleClick(1)}>
          {"First Page"}
        </button>
      )}

      {currentPage > 1 && (
        <button
          className={s.buttonsPagination}
          onClick={() => handleClick(previousPage)}
        >
          {"Prev Page"}
        </button>
      )}

      {currentPage > 2 && (
        <button
          className={s.buttonsPagination}
          onClick={() => handleClick(previousPage)}
        >
          {previousPage - 1}
        </button>
      )}

      {currentPage > 1 && (
        <button
          className={s.buttonsPagination}
          onClick={() => handleClick(previousPage)}
        >
          {previousPage}
        </button>
      )}

      <button className={s.buttonsPagination}>
        <div className={s.actualPage}>{currentPage}</div>
      </button>

      {numberOfPage >= nextPage && (
        <button
          className={s.buttonsPagination}
          onClick={() => handleClick(nextPage)}
        >
          {nextPage}
        </button>
      )}

      {numberOfPage > currentPage && (
        <button
          className={s.buttonsPagination}
          onClick={() => handleClick(nextPage)}
        >
          {"Next Page"}
        </button>
      )}

      {numberOfPage > currentPage && (
        <button
          className={s.buttonsPagination}
          onClick={() => handleClick(numberOfPage)}
        >
          {"Last Page"}
        </button>
      )}
    </div>
  );
}
