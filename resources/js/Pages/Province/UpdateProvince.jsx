import { ImageURL } from "@/Components/ImageUrl";
import MyOwnModal from "@/Components/MyOwnModal";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import Toaster from "@/Components/Toaster/Toaster";

const UpdateProvince = ({ isOpen, onClose, provinceData }) => {
    const [province_name, setProvinceName] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (provinceData) {
            setProvinceName(provinceData.province_name)
        }
    }, [provinceData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("province_name", province_name);

        try {
            const response = await fetch(`/province/${provinceData.id}/update`, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: formData,
            });

            setToastMessage("Data Updated successfully!");
            setShowToast(true);
            Inertia.reload();
            onClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <MyOwnModal isOpen={isOpen} onClose={onClose}>
                <div className="p-4">
                    <h2 className="text-white font-bold text-xl mb-4">
                        Update Province
                    </h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label
                                htmlFor="province_name"
                                className="block text-sm font-medium text-white"
                            >
                                Province Name
                            </label>
                            <input
                                type="text"
                                id="province_name"
                                name="province_name"
                                value={province_name}
                                onChange={(e) => setProvinceName(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-1 px-2 rounded flex items-center space-x-1"
                            >
                                <FaPlus className="mr-1"/>
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </MyOwnModal>
            {showToast && (
                <Toaster
                    message={toastMessage}
                    duration={5000}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
};

export default UpdateProvince;
