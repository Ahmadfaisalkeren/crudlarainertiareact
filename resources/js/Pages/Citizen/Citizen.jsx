import React, { useEffect, useState } from "react";
import AddCitizen from "./AddCitizen";
import { ImageURL } from "@/Components/ImageUrl";
import Search from "@/Components/Search";
import Pagination from "@/Components/Pagination";
import UpdateCitizen from "./UpdateCitizen";
import DeleteCitizen from "./DeleteCitizen";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import ItemsPerPage from "@/Components/ItemsPerPage";

const Citizen = ({ auth, citizens, cities, provinces }) => {
    const [addCitizenModal, setAddCitizenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [updateCitizenModal, setUpdateCitizenModal] = useState(false);
    const [deleteCitizenModal, setDeleteCitizenModal] = useState(false);
    const [updateCitizen, setUpdateCitizen] = useState(null);
    const [deleteCitizen, setDeleteCitizen] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filteredCitizens = citizens.filter(
        (citizen) =>
            citizen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            citizen.pob.toLowerCase().includes(searchQuery.toLowerCase()) ||
            citizen.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCitizens = filteredCitizens.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(filteredCitizens.length / itemsPerPage);

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
                    Citizen Data
                </h2>
            }
        >
            <Head title="Citizen" />

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
                                        onClick={() => setAddCitizenModal(true)}
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
                                                Name
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Place Of Birth
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Date Of Birth
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Gender
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Address
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Image
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y bar-chart-title divide-gray-200">
                                        {currentCitizens.length > 0 ? (
                                            currentCitizens.map(
                                                (citizen, index) => (
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
                                                            {citizen.name}
                                                        </td>
                                                        <td
                                                            className="px-2 py-4 whitespace-normal"
                                                            style={{
                                                                width: "250px",
                                                            }}
                                                        >
                                                            {citizen.pob}
                                                        </td>
                                                        <td
                                                            className="px-2 py-4 whitespace-normal"
                                                            style={{
                                                                width: "250px",
                                                            }}
                                                        >
                                                            {new Date(
                                                                citizen.dob
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                }
                                                            )}
                                                        </td>
                                                        <td
                                                            className="px-2 py-4 whitespace-normal"
                                                            style={{
                                                                width: "250px",
                                                            }}
                                                        >
                                                            {citizen.gender}
                                                        </td>
                                                        <td
                                                            className="px-2 py-4 whitespace-normal"
                                                            style={{
                                                                width: "250px",
                                                            }}
                                                        >
                                                            {citizen.address},{" "}
                                                            {
                                                                citizen.city
                                                                    .city_name
                                                            }
                                                            ,{" "}
                                                            {
                                                                citizen.province
                                                                    .province_name
                                                            }
                                                        </td>
                                                        <td
                                                            className="px-2 py-4 whitespace-normal"
                                                            style={{
                                                                width: "250px",
                                                            }}
                                                        >
                                                            <img
                                                                src={`${ImageURL}storage/${citizen.image}`}
                                                                alt="Image Not Found"
                                                                className="w-20 h-20"
                                                            />
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
                                                                        setUpdateCitizen(
                                                                            citizen
                                                                        );
                                                                        setUpdateCitizenModal(
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
                                                                        setDeleteCitizen(
                                                                            citizen
                                                                        );
                                                                        setDeleteCitizenModal(
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
                                        Showing {currentCitizens.length} data of{" "}
                                        {filteredCitizens.length}
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
                        <AddCitizen
                            isOpen={addCitizenModal}
                            onClose={() => setAddCitizenModal(false)}
                            cities={cities}
                            provinces={provinces}
                        />
                        {updateCitizen && (
                            <UpdateCitizen
                                isOpen={updateCitizenModal}
                                onClose={() => setUpdateCitizenModal(false)}
                                citizenData={updateCitizen}
                                cities={cities}
                                provinces={provinces}
                            />
                        )}
                        {deleteCitizen && (
                            <DeleteCitizen
                                isOpen={deleteCitizenModal}
                                onClose={() => setDeleteCitizenModal(false)}
                                citizenData={deleteCitizen}
                                citizenId={deleteCitizen.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Citizen;
