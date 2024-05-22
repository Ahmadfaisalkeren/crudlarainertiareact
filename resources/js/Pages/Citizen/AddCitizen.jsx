import MyOwnModal from "@/Components/MyOwnModal";
import Toaster from "@/Components/Toaster/Toaster";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";
import ReactSelect from "react-select";

const AddCitizen = ({ isOpen, onClose, cities, provinces }) => {
    const [name, setName] = useState("");
    const [pob, setPob] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [city_id, setCityId] = useState("");
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [image, setImage] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const inputFile = useRef(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    };
    const handlePob = (e) => {
        setPob(e.target.value);
    };
    const handleDob = (e) => {
        setDob(e.target.value);
    };
    const handleGender = (e) => {
        setGender(e.target.value);
    };
    const handleAddress = (e) => {
        setAddress(e.target.value);
    };
    const handleCityId = (e) => {
        setCityId(e.target.value);
    };

    const handleProvinceChange = (selectedOption) => {
        setSelectedProvince(selectedOption);
        setCityId("");
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("pob", pob);
        formData.append("dob", dob);
        formData.append("gender", gender);
        formData.append("address", address);
        formData.append("city_id", city_id);
        formData.append("province_id", selectedProvince.value);
        formData.append("image", image);

        try {
            const response = await fetch("/citizen", {
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

            setName("");
            setPob("");
            setDob("");
            setGender("");
            setAddress("");
            setCityId("");
            setSelectedProvince(null);
            setPreviewUrl("");

            // Logic dibawah ini untuk clear input file value setelah store data berhasil
            if (inputFile.current) {
                inputFile.current.value = "";
                inputFile.current.type = "text";
                inputFile.current.type = "file";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClose = () => {
        setName("");
        setPob("");
        setDob("");
        setGender("");
        setAddress("");
        setCityId("");
        setSelectedProvince(null);
        setPreviewUrl("");
        setImage(null);
        if (inputFile.current) {
            inputFile.current.value = "";
        }
        onClose();
    };

    const filteredCities = cities.filter(
        (city) => city.province_id === selectedProvince?.value
    );

    const provinceOptions = provinces.map((province) => ({
        value: province.id,
        label: province.province_name,
    }));

    return (
        <>
            <MyOwnModal isOpen={isOpen} onClose={handleClose}>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-white">
                        Add New Citizen
                    </h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={handleName}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="pob"
                                className="block text-sm font-medium text-white"
                            >
                                POB
                            </label>
                            <input
                                id="pob"
                                name="pob"
                                value={pob}
                                onChange={handlePob}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                                rows="3"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="dob"
                                className="block text-sm font-medium text-white"
                            >
                                DOB
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={dob}
                                onChange={handleDob}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-white"
                            >
                                Gender
                            </label>
                            <div className="flex mt-1">
                                <label className="inline-flex items-center mr-4">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={gender === "male"}
                                        onChange={handleGender}
                                        className="form-radio"
                                    />
                                    <span className="ml-2 text-white">
                                        Male
                                    </span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        checked={gender === "female"}
                                        onChange={handleGender}
                                        className="form-radio"
                                    />
                                    <span className="ml-2 text-white">
                                        Female
                                    </span>
                                </label>
                            </div>
                        </div>
                        <p className=" text-white">Select The Address</p>
                        <label
                            htmlFor="city_id"
                            className="block text-sm font-medium text-white"
                        >
                            Select Province
                        </label>
                        <ReactSelect
                            placeholder="Select Province"
                            id="province_id"
                            name="province_id"
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            options={provinceOptions}
                            className="mt-1 py-2 rounded-md w-full"
                            required
                        >
                            <option value="">Select Province</option>
                            {provinces.map((province) => (
                                <option key={province.id} value={province.id}>
                                    {province.province_name}
                                </option>
                            ))}
                        </ReactSelect>
                        <label
                            htmlFor="city_id"
                            className="block text-sm font-medium text-white mt-2"
                        >
                            Select City
                        </label>
                        <select
                            name="city_id"
                            id="city_id"
                            value={city_id}
                            onChange={handleCityId}
                            disabled={!selectedProvince}
                            className="px-3 py-2 border rounded-md w-full mt-2"
                            required
                        >
                            <option value="">Select City</option>
                            {filteredCities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.city_name}
                                </option>
                            ))}
                        </select>
                        <p className=" text-white">Complete Address</p>
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-white"
                            >
                                Address
                            </label>
                            <textarea
                                type="text"
                                rows={5}
                                id="address"
                                name="address"
                                value={address}
                                onChange={handleAddress}
                                className="mt-1 px-3 py-2 border rounded-md w-full"
                                required
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-white"
                            >
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImage}
                                ref={inputFile}
                                className="block w-full text-sm text-white
                file:mr-4 file:py-2 file:px-4 file:rounded-md
                file:border-0 file:text-sm file:font-semibold
                file:bg-pink-50 file:text-pink-700
                hover:file:bg-pink-100 mt-1"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm font-medium text-white"
                                htmlFor="imagePreview"
                            >
                                Image Preview
                            </label>
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="Image Broken"
                                    className="mt-2 flex"
                                    width="100px"
                                />
                            )}
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

export default AddCitizen;
