import React from "react";
import { FaPlus, FaTrash, FaEye } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { TbRestore } from "react-icons/tb";
import { IoDuplicate } from "react-icons/io5";


// Add Button
export const AddButton = ({ onClick }) => (
    <button onClick={onClick} className="p-1 bg-green-100 text-green-600 border border-green-600 rounded-sm" title="Add">
        <FaPlus />
    </button>
);

// Edit Button
export const EditButton = ({ onClick }) => (
    <button onClick={onClick} className="p-1 bg-blue-100 text-blue-600 border border-blue-600 rounded-sm" title="Edit">
        <RiEditLine />
    </button>
);

// Delete Button
export const DeleteButton = ({ onClick }) => (
    <button onClick={onClick} className="p-1 bg-red-100 text-red-600 border border-red-600 rounded-sm" title="Delete">
        <FaTrash />
    </button>
);

// Delete Button
export const ViewButton = ({ onClick }) => (
    <button onClick={onClick} className="p-1 bg-blue-100 text-blue-600 border border-blue-600 rounded-sm" title="View">
        <FaEye />
    </button>
);

// Submit Button
export const SubmitButton = ({ loading, btnText = "Save", disabled = false }) => (
    <button type="submit" className="button" disabled={loading || disabled} title="Submit">
        {loading ? <Spin indicator={<LoadingOutlined spin />} size="small" className="!text-light" /> : <FaSave />}
        {loading ? "Please Wait" : `${btnText}`}
    </button>
);

// Restore Button
export const RestoreButton = ({ onClick }) => (
    <button onClick={onClick} className="p-1 bg-green-100 text-green-600 border border-green-600 rounded-sm" title="Restore">
        <TbRestore />
    </button>
);

// Restore Button
export const DuplicateButton = ({ onClick }) => (
    <button onClick={onClick} className="p-1 bg-green-100 text-green-600 border border-green-600 rounded-sm" title="Duplicate">
        <IoDuplicate />
    </button>
);
