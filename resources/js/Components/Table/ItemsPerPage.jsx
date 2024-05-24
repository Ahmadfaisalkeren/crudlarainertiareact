import React from "react";

const ItemsPerPage = ({ value, onChange }) => {
    return (
        <div className="flex space-x-2">
            <select
                className="bg-white border rounded px-2 py-1"
                value={value}
                onChange={onChange}
                style={{ width: "70px" }}
            >
                {[1, 5, 10, 25, 50, 100].map((perPage) => (
                    <option key={perPage} value={perPage}>
                        {perPage}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ItemsPerPage;
