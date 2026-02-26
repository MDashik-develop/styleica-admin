import React, { useState } from "react";
import { FaClipboard, FaEdit, FaTrash, FaBoxOpen, FaExclamationTriangle, FaMoneyBillWave, FaCalendarAlt, FaStore, FaWarehouse, FaTag } from "react-icons/fa";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import DamageManageModal from "../../components/damage-manage-modal";


const DamageDetails = () => {

    // Dummy data
    const [damage, setDamage] = useState({
        id: "FX5024",
        product: "Smartphone A12",
        lot: "LOT-1023",
        qty: 4,
        type: "Broken Screen",
        loss: "৳ 12,000",
        date: "2025-02-04",
        note: "Dropped from height, screen shattered, requires full replacement.",
        reportedBy: "John Doe",
        warehouse: "Warehouse A",
        category: "Electronics",
        supplier: "Tech Supplier Ltd",
    });

    const [openModal, setOpenModal] = useState(false);

    const handleEdit = () => {
        setOpenModal(true);
    };

    const handleUpdate = (updatedData) => {
        setDamage((prev) => ({ ...prev, ...updatedData }));
        setOpenModal(false);
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <h2 className="title !pb-0">Damage Details</h2>

            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Main Detail Box */}
                <div className="card space-y-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        <h3 className="text-xl font-semibold">{damage.product}</h3>
                        <div className="flex items-center gap-3">
                            <button className="button" onClick={handleEdit}>
                                <FaEdit /> Edit
                            </button>
                            <button className="button !bg-red-600">
                                <FaTrash /> Remove
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700 flex items-center gap-1">
                            <FaClipboard /> {damage.id}
                        </span>
                        <CopyToClipboard value={damage.id} />
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><FaTag /> Lot: {damage.lot}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><FaTag /> Category: {damage.category}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><FaStore /> Reported By: {damage.reportedBy}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><FaWarehouse /> Warehouse: {damage.warehouse}</p>
                </div>

                {/* Info Box */}
                <div className="card space-y-2">
                    <h3 className="font-semibold text-gray-700 mb-2">Damage Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex gap-2">
                            <FaBoxOpen className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Quantity</p>
                                <p className="font-medium">{damage.qty}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <FaExclamationTriangle className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Type</p>
                                <p className="font-medium">{damage.type}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <FaMoneyBillWave className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Loss Amount</p>
                                <p className="font-medium">{damage.loss}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <FaCalendarAlt className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="font-medium">{damage.date}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <FaStore className="text-gray-500 mt-[3px]" />
                            <div>
                                <p className="text-sm text-gray-500">Supplier</p>
                                <p className="font-medium">{damage.supplier}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes Box */}
                <div className="card md:col-span-2">
                    <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
                    <p className="text-gray-600">{damage.note || "-"}</p>
                </div>

            </div>

            {/* Edit Damage Modal */}
            <DamageManageModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleUpdate}
                isEdit={true}
                damageData={damage}
            />
        </div>
    );
};

export default DamageDetails;
