import MyOwnModal from "@/Components/MyOwnModal";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import Toaster from "@/Components/Toaster/Toaster";
import Select from "react-select";

const UpdateCity = ({ isOpen, onClose, cityData, province }) => {
    const [city_name, setCityName] = useState("");
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (cityData) {
            setCityName(cityData.city_name);
            if (cityData.province_id) {
                const selectedProvinceObject = province.find(
                    (prov) => prov.id === cityData.province_id
                );
                if (selectedProvinceObject) {
                    setSelectedProvince({
                        value: selectedProvinceObject.id,
                        label: selectedProvinceObject.province_name,
                    });
                }
            }
        }
    }, [cityData, province]);

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("province_id", selectedProvince.value);
        formData.append("city_name", city_name);

        try {
            const response = await fetch(`/city/${cityData.id}/update`, {
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
            console.log("Server response:", await response.text());
        }
    };

    const provinceOptions = province.map((provinces) => ({
        value: provinces.id,
        label: provinces.province_name,
    }));

    return (
        <>
            <MyOwnModal isOpen={isOpen} onClose={onClose}>
                <div className="p-4" style={{ height: "400px" }}>
                    <h2 className="text-white font-bold text-xl mb-4">
                        Update City
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="province_id"
                                className="block text-sm font-medium text-white"
                            >
                                Province Name
                            </label>
                            <Select
                                placeholder="Select Province"
                                id="province_id"
                                name="province_id"
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                options={provinceOptions}
                                className="mt-1 py-2 rounded-md w-full"
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
                                onChange={(e) => setCityName(e.target.value)}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                            />
                        </div>
                        <div className="flex justify-end mt-10">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-1 px-2 rounded flex items-center space-x-1"
                            >
                                <FaPlus className="mr-1" />
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

export default UpdateCity;
