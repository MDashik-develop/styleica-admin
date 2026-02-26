import React, { useState } from "react";
import {
    FaClipboard,
    FaEdit,
    FaTrash,
    FaWarehouse,
    FaMapMarkerAlt,
    FaUserTie,
    FaServer,
    FaBoxes,
    FaPhoneAlt,
    FaEnvelope,
    FaCalendarAlt,
} from "react-icons/fa";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import WarehouseManageModal from "../../components/warehouse-manage-modal";


const WarehouseDetails = () => {

    const [openModal, setOpenModal] = useState(false);

    // dummy warehouse data
    const [warehouse, setWarehouse] = useState({
        id: "WH-2048",
        name: "Central Storage Hub",
        location: "Dhaka, Bangladesh",
        manager: "Ahsan Rahman",
        phone: "+880 1711-223344",
        email: "warehouse@company.com",
        capacity: "8,500 units",
        type: "Main Distribution Center",
        established: "2018-07-12",
        totalProducts: 1275,
        activeLots: 38,
    });



    return (
        <div className="space-y-6">

            {/* Header */}
            <h2 className="title !pb-0">Warehouse Details</h2>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Main Box */}
                <div className="card space-y-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <FaWarehouse className="text-gray-500" />
                            {warehouse.name}
                        </h3>

                        <div className="flex items-center gap-3">
                            <button
                                className="button flex items-center gap-1"
                                onClick={() => setOpenModal(true)}
                            >
                                <FaEdit /> Edit
                            </button>
                            <button className="button !bg-red-600 flex items-center gap-1">
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                        <FaClipboard />
                        <span className="font-medium">{warehouse.id}</span>
                        <CopyToClipboard value={warehouse.id} />
                    </div>

                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FaMapMarkerAlt /> {warehouse.location}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FaUserTie /> Manager: {warehouse.manager}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FaPhoneAlt /> {warehouse.phone}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FaEnvelope /> {warehouse.email}
                    </p>
                </div>

                {/* Information Box */}
                <div className="card space-y-3">
                    <h3 className="font-semibold text-gray-700 mb-2">Warehouse Information</h3>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="flex gap-2">
                            <FaBoxes className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Total Products</p>
                                <p className="font-medium">{warehouse.totalProducts}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <FaServer className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Active Lots</p>
                                <p className="font-medium">{warehouse.activeLots}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <FaBoxes className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Capacity</p>
                                <p className="font-medium">{warehouse.capacity}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <FaWarehouse className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Warehouse Type</p>
                                <p className="font-medium">{warehouse.type}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <FaCalendarAlt className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Established</p>
                                <p className="font-medium">{warehouse.established}</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Bottom Extra Details */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Products in Warehouse */}
                <div className="card space-y-3">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <FaWarehouse /> Products In-House
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-sm">

                        <div className="p-3 border border-slate-300 rounded bg-gray-50">
                            <p className="text-gray-500">Total Categories</p>
                            <p className="font-semibold">38</p>
                        </div>

                        <div className="p-3 border border-slate-300 rounded bg-gray-50">
                            <p className="text-gray-500">Unique Products</p>
                            <p className="font-semibold">1275</p>
                        </div>

                        <div className="p-3 border border-slate-300 rounded bg-gray-50">
                            <p className="text-gray-500">Low Stock</p>
                            <p className="font-semibold text-red-600">12 Products</p>
                        </div>

                        <div className="p-3 border border-slate-300 rounded bg-gray-50">
                            <p className="text-gray-500">Out of Stock</p>
                            <p className="font-semibold text-red-600">3 Products</p>
                        </div>

                    </div>
                </div>

                {/* Stock Overview */}
                <div className="card space-y-3">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <FaServer /> Stock Overview
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-sm">

                        <div className="p-3 border border-slate-300 rounded bg-gray-50">
                            <p className="text-gray-500">Total Units</p>
                            <p className="font-semibold">8,500</p>
                        </div>

                        <div className="p-3 border border-slate-300 rounded bg-gray-50">
                            <p className="text-gray-500">Reserved Stock</p>
                            <p className="font-semibold">1,420</p>
                        </div>

                        <div className="p-3 border border-slate-300 rounded bg-gray-50">
                            <p className="text-gray-500">Available Units</p>
                            <p className="font-semibold text-green-600">6,980</p>
                        </div>

                        <div className="p-3 border border-slate-300 rounded bg-gray-50">
                            <p className="text-gray-500">Damaged Units</p>
                            <p className="font-semibold text-red-600">55</p>
                        </div>

                    </div>
                </div>

                {/* Activity Logs */}
                <div className="card space-y-3">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <FaClipboard /> Activity Logs
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>📦 Received 120 units of Product A (Feb 5, 2025)</li>
                        <li>🚚 Shipped 40 units to Retail Branch (Feb 4, 2025)</li>
                        <li>🔧 Stock audit performed (Jan 29, 2025)</li>
                        <li>📦 Added new supplier products (Jan 22, 2025)</li>
                    </ul>
                </div>

                {/* Recent Sales */}
                <div className="card space-y-3">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <FaBoxes /> Recent Sales
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-600">
                        <li>🛒 Sold 20 units of Smartphone A12 — ৳120,000</li>
                        <li>🛒 Sold 12 units of Headphone Pro X — ৳36,000</li>
                        <li>🛒 Sold 5 units of Smart TV 55'' — ৳250,000</li>
                    </ul>
                </div>

            </div>

            {/* Edit Modal */}
            {openModal && (
                <WarehouseManageModal
                    visible={openModal}
                    onClose={() => setOpenModal(false)}
                    isEdit={true}
                    warehouseData={warehouse}
                    onSave={(updated) => {
                        setWarehouse(updated);
                        setOpenModal(false);
                    }}
                />
            )}

        </div>
    );
};

export default WarehouseDetails;
