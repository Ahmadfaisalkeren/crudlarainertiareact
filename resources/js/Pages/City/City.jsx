import React, { useState } from "react";
import AddCity from "./AddCity";
import Search from "@/Components/Table/Search";
import Pagination from "@/Components/Table/Pagination";
import UpdateCity from "./UpdateCity";
import DeleteCity from "./DeleteCity";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import ItemsPerPage from "@/Components/Table/ItemsPerPage";
import TableContainer from "@/Components/Table/TableContainer";

const City = ({ auth, cities, province }) => {
    const [addCityModal, setAddCityModal] = useState(false);
    const [updateCityModal, setUpdateCityModal] = useState(false);
    const [deleteCityModal, setDeleteCityModal] = useState(false);
    const [updateCity, setUpdateCity] = useState(null);
    const [deleteCity, setDeleteCity] = useState(null);

    const handleEdit = (city) => {
        setUpdateCity(city);
        setUpdateCityModal(true);
    };

    const handleDelete = (city) => {
        setDeleteCity(city);
        setDeleteCityModal(true);
    };

    const columns = [
        { header: "No", accessor: "sequenceNumber" },
        { header: "Province Name", accessor: "province.province_name" },
        { header: "City Name", accessor: "city_name" },
    ];

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
                                    <button
                                        className="flex items-center bg-blue-500 hover:bg-blue-700 duration-300 text-white text-sm rounded py-2 px-2"
                                        onClick={() => setAddCityModal(true)}
                                    >
                                        <FaPlus className="mr-1" /> Add Data
                                    </button>
                                </div>
                                <TableContainer
                                    columns={columns}
                                    data={cities}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
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
