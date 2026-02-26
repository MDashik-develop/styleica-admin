import React from "react";
import { MdArrowOutward } from "react-icons/md";
import Table from "../../../../components/reusable/table";
import { Link } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";

const headers = [
    { title: "Image", dataIndex: "image", key: "image" },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Sold", dataIndex: "sold", key: "sold" },
];

// custom render for image
const customRender = {
    image: (url) => (
        <div className="flex justify-center">
            <img
                src={url}
                alt="Product"
                className="w-10 h-10 object-cover rounded-md border border-slate-200"
            />
        </div>
    ),
};

const TopProducts = ({ formattedData = [] }) => {
    const processedData = (formattedData || []).map(item => ({
        ...item,
        image: item.image.urls.small,
    }));

    // console.log("Top Products Data:", processedData);

    return (
    <div className="bg-light p-5 shadow border border-slate-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1">
                <AiFillProduct className="text-lg text-primary" />
                <h3 className="font-semibold text-gray-800 text-base">
                    Top Product Sales
                </h3>
            </div>
            <Link
                to="#"
                className="flex items-center gap-1 text-indigo-600 text-sm hover:text-indigo-800"
            >
                View All
                <MdArrowOutward size={16} />
            </Link>
        </div>

        {/* Table */}
        <Table
            headers={headers}
            data={processedData}
            pagination={false}
            enableFilters={false}
            enableSelection={false}
            customRender={customRender}
        />
    </div>
    );
};

export default TopProducts;
