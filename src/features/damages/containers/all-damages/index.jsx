import React, { useState } from "react";
import Table from "../../../../components/reusable/table";
import DamageFilter from "../../components/all-damages/filter";
import DamageManageModal from "../../components/damage-manage-modal";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import { EditIcon } from "../../../../components/reusable/ui/common-icons";
import { Link } from "react-router-dom";


const AllDamages = () => {

    const [openModal, setOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const [tableData, setTableData] = useState([
        {
            id: "FX5024",
            product: "Smartphone A12",
            lot: "LOT-1023",
            qty: 4,
            type: "Broken Screen",
            loss: "৳ 12,000",
            date: "2025-02-04",
            note: "Dropped from height",
        },
    ]);

    const handleAddEdit = (data) => {
        if (isEdit) {
            setTableData((prev) =>
                prev.map((row) => (row.id === editingData.id ? { ...row, ...data } : row))
            );
        } else {
            const newId = tableData.length ? tableData[tableData.length - 1].id + 1 : 1;
            setTableData((prev) => [...prev, { id: newId, ...data }]);
        }
    };

    const columns = [
        {
            title: "ID", dataIndex: "id", key: "id", render: (id, record) =>
                <div className="space-x-2">
                    <Link to={`/damages/${id}`} className="font-medium">#{id}</Link>
                    <CopyToClipboard value={record?.id} />
                    <button onClick={() => {
                        setEditingData(record);
                        setIsEdit(true);
                        setOpenModal(true);
                    }}
                    >
                        <EditIcon />
                    </button>
                </div>
        },
        { title: "Product Name", dataIndex: "product" },
        { title: "Lot Number", dataIndex: "lot" },
        { title: "Quantity", dataIndex: "qty" },
        { title: "Damage Type", dataIndex: "type" },
        { title: "Loss Amount", dataIndex: "loss" },
        { title: "Date", dataIndex: "date" },
        { title: "Note", dataIndex: "note" },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="title !pb-0">Damages</h2>
                <button
                    className="button"
                    onClick={() => {
                        setIsEdit(false);
                        setEditingData(null);
                        setOpenModal(true);
                    }}
                >
                    Add Damage
                </button>
            </div>

            {/* Filters */}
            <div className="card">
                <DamageFilter filters={{}} setFilters={() => { }} />
            </div>

            {/* Table */}
            <Table headers={columns} data={tableData} />

            {/* Add / Edit Modal */}
            <DamageManageModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleAddEdit}
                isEdit={isEdit}
                damageData={editingData}
            />
        </div>
    );
};

export default AllDamages;
