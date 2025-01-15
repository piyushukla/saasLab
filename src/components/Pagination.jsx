import React from "react";
import "../style/Pagination.css";

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Number of visible pages

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if at the end of the pagination range
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // first page and ellipsis
    if (startPage > 1) {
      pageNumbers.push(
        <li key="start-ellipsis" className="page-item">
          <button onClick={() => paginate(1)}>1</button>
        </li>
      );
      pageNumbers.push(
        <li key="start-ellipsis-dots" className="page-item ellipsis">
          ...
        </li>
      );
    }

    // visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
          aria-current={currentPage === i ? "page" : undefined}
        >
          <button onClick={() => paginate(i)}>{i}</button>
        </li>
      );
    }

    // Add last page and ellipsis
    if (endPage < totalPages) {
      pageNumbers.push(
        <li key="end-ellipsis-dots" className="page-item ellipsis">
          ...
        </li>
      );
      pageNumbers.push(
        <li key="end" className="page-item">
          <button onClick={() => paginate(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination">
        {/* Previous Button */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
        </li>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
