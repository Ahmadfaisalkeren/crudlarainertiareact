import React, { useEffect, useState } from "react";
import AddCitizen from "./AddCitizen";
import Search from "@/Components/Table/Search";
import Pagination from "@/Components/Table/Pagination";
import UpdateCitizen from "./UpdateCitizen";
import DeleteCitizen from "./DeleteCitizen";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import ItemsPerPage from "@/Components/Table/ItemsPerPage";
import TableContainer from "@/Components/Table/TableContainer";

const Citizen = ({ auth, citizens, cities, provinces }) => {
    const [addCitizenModal, setAddCitizenModal] = useState(false);
    const [updateCitizenModal, setUpdateCitizenModal] = useState(false);
    const [deleteCitizenModal, setDeleteCitizenModal] = useState(false);
    const [updateCitizen, setUpdateCitizen] = useState(null);
    const [deleteCitizen, setDeleteCitizen] = useState(null);

    const handleEdit = (citizen) => {
        setUpdateCitizen(citizen);
        setUpdateCitizenModal(true);
    };

    const handleDelete = (citizen) => {
        setDeleteCitizen(citizen);
        setDeleteCitizenModal(true);
    };

    const columns = [
        { header: "No", accessor: "sequenceNumber" },
        { header: "Name", accessor: "name" },
        { header: "Place Of Birth", accessor: "pob" },
        {
            header: "Date Of Birth",
            accessor: (item) =>
                new Date(item.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
        },
        { header: "Gender", accessor: "gender" },
        {
            header: "Address",
            accessor: (item) =>
                `${item.address}, ${item.city.city_name}, ${item.province.province_name}`,
        },
        {
            header: "Image",
            accessor: (item) => item.image,
            render: (item) => (
                <img
                    src={`storage/${item.image}`}
                    alt="Image Not Found"
                    className="w-20 h-20"
                />
            ),
        },
    ];

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
                                    <button
                                        className="flex items-center bg-blue-500 hover:bg-blue-700 duration-300 text-white text-sm rounded py-2 px-2"
                                        onClick={() => setAddCitizenModal(true)}
                                    >
                                        <FaPlus className="mr-1" /> Add Data
                                    </button>
                                </div>
                                <TableContainer
                                    columns={columns}
                                    data={citizens}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
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
