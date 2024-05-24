import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AddProvince from "./AddProvince";
import UpdateProvince from "./UpdateProvince";
import DeleteProvince from "./DeleteProvince";
import TableContainer from "@/Components/Table/TableContainer";

const Province = ({ auth, provinces }) => {
    const [addProvinceModal, setAddProvinceModal] = useState(false);
    const [updateProvinceModal, setUpdateProvinceModal] = useState(false);
    const [deleteProvinceModal, setDeleteProvinceModal] = useState(false);
    const [updateProvince, setUpdateProvince] = useState(null);
    const [deleteProvince, setDeleteProvince] = useState(null);

    const handleEdit = (province) => {
        setUpdateProvince(province);
        setUpdateProvinceModal(true);
    };

    const handleDelete = (province) => {
        setDeleteProvince(province);
        setDeleteProvinceModal(true);
    };

    const columns = [
        { header: "No", accessor: "sequenceNumber" },
        { header: "Province Name", accessor: "province_name" },
    ];

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
                                    <button
                                        className="flex items-center bg-blue-500 hover:bg-blue-700 duration-300 text-white text-sm rounded py-2 px-2"
                                        onClick={() =>
                                            setAddProvinceModal(true)
                                        }
                                    >
                                        <FaPlus className="mr-1" /> Add Data
                                    </button>
                                </div>
                                <TableContainer
                                    columns={columns}
                                    data={provinces}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
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
