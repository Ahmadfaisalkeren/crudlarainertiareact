import MyOwnModal from "@/Components/MyOwnModal";
import Toaster from "@/Components/Toaster/Toaster";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

const DeleteCity = ({ isOpen, onClose, cityId }) => {
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/city/${cityId}/delete`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });
            setToastMessage("Data Deleted successfully!");
            setShowToast(true);
            onClose();
            Inertia.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <MyOwnModal isOpen={isOpen} onClose={onClose}>
                <div className="p-4 text-center">
                    <div className="text-white">
                        <h2 className="text-xl font-bold mb-4">
                            Delete City
                        </h2>
                        <p className="font-semibold">
                            Are you sure want to delete the data ?
                        </p>
                        <p className="font-light">
                            Deleted data can't be revert
                        </p>
                    </div>
                    <button
                        className="bg-red-500 hover:bg-red-700 duration-300 shadow-lg text-white px-2 py-2 mt-5 rounded mr-2"
                        onClick={handleDelete}
                    >
                        <FaTrash className="inline-block mr-1" />
                        <span>Confirm Delete</span>
                    </button>
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

export default DeleteCity;
