import React from "react";
import { AiOutlineLeft } from "react-icons/ai";


const Pagination = ({ paginationMeta, onPaginationChange }) => {

    if (!paginationMeta || paginationMeta.last_page <= 1) return null;

    const { current_page, last_page: totalPages } = paginationMeta;

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages && page !== current_page) {
            onPaginationChange(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const leftLimit = 5; // Always show 5 pages on the left side of the dots

        // If total pages are small, just show all of them without dots
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        // Case 1: Current page is within the first 5 pages
        if (current_page <= 4) {
            for (let i = 1; i <= leftLimit; i++) {
                pages.push(i);
            }
            pages.push("spread");
            pages.push(totalPages);
        }
        // Case 2: Current page is near the end
        else if (current_page > totalPages - 4) {
            pages.push(1);
            pages.push("spread");
            for (let i = totalPages - 4; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        // Case 3: Current page is in the middle
        else {
            pages.push(1);
            pages.push("spread");
            // Shows 3 pages in the middle: [Prev] [Current] [Next]
            pages.push(current_page - 1);
            pages.push(current_page);
            pages.push(current_page + 1);
            pages.push("spread");
            pages.push(totalPages);
        }

        return pages;
    };

    const pageButtons = getPageNumbers();

    return (
        <div className="flex justify-end gap-2 mt-4">
            {/* Previous Button */}
            <button
                className={`button-outline !px-3 !py-2 flex items-center justify-center ${current_page === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                onClick={() => handlePageClick(current_page - 1)}
                disabled={current_page === 1}
            >
                <AiOutlineLeft />
            </button>

            {/* Page Buttons */}
            {pageButtons.map((item, index) => {
                if (item === "spread") {
                    return (
                        <span
                            key={`spread-${index}`}
                            className="px-4 py-[5px] text-gray-500 select-none"
                        >
                            ...
                        </span>
                    );
                }

                const isCurrent = item === current_page;
                return (
                    <button
                        key={`page-${item}`}
                        className={`px-4 py-[5px] ${isCurrent ? "bg-primary text-light" : "button-outline"
                            }`}
                        onClick={() => handlePageClick(item)}
                        disabled={isCurrent}
                    >
                        {item}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                className={`button-outline !px-3 !py-2 rotate-180 flex items-center justify-center ${current_page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                onClick={() => handlePageClick(current_page + 1)}
                disabled={current_page === totalPages}
            >
                <AiOutlineLeft />
            </button>
        </div>
    );
};

export default Pagination;