import React, { useState } from "react";
import { FaPlus, FaHashtag } from "react-icons/fa6";
import { BsUiChecksGrid } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Table from "../../../../components/reusable/table";
import { Link } from "react-router-dom";
import { useDeleteProduct, useGetAllProducts } from "../../services/productsApi";
import { Tag } from "antd";
import { CurrencyIcon } from "../../../../components/reusable/ui/common-icons";
import { DeleteButton, EditButton } from "../../../../components/reusable/ui/action-btns";
import toast from "react-hot-toast";
import Pagination from "../../../../components/reusable/pagination";
import BulckStatusChangeModal from "../../components/bulk-status-change-modal";
import ImagePreview from "../../../../components/reusable/ui/image-preview";


const AllProducts = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [showData, setShowData] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const { data, isLoading } = useGetAllProducts({
        page: currentPage,
        search: searchQuery,
        pagination: showData,
    });
    const deleteProduct = useDeleteProduct();


    const headers = [
        {
            title: "Image",
            key: "image",
            render: (row) => {
                if (!row?.media) return "-";

                return (
                    <div className="flex justify-center">
                        <ImagePreview images={[row.media]} initialWidth={"w-12"} />
                    </div>
                );
            },
        },
        {
            title: "Title",
            key: "title",
            render: (row) => row.name,
        },
        {
            title: "Category",
            key: "category",
            render: (row) => row.category?.name || "-",
        },
        {
            title: "Brand",
            key: "brand",
            render: (row) => row.brand?.name || "-",
        },
        {
            title: "Price",
            key: "price",
            render: (row) => {
                if (row.has_variants == 1 && row.variants?.length) {
                    return <div>
                        <p className="line-through"><CurrencyIcon /> {row.variants[0].price}</p>
                        <p><CurrencyIcon /> {row.variants[0].cost_price}</p>
                    </div>;
                }
                return <p><CurrencyIcon /> {row.base_price}</p>;
            },
        },
        {
            title: "Attributes",
            key: "attributes",
            render: (row) => {
                try {
                    if (!row?.variants?.length) return "-";

                    const variant = row.variants[0];
                    if (!variant?.variant_attributes?.length) return "-";

                    const uniqueAttributes = new Map();

                    variant.variant_attributes.forEach((va) => {
                        const attr = va?.attribute;
                        if (!attr?.id || !attr?.name) return; // ✅ skip broken data

                        if (!uniqueAttributes.has(attr.id)) {
                            uniqueAttributes.set(attr.id, attr);
                        }
                    });

                    if (!uniqueAttributes.size) return "-";

                    return (
                        <div className="flex flex-col gap-1">
                            {[...uniqueAttributes.values()].map((attr) => {
                                const values = attr?.values?.filter(v => v?.value);

                                if (!values?.length) return null;

                                return (
                                    <span key={attr.id} className="text-sm">
                                        <strong>{attr.name}:</strong>{" "}
                                        {values.map(v => v.value).join(", ")}
                                    </span>
                                );
                            })}
                        </div>
                    );
                } catch (error) {
                    // console.error("Attribute render error:", error);
                    return "-";
                }
            },
        },
        // {
        //     title: "Stock",
        //     key: "stock",
        //     render: (row) => {
        //         if (row.has_variants == 1 && row.variants?.length) {
        //             return row.variants.reduce(
        //                 (sum, v) => sum + Number(v.stock || 0),
        //                 0
        //             );
        //         }
        //         return "-";
        //     },
        // },
        {
            title: "Status",
            key: "status",
            render: (row) => {
                const status = row.status;

                if (!["pending", "published", "deactivated", "suspended"].includes(status)) {
                    return "-";
                }

                const STATUS_COLOR = {
                    pending: "gold",
                    published: "green",
                    deactivated: "pink",
                    suspended: "red",
                };

                return (
                    <Tag color={STATUS_COLOR[status]} className="capitalize">
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (row) => (
                <div className="flex justify-center items-center gap-2">
                    <Link to={`/products/manage/${row.id}`}>
                        <EditButton />
                    </Link>
                    <DeleteButton onClick={() => handleDeleteProduct(row?.id)} />
                </div>
            ),
        },
    ];

    // product delete fn
    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you?")) {
            deleteProduct.mutate(id, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Deleted successfully!");
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to delete!");
                },
            });
        }
    };


    // console.log(data?.data);


    return (
        <div className="">

            <h2 className="text-lg font-semibold text-[#005555]">
                All Products
            </h2>

            {/* buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-5 mt-3">
                <div className="flex items-center gap-3">
                    <Link to={"/products/manage"} className="button">
                        <FaPlus />
                        Add Product
                    </Link>
                    <BulckStatusChangeModal
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Link to={"/products/categories"} className="button-outline">
                        <BsUiChecksGrid />
                        Categories
                    </Link>
                    <Link to={"/products/attributes"} className="button-outline">
                        <FaHashtag />
                        Attributes
                    </Link>
                    <Link to={"/products/brands"} className="button-outline">
                        <IoMdCheckmarkCircleOutline />
                        Brands
                    </Link>
                </div>
            </div>

            <Table
                headers={headers}
                loading={isLoading}
                data={data?.data}
                enableSelection={true}
                enableFilters={true}
                showDataFilter={true}
                onShowDataChange={(value) => {
                    setShowData(Number(value));
                    setCurrentPage(1);
                }}
                onSearchChange={(value) => {
                    setSearchQuery(value);
                    setCurrentPage(1);
                }}
                searchPlaceholder="Ex: name, sku, des.."
                selectedRows={selectedProducts}
                onSelectRows={setSelectedProducts}
            />
            <Pagination
                paginationMeta={data}
                onPaginationChange={(page) => setCurrentPage(page)}
            />

        </div>
    );
};

export default AllProducts;
