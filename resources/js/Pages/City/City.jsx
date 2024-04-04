import React, { useEffect, useState } from "react";
import AddCity from "./AddCity";
import Search from "@/Components/Search";
import Pagination from "@/Components/Pagination";
import UpdateCity from "./UpdateCity";
import DeleteCity from "./DeleteCity";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import ItemsPerPage from "@/Components/ItemsPerPage";

const City = ({ auth, cities, province }) => {
    const [addCityModal, setAddCityModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [updateCityModal, setUpdateCityModal] = useState(false);
    const [deleteCityModal, setDeleteCityModal] = useState(false);
    const [updateCity, setUpdateCity] = useState(null);
    const [deleteCity, setDeleteCity] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filteredCities = cities.filter((city) =>
        city.city_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.province.province_name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCities = filteredCities.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

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
                    City Data
                </h2>
            }
        >
            <Head title="City" />

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
                                        onClick={() => setAddCityModal(true)}
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
                                                City Name
                                            </th>
                                            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y bar-chart-title divide-gray-200">
                                        {currentCities.length > 0 ? (
                                            currentCities.map((city, index) => (
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
                                                        {city.province
                                                            ? city.province
                                                                  .province_name
                                                            : ""}
                                                    </td>
                                                    <td
                                                        className="px-2 py-4 whitespace-normal"
                                                        style={{
                                                            width: "250px",
                                                        }}
                                                    >
                                                        {city.city_name}
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
                                                                    setUpdateCity(
                                                                        city
                                                                    );
                                                                    setUpdateCityModal(
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
                                                                    setDeleteCity(
                                                                        city
                                                                    );
                                                                    setDeleteCityModal(
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
                                            ))
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
                                        Showing {currentCities.length} data of{" "}
                                        {filteredCities.length}
                                    </div>
                                    <nav>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            paginate={paginate}
                                            itemsPerPage={itemsPerPage}
                                            setItemsPerPage={setItemsPerPage}
                                        />
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <AddCity
                            isOpen={addCityModal}
                            onClose={() => setAddCityModal(false)}
                            province={province}
                        />
                        {updateCity && (
                            <UpdateCity
                                isOpen={updateCityModal}
                                onClose={() => setUpdateCityModal(false)}
                                cityData={updateCity}
                                province={province}
                            />
                        )}
                        {deleteCity && (
                            <DeleteCity
                                isOpen={deleteCityModal}
                                onClose={() => setDeleteCityModal(false)}
                                cityData={deleteCity}
                                cityId={deleteCity.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default City;
