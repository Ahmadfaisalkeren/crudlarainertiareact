import MyOwnModal from "@/Components/MyOwnModal";
import Toaster from "@/Components/Toaster/Toaster";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

const AddProvince = ({ isOpen, onClose  }) => {
    const [province_name, setProvinceName] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleProvinceName = (e) => {
        setProvinceName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("province_name", province_name);

        try {
            const response = await fetch("/province", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: formData,
            });

            setToastMessage("Data Stored Successfully");
            setShowToast(true);
            Inertia.reload();
            onClose();

            setProvinceName("");

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClose = () => {
        setProvinceName("");
        onClose();
    };

    return (
        <>
            <MyOwnModal isOpen={isOpen} onClose={handleClose}>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Add New Province
                    </h2>
                    <form onSubmit={handleSubmit}>
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
                                onChange={handleProvinceName}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-1 px-2 rounded flex items-center space-x-1"
                            >
                                <FaPlus className="mr-1" />
                                Submit
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

export default AddProvince;
