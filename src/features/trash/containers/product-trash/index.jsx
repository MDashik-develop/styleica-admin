import React, { useState } from "react";
import Table from "../../../../components/reusable/table";
import Pagination from "../../../../components/reusable/pagination";
import { Tag } from "antd";
import { CurrencyIcon, DeleteIcon } from "../../../../components/reusable/ui/common-icons";
import { RestoreButton, DeleteButton } from "../../../../components/reusable/ui/action-btns";
import { TbRestore } from "react-icons/tb";
import { useGetProductTrash, useRestoreProducts, useForceDeleteProducts } from "../../services/trash";
import toast from "react-hot-toast";

const ProductTrash = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showData, setShowData] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);

    const { data, isLoading } = useGetProductTrash({
        page: currentPage,
        pagination: showData,
        search: searchQuery,
    });

    const restoreMutation = useRestoreProducts();
    const deleteMutation = useForceDeleteProducts();

    const products = data?.data || [];

    // Convert objects to IDs before sending to API
    const extractIds = (items) => items.map((p) => p.id);

    const handleRestore = (items) => {
        const ids = extractIds(items);
        restoreMutation.mutate(ids, {
            onSuccess: () => toast.success("Restored successfully!"),
            onError: (err) => toast.error(err?.response?.data?.message || "Restore failed!"),
        });
    };

    const handleDelete = (items) => {
        const ids = extractIds(items);
        deleteMutation.mutate(ids, {
            onSuccess: () => toast.success("Deleted permanently!"),
            onError: (err) => toast.error(err?.response?.data?.message || "Delete failed!"),
        });
    };

    const headers = [
        {
            title: "Image",
            key: "image",
            render: (row) => <img src={row?.media?.urls?.small} alt={row.name} className="w-12 h-12 object-cover rounded-md mx-auto" />,
        },
        { title: "Title", key: "title", render: (row) => row.name },
        { title: "Category", key: "category", render: (row) => row.category?.name || "-" },
        { title: "Brand", key: "brand", render: (row) => row.brand?.name || "-" },
        {
            title: "Price",
            key: "price",
            render: (row) => {
                if (row.has_variants === 1 && row.variants?.length) {
                    return (
                        <div>
                            <p className="line-through"><CurrencyIcon /> {row.variants[0].price}</p>
                            <p><CurrencyIcon /> {row.variants[0].cost_price}</p>
                        </div>
                    );
                }
                return <p><CurrencyIcon /> {row.base_price}</p>;
            },
        },
        {
            title: "Attributes",
            key: "attributes",
            render: (row) => {
                if (!row?.variants?.length) return "-";
                const variant = row.variants[0];
                if (!variant?.variant_attributes?.length) return "-";

                const uniqueAttributes = new Map();
                variant.variant_attributes.forEach((va) => {
                    const attr = va?.attribute;
                    if (attr?.id && attr?.name) uniqueAttributes.set(attr.id, attr);
                });

                return (
                    <div className="flex flex-col gap-1">
                        {[...uniqueAttributes.values()].map((attr) => {
                            const values = attr?.values?.filter(v => v?.value);
                            if (!values?.length) return null;
                            return (
                                <span key={attr.id} className="text-sm">
                                    <strong>{attr.name}:</strong> {values.map(v => v.value).join(", ")}
                                </span>
                            );
                        })}
                    </div>
                );
            },
        },
        { title: "Deleted At", key: "deleted_at", render: (row) => <Tag color="red">{row.deleted_at}</Tag> },
        {
            title: "Actions",
            key: "actions",
            render: (row) => (
                <div className="flex justify-center gap-2">
                    {/* Single row restore/delete also hit bulk route */}
                    <RestoreButton onClick={() => handleRestore([row])} />
                    <DeleteButton onClick={() => handleDelete([row])} />
                </div>
            ),
        },
    ];

    return (
        <div>
            {/* Bulk action buttons */}
            <div className={`flex justify-center md:justify-start items-center gap-3 mb-3 ${selectedProducts.length === 0 && "opacity-70"}`}>
                <button className="button !bg-green-600 !rounded-full" disabled={selectedProducts.length === 0} onClick={() => handleRestore(selectedProducts)}>
                    <TbRestore /> Restore
                </button>
                <button className="button !bg-red-600 !rounded-full" disabled={selectedProducts.length === 0} onClick={() => handleDelete(selectedProducts)}>
                    <DeleteIcon className="!text-light !text-sm" /> Delete Permanently
                </button>
            </div>

            <Table
                headers={headers}
                data={products}
                loading={isLoading}
                enableFilters
                showDataFilter
                searchPlaceholder="Search trashed products..."
                enableSelection
                selectedRows={selectedProducts}
                onSelectRows={setSelectedProducts}
                onShowDataChange={(value) => {
                    setShowData(Number(value));
                    setCurrentPage(1);
                }}
                onSearchChange={(value) => {
                    setSearchQuery(value);
                    setCurrentPage(1);
                }}
            />

            <Pagination paginationMeta={data} onPaginationChange={(page) => setCurrentPage(page)} />
        </div>
    );
};

export default ProductTrash;