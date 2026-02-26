import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaWarehouse, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import Table from "../../../../components/reusable/table";
import WarehouseManageModal from "../../components/warehouse-manage-modal";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import { Link } from "react-router-dom";


const AllWarehouses = () => {

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    // Dummy data
    const [warehouses, setWarehouses] = useState([
        {
            id: 1,
            name: "Warehouse A",
            location: "Dhaka",
            manager: "John Doe",
            capacity: "4,000 units",
            mobile: "01711123456",
            email: "demo@gmail.com",
        },
        {
            id: 2,
            name: "Warehouse B",
            location: "Chittagong",
            manager: "Sarah Ali",
            capacity: "6,500 units",
            mobile: "01711123456",
            email: "demo@gmail.com",
        }
    ]);


    const headers = [
        {
            title: "Name",
            dataIndex: "name",
            render: (value, record) => (
                <div className="flex justify-center items-center gap-2">
                    <Link to={`/warehouses/${record?.id}`}>{value}</Link>
                    <CopyToClipboard value={value} />
                </div>
            )
        },
        {
            title: "Location",
            dataIndex: "location"
        },
        {
            title: "Manager",
            dataIndex: "manager",
            render: (value, record) => (
                <div className="flex flex-col items-center gap-2">
                    <h3>{value}</h3>
                    <div className="flex justify-center items-center gap-2">
                        <Link to={`tel:${record.mobile}`}>
                            {record.mobile}
                        </Link>
                        <CopyToClipboard value={record.mobile} />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <Link to={`mailto:${record.email}`}>
                            {record.email}
                        </Link>
                        <CopyToClipboard value={record.email} />
                    </div>
                </div>
            )
        },
        {
            title: "Capacity",
            dataIndex: "capacity",
        },
        {
            title: "Actions",
            render: (_, record) => (
                <div className="flex justify-center gap-3">
                    <button
                        className="button !py-1 !px-3"
                        onClick={() => {
                            setEditData(record);
                            setOpenModal(true);
                        }}
                    >
                        <FaEdit /> Edit
                    </button>

                    <button
                        className="button !bg-red-600 !py-1 !px-3"
                        onClick={() => handleDelete(record.id)}
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            )
        }
    ];


    const handleDelete = (id) => {
        setWarehouses(prev => prev.filter(w => w.id !== id));
    };


    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="title !pb-0">All Warehouses</h2>

                <button
                    className="button"
                    onClick={() => {
                        setEditData(null);
                        setOpenModal(true);
                    }}
                >
                    <FaPlus /> Add Warehouse
                </button>
            </div>

            {/* Table Card */}
            <Table
                headers={headers}
                data={warehouses}
            />

            {/* Manage Modal */}
            {openModal && (
                <WarehouseManageModal
                    visible={openModal}
                    onClose={() => setOpenModal(false)}
                    isEdit={!!editData}
                    warehouseData={editData}
                    onSave={(data) => {
                        if (editData) {
                            setWarehouses(prev =>
                                prev.map(w => w.id === data.id ? data : w)
                            );
                        } else {
                            setWarehouses(prev => [...prev, { ...data, id: Date.now() }]);
                        }
                        setOpenModal(false);
                    }}
                />
            )}

        </div>
    );
};

export default AllWarehouses;
