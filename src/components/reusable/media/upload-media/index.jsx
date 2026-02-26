"use client";
import React, { useState } from "react";
import { Upload, message } from "antd";
import { FaXmark } from "react-icons/fa6";
import { IoMdSave } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useUploadMedia } from "../services/mediaApi";
import toast from "react-hot-toast";


const UploadMedia = ({ setActiveTabKey }) => {

    const [fileList, setFileList] = useState([]);
    const uploadMutation = useUploadMedia();

    const isUploading = uploadMutation.isPending || uploadMutation.isLoading;

    // Controlled upload update
    const handleChange = ({ fileList: newList }) => {
        setFileList(newList);
    };

    // Remove file
    const handleRemove = (file) => {
        setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
        message.info("Image removed.");
    };

    // Submit all files to backend
    const handleSave = () => {
        if (fileList.length === 0) {
            return;
        }

        uploadMutation.mutate(fileList, {
            onSuccess: (res) => {
                toast.success(res?.message || "Uploaded");
                setFileList([]);
                setActiveTabKey("1");
            },
            onError: (err) => {
                toast.error(err?.message || "Upload failed");
            }
        });
    };

    return (
        <div>
            {/* Upload box */}
            <div
                className="flex flex-col items-center justify-center min-h-[300px] p-10 text-center bg-[#fafafa]"
                style={{
                    border: "2px dashed #d9d9d9",
                    borderRadius: 10,
                }}
            >
                <Upload
                    multiple
                    fileList={fileList}
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleChange}
                    accept="image/*"
                >
                    <button className="button">
                        <IoCloudUploadOutline size={20} />
                        Click to Upload
                    </button>
                </Upload>

                {/* Grid preview */}
                {fileList.length > 0 && (
                    <div
                        className="w-full mt-6 grid gap-4"
                        style={{
                            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                        }}
                    >
                        {fileList.map((file) => {
                            const src =
                                file.thumbUrl ||
                                file.url ||
                                (file.originFileObj ? URL.createObjectURL(file.originFileObj) : null);

                            return (
                                <div
                                    key={file.uid}
                                    className="relative w-[120px] h-[120px] border rounded-md overflow-hidden"
                                >
                                    <img
                                        src={src}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                    />

                                    <button
                                        onClick={() => handleRemove(file)}
                                        className="absolute top-2 right-2 w-5 h-5 bg-slate-400 rounded-full flex justify-center items-center"
                                        type="button"
                                    >
                                        <FaXmark className="mt-[2px] ml-[1px]" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Save button */}
            <div className="flex justify-center items-center mt-6">
                <button
                    className="button"
                    onClick={handleSave}
                    disabled={fileList?.length == 0 || isUploading}
                >
                    <IoMdSave />
                    {isUploading ? "Uploading..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default UploadMedia;
