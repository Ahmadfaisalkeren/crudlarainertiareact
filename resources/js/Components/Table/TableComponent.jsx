import React from 'react';

const TableComponent = ({ columns, data, onEdit, onDelete }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index} className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            {col.header}
                        </th>
                    ))}
                    <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data.length > 0 ? (
                    data.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-2 py-4 whitespace-normal">
                                    {col.render ? col.render(item[col.accessor], item) : item[col.accessor]}
                                </td>
                            ))}
                            <td className="px-2 py-4 whitespace-normal">
                                <div className="flex space-x-2">
                                    <button onClick={() => onEdit(item)} className="bg-gray-200 hover:bg-blue-500 hover:text-white duration-300 text-blue-500 py-1 px-2 rounded flex items-center space-x-1 mb-1 text-sm">
                                        Edit
                                    </button>
                                    <button onClick={() => onDelete(item)} className="bg-gray-200 hover:bg-red-500 hover:text-white duration-300 text-red-500 py-1 px-2 rounded flex items-center space-x-1 mb-1 text-sm">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length + 1} className="px-2 py-4 whitespace-nowrap text-center">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TableComponent;
