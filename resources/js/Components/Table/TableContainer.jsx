import React, { useState } from "react";
import ItemsPerPage from "./ItemsPerPage";
import Pagination from "./Pagination";
import Search from "./Search";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const TableContainer = ({ columns, data, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    const getNestedValue = (obj, path) => {
        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
    };

    const filteredData = data.filter((item) =>
        columns.some((column) => {
            const value =
                typeof column.accessor === "function"
                    ? column.accessor(item)
                    : getNestedValue(item, column.accessor);
            return (
                value &&
                value
                    .toString()
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            );
        })
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const dataWithSequenceNumbers = currentData.map((item, index) => ({
        ...item,
        sequenceNumber: indexOfFirstItem + index + 1,
    }));

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <ItemsPerPage
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                />
                <Search searchQuery={searchQuery} handleSearch={handleSearch} />
            </div>
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.header}
                                className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                        <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {dataWithSequenceNumbers.length > 0 ? (
                        dataWithSequenceNumbers.map((item, index) => (
                            <tr key={index}>
                                {columns.map((column) => (
                                    <td
                                        key={column.header}
                                        className="px-2 py-4 whitespace-normal"
                                    >
                                        {typeof column.render === "function"
                                            ? column.render(item)
                                            : typeof column.accessor ===
                                              "function"
                                            ? column.accessor(item)
                                            : getNestedValue(
                                                  item,
                                                  column.accessor
                                              )}
                                    </td>
                                ))}
                                <td className="px-2 py-4 whitespace-normal">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 text-blue-500 py-1 px-2 rounded flex items-center space-x-1 mb-1 text-sm"
                                        >
                                            <FaPencilAlt className="mr-1" />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(item)}
                                            className="bg-gray-200 hover:bg-red-500 hover:text-white duration-300 text-red-500 py-1 px-2 rounded flex items-center space-x-1 mr-2 mb-1 text-sm"
                                        >
                                            <FaTrash className="mr-1" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length + 1}
                                className="px-2 py-4 whitespace-nowrap text-center"
                            >
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="mt-4 flex justify-between">
                <div>
                    Showing {currentData.length} of {filteredData.length}{" "}
                    entries
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginate={paginate}
                />
            </div>
        </div>
    );
};

export default TableContainer;
