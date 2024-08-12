import React, { useState } from "react";
import axios from "axios";

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        console.log("uploadedFile ::",uploadedFile)
        if (uploadedFile) {
            // Validate file type
            const validFileTypes = [
                "application/x-ifc",
                "model/ifc",
                "application/octet-stream",
                ""
            ];
            if (!validFileTypes.includes(uploadedFile.type)) {
                setError("Invalid file type. Please upload an IFC file.");
                setFile(null);
            } else {
                setFile(uploadedFile);
                setError("");
            }
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setSuccess("");
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            if (response.data.success) {
                setSuccess("File uploaded and converted successfully.");
            } else {
                setError("Failed to convert file.");
            }
        } catch (err) {
            setError("An error occurred while uploading the file.");
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Upload IFC File</h2>
            <input type="file" accept=".ifc" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
};

export default UploadFile;
