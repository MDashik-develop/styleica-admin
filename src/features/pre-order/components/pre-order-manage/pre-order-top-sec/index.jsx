import React, { useState } from "react";
import { FaPlusCircle, FaBarcode } from "react-icons/fa";
import FormInput from "../../../../../components/reusable/form-input";
import Table from "../../../../../components/reusable/table";

const ImageView = ({ image }) => (
    <img
        src={image}
        alt="product"
        className="w-12 h-12 object-cover rounded-md border border-slate-300"
    />
);

const PreOrderTopSec = ({ type = "preorder" }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchUser, setSearchUser] = useState("");
    const [searchProduct, setSearchProduct] = useState("");
    const [saleType, setSaleType] = useState("New Sale");

    const headers = [
        { title: "Image", dataIndex: "image", key: "image", render: (v) => <ImageView image={v} /> },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Product Code", dataIndex: "code", key: "code" },
        { title: "Attributes", dataIndex: "attributes", key: "attributes" },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    ];

    const data = [
        {
            key: "1",
            image: "https://i.ibb.co.com/ZKkpktK/sample-product.webp",
            name: "Sample Product",
            code: "PRD123456",
            attributes: "Color: Red, Size: M",
            price: "BDT 499",
            quantity: 5,
        },
    ];

    return (
        <div className="card">


            {/* Product Search */}
            <form className="flex justify-center items-center gap-2 mb-5 bg-slate-200 py-3">
                <h3 className="font-semibold">Search Products:</h3>
                <FormInput
                    label=""
                    name="product"
                    type="text"
                    placeholder="Product Name / SKU"
                    onChange={(e) => setSearchProduct(e.target.value)}
                    className="!flex-1 !rounded-l-none"
                />

            </form>

            {/* Product Table */}
            <Table
                headers={headers}
                data={data}
                enableFilters={false}
                pagination={false}
            />
        </div >
    );
};

export default PreOrderTopSec;
