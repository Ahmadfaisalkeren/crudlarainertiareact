import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
        <nav>
            <ul className="pagination flex">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className="page-link bg-gray-900 text-white duration-300 px-2 py-1 rounded-xl"
                        >
                            Previous
                        </button>
                    </li>
                )}

                {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(pageNumber => (
                    <li key={pageNumber} className="page-item">
                        <button
                            onClick={() => paginate(pageNumber)}
                            className={`page-link ${currentPage === pageNumber ? "bg-gray-900 text-white" : "hover:bg-gray-600"} duration-300 px-2 py-1 rounded-xl`}
                            style={{ margin: "0 5px" }}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}

                {currentPage < totalPages && (
                    <li className="page-item">
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className="page-link bg-gray-900 text-white duration-300 px-2 py-1 rounded-xl"
                        >
                            Next
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
