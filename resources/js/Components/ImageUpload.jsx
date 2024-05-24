import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onUpload }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            onUpload(acceptedFiles);
        },
        [onUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
    });

    return (
        <div
            {...getRootProps()}
            className="border-dashed border-2 border-gray-400 p-4 text-center cursor-pointer"
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here...</p>
            ) : (
                <p>Drag & drop some files here, or click to select files</p>
            )}
        </div>
    );
};

export default ImageUpload;
