import React, { useEffect, useState } from "react";
import AddCitizen from "./AddCitizen";
import { ImageURL } from "@/Components/ImageUrl";

const Citizen = ({ citizens }) => {
    const [citizenData, setCitizenData] = useState(citizens);
    const [addCitizenModal, setAddCitizenModal] = useState(false);

    const updateCitizens = (newCitizens) => {
        setCitizenData(newCitizens);
        console.log("Update Citizens:", newCitizens);
    };

    return (
        <>
            <div className="text-gray-900">
                <div className="p-10">
                    <div className="flex justify-between items-center mb-4">
                        <p>Citizen Data</p>
                        <button
                            className="flex items-center bg-blue-500 hover:bg-blue-700 duration-300 text-white text-sm rounded py-2 px-2"
                            onClick={() => setAddCitizenModal(true)}
                        >
                            Add Data
                        </button>
                    </div>
                    <table className="min-w-full divide-y bar-chart-title divide-gray-200 border border-gray-300 rounded-md">
                        <thead>
                            <tr>
                                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    No
                                </th>
                                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Place Of Birth
                                </th>
                                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Date Of Birth
                                </th>
                                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Gender
                                </th>
                                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Address
                                </th>
                                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Image
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y bar-chart-title divide-gray-200">
                            {citizens.length > 0 ? (
                                citizens.map((citizen, index) => (
                                    <tr key={index}>
                                        <td
                                            className="px-2 py-4 whitespace-normal"
                                            style={{ width: "5px" }}
                                        >
                                            {index + 1}
                                        </td>
                                        <td
                                            className="px-2 py-4 whitespace-normal"
                                            style={{ width: "250px" }}
                                        >
                                            {citizen.name}
                                        </td>
                                        <td
                                            className="px-2 py-4 whitespace-normal"
                                            style={{ width: "250px" }}
                                        >
                                            {citizen.pob}
                                        </td>
                                        <td
                                            className="px-2 py-4 whitespace-normal"
                                            style={{ width: "250px" }}
                                        >
                                            {citizen.dob}
                                        </td>
                                        <td
                                            className="px-2 py-4 whitespace-normal"
                                            style={{ width: "250px" }}
                                        >
                                            {citizen.gender}
                                        </td>
                                        <td
                                            className="px-2 py-4 whitespace-normal"
                                            style={{ width: "250px" }}
                                        >
                                            <img
                                                src={`${ImageURL}storage/${citizen.image}`}
                                                alt="Image Not Found"
                                                className="w-20 h-20"
                                            />
                                        </td>
                                        <td
                                            className="px-2 py-4 whitespace-normal"
                                            style={{ width: "100px" }}
                                        >
                                            <div className="flex space-x-2">
                                                <button className="bg-gray-200 border-4 border-blue-500 hover:bg-blue-500 hover:text-white duration-300 text-blue-500 py-1 px-2 rounded flex items-center space-x-1 mb-1 text-sm">
                                                    <span>Edit</span>
                                                </button>
                                                <button className="bg-gray-200 hover:bg-red-500 hover:text-white duration-300 text-red-500 py-1 px-2 rounded flex items-center space-x-1 mr-2 mb-1 text-sm">
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-2 py-4 whitespace-nowrap text-center"
                                    >
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <AddCitizen
                isOpen={addCitizenModal}
                onClose={() => setAddCitizenModal(false)}
                updateCitizens={updateCitizens}
            />
        </>
    );
};

export default Citizen;
