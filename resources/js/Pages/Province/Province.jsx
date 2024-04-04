import React, { useEffect, useState } from "react";
import AddProvince from "./AddProvince";
import { ImageURL } from "@/Components/ImageUrl";
import Search from "@/Components/Search";
import Pagination from "@/Components/Pagination";
import UpdateProvince from "./UpdateProvince";
import DeleteProvince from "./DeleteProvince";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import ItemsPerPage from "@/Components/ItemsPerPage";

const Province = ({ auth, provinces }) => {
    const [addProvinceModal, setAddProvinceModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [updateProvinceModal, setUpdateProvinceModal] = useState(false);
    const [deleteProvinceModal, setDeleteProvinceModal] = useState(false);
    const [updateProvince, setUpdateProvince] = useState(null);
    const [deleteProvince, setDeleteProvince] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filteredProvinces = provinces.filter((province) =>
        province.province_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProvinces = filteredProvinces.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(filteredProvinces.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Province Data
                </h2>
            }
        >
            <Head title="Province" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">
                            <div className="p-10">
                                <div className="flex justify-between items-center mb-4">
                                    <ItemsPerPage
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                    />
                                    <Search
                                        searchQuery={searchQuery}
                                        handleSearch={handleSearch}
                                    />
                                    <button
                                        className="flex items-center bg-blue-500 hover:bg-blue-700 duration-300 text-white text-sm rounded py-2 px-2"
                                        onClick={() =>
                                            setAddProvinceModal(true)
                                        }
                                    >
                                        <FaPlus className="mr-1" /> Add Data
                                    </button>
                                </div>
                                <table className="min-w-full divide-y bar-chart-title divide-gray-200 border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                No
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Province Name
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y bar-chart-title divide-gray-200">
                                        {currentProvinces.length > 0 ? (
                                            currentProvinces.map(
                                                (province, index) => (
                                                    <tr key={index}>
                                                        <td
                                                            className="px-2 py-4 whitespace-normal"
                                                            style={{
                                                                width: "5px",
                                                            }}
                                                        >
                                                            {index + 1}
                                                        </td>
                                                        <td
                                                            className="px-2 py-4 whitespace-normal"
                                                            style={{
                                                                width: "250px",
                                                            }}
                                                        >
                                                            {
                                                                province.province_name
                                                            }
                                                        </td>
                                                        <td
                                                            className="px-2 py-4 whitespace-normal"
                                                            style={{
                                                                width: "100px",
                                                            }}
                                                        >
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setUpdateProvince(
                                                                            province
                                                                        );
                                                                        setUpdateProvinceModal(
                                                                            true
                                                                        );
                                                                    }}
                                                                    className="bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 text-blue-500 py-1 px-2 rounded flex items-center space-x-1 mb-1 text-sm"
                                                                >
                                                                    <FaPencilAlt className="mr-1" />
                                                                    <span>
                                                                        Edit
                                                                    </span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setDeleteProvince(
                                                                            province
                                                                        );
                                                                        setDeleteProvinceModal(
                                                                            true
                                                                        );
                                                                    }}
                                                                    className="bg-gray-200 hover:bg-red-500 hover:text-white duration-300 text-red-500 py-1 px-2 rounded flex items-center space-x-1 mr-2 mb-1 text-sm"
                                                                >
                                                                    <FaTrash className="mr-1" />
                                                                    <span>
                                                                        Delete
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="px-2 py-4 whitespace-nowrap text-center"
                                                >
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="mt-4 bar-chart-title flex justify-between">
                                    <div>
                                        Showing {currentProvinces.length} data
                                        of {filteredProvinces.length}
                                    </div>
                                    <nav>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            paginate={paginate}
                                        />
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <AddProvince
                            isOpen={addProvinceModal}
                            onClose={() => setAddProvinceModal(false)}
                        />
                        {updateProvince && (
                            <UpdateProvince
                                isOpen={updateProvinceModal}
                                onClose={() => setUpdateProvinceModal(false)}
                                provinceData={updateProvince}
                            />
                        )}
                        {deleteProvince && (
                            <DeleteProvince
                                isOpen={deleteProvinceModal}
                                onClose={() => setDeleteProvinceModal(false)}
                                provinceData={deleteProvince}
                                provinceId={deleteProvince.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Province;
