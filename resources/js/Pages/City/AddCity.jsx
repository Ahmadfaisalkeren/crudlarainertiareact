import MyOwnModal from "@/Components/MyOwnModal";
import Toaster from "@/Components/Toaster/Toaster";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import Select from "react-select";

const AddCity = ({ isOpen, onClose, province }) => {
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [city_name, setCityName] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
    };

    const handleCityName = (e) => {
        setCityName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("province_id", selectedProvince.value);
        formData.append("city_name", city_name);

        try {
            const response = await fetch("/city", {
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

            setCityName("");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClose = () => {
        setSelectedProvince(null);
        setCityName("");
        onClose();
    };

    const provinceOptions = province.map((provinces) => ({
        value: provinces.id,
        label: provinces.province_name,
    }));

    return (
        <>
            <MyOwnModal isOpen={isOpen} onClose={handleClose}>
                <div className="p-4" style={{ height: "400px" }}>
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Add New City
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="province_id"
                                className="block text-sm font-medium text-white"
                            >
                                Select Province
                            </label>
                            <Select
                                placeholder="Select Province"
                                id="province_id"
                                name="province_id"
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                options={provinceOptions}
                                className="mt-1 py-2 rounded-md w-full"
                                required
                            >
                                {province.map((provinces) => (
                                    <option
                                        key={provinces.id}
                                        value={provinces.id}
                                    >
                                        {provinces.province_name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="city_name"
                                className="block text-sm font-medium text-white"
                            >
                                City Name
                            </label>
                            <input
                                type="text"
                                id="city_name"
                                name="city_name"
                                value={city_name}
                                onChange={handleCityName}
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

export default AddCity;
