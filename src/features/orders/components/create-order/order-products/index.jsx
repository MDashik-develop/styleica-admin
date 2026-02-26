import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";
import { useState } from "react";
import FormInput from "../../../../../components/reusable/form-input";
import Table from "../../../../../components/reusable/table";
import { CurrencyIcon, DeleteIcon } from "../../../../../components/reusable/ui/common-icons";
import { useGetSeachedProducts } from "../../../../products/services/productsApi";


const OrderProducts = ({ selectedProducts, setSelectedProducts }) => {

    const [searchText, setSearchText] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const isSearchActive = searchText.trim().length >= 2;
    const { data: searchedProducts, isLoading } = useGetSeachedProducts(
        isSearchActive ? searchText : ""
    );


    // Table headers
    const headers = [
        {
            title: "Name", dataIndex: "name", key: "name", render: (_, record) => (
                <div className="flex justify-center gap-2">
                    {record?.media ?
                        <img src={record?.media?.urls?.small} alt={record?.name || "Image"} className="w-10 h-10 object-cover rounded-sm" />
                        :
                        <p>---</p>
                    }
                </div>
            )
        },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "SKU", dataIndex: "sku", key: "sku" },
        {
            title: "Attributes",
            key: "attributes",
            render: (_, record) => {
                const attrs = Array.isArray(record.attributes) ? record.attributes : [];
                return (
                    <div className="flex flex-wrap gap-2">
                        {attrs.map((attr, idx) => {
                            // Find all possible values from allAttributes for this attribute
                            const allValues = (Array.isArray(record.allAttributes) ? record.allAttributes : [])
                                .filter(a => a.name === attr.name)
                                .map(a => a.value);

                            return (
                                <div key={idx} className="flex flex-col">
                                    <span className="text-xs font-medium">{attr.name}:</span>
                                    {allValues.length > 0 ? (
                                        <select
                                            value={attr.value}
                                            onChange={(e) =>
                                                handleAttributeChange(record.product_id, record.variant_id, attr.name, e.target.value)
                                            }
                                            className="text-xs border rounded px-1 py-0.5"
                                        >
                                            {allValues.map((val, i) => (
                                                <option key={i} value={val}>{val}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className="text-xs">{attr.value}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            },
        },
        {
            title: "Price", dataIndex: "price", key: "price", render: (_, record) => {
                const price = Number(record.price) || 0;
                return <p><CurrencyIcon className={"!text-xl"} />{price.toFixed(2)}</p>;
            }
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (_, record) => (
                <div className='flex justify-center items-center'>
                    <div className="flex justify-center border border-slate-300 rounded overflow-hidden w-max">
                        <button
                            type="button"
                            className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-200 transition"
                            onClick={() => handleQuantityChange(record.product_id, record.variant_id, Math.max(1, record.quantity - 1))}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={record.quantity}
                            readOnly
                            className="w-12 text-center border-x border-slate-300 px-1 text-sm font-medium"
                        />
                        <button
                            type="button"
                            className="px-3 py-1 bg-green-50 text-green-600 hover:bg-green-200 transition"
                            onClick={() => handleQuantityChange(record.product_id, record.variant_id, record.quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
            ),
        },
        {
            title: "Subtotal",
            key: "subtotal",
            render: (_, record) => {
                const qty = Number(record.quantity) || 0;
                const price = Number(record.price) || 0;
                const subtotal = qty * price;
                return <p><CurrencyIcon className={"!text-xl"} />{subtotal.toFixed(2)}</p>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <button
                    onClick={() => handleRemoveProduct(record.product_id, record.variant_id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                    <DeleteIcon />
                </button>
            ),
        },
    ];

    // select product from api
    const handleSelectProduct = (product) => {
        const existsIndex = selectedProducts.findIndex((p) => {
            // product & variant must match
            if (p.product_id !== product.product_id) return false;
            if (p.variant_id !== product.variant_id) return false;

            const attrsA = Array.isArray(p.attributes) ? p.attributes : [];
            const attrsB = Array.isArray(product.attributes) ? product.attributes : [];

            // attribute length must match
            if (attrsA.length !== attrsB.length) return false;

            // every attribute id + value must match
            return attrsA.every(a =>
                attrsB.some(b =>
                    a.id === b.id &&
                    String(a.value) === String(b.value)
                )
            );
        });

        if (existsIndex > -1) {
            // same product + same attributes → increment quantity
            const updated = [...selectedProducts];
            updated[existsIndex].quantity =
                Number(updated[existsIndex].quantity) + 1;
            setSelectedProducts(updated);
        } else {
            // same product but different attributes → new row
            setSelectedProducts(prev => [
                ...prev,
                {
                    ...product,
                    quantity: 1,
                },
            ]);
        }

        setSearchText("");
        setDropdownOpen(false);
    };

    // Handle attribute change
    const handleAttributeChange = (product_id, variant_id, attrName, newValue) => {
        setSelectedProducts(prev =>
            prev.map(p => {
                if (p.product_id === product_id && p.variant_id === variant_id) {
                    const updatedAttrs = p.attributes.map(attr => {
                        if (attr.name === attrName) {
                            return { ...attr, value: newValue };
                        }
                        return attr;
                    });
                    return { ...p, attributes: updatedAttrs };
                }
                return p;
            })
        );
    };

    // Update quantity
    const handleQuantityChange = (product_id, variant_id, value) => {
        setSelectedProducts(prev =>
            prev.map(p => {
                if (p.product_id === product_id && p.variant_id === variant_id) {
                    // Allow empty string while typing, otherwise convert to number
                    const qty = value === "" ? "" : Number(value);
                    return { ...p, quantity: qty };
                }
                return p;
            })
        );
    };

    // remove product
    const handleRemoveProduct = (product_id, variant_id) => {
        setSelectedProducts(prev =>
            prev.filter(
                p => !(p.product_id === product_id && p.variant_id === variant_id)
            )
        );
    };


    return (
        <div className="relative">

            {/* Product Search */}
            <div className="flex justify-center items-center gap-2 bg-slate-200 px-3 pt-2 pb-1 relative">
                <h3 className="font-semibold mb-1">Search Products:</h3>
                <div className="w-full lg:w-[400px]">
                    <FormInput
                        label=""
                        name="product"
                        placeholder="Product Name / SKU"
                        value={searchText}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchText(value);
                            setDropdownOpen(value.trim().length >= 2);
                        }}
                    />

                    {/* Dropdown */}
                    {dropdownOpen && isSearchActive && (
                        <div className="absolute z-10 w-[300px] md:w-[400px] bg-white border border-slate-300 shadow-md mt-1 max-h-60 overflow-y-auto rounded">

                            {/* loading */}
                            {isLoading && (
                                <div className="py-4 flex justify-center">
                                    <Spin indicator={<LoadingOutlined spin />} />
                                </div>
                            )}

                            {/* product list */}
                            {!isLoading && searchedProducts?.data?.length > 0 && (
                                searchedProducts.data.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-2 cursor-pointer hover:bg-slate-100"
                                        onClick={() => handleSelectProduct(item)}
                                    >
                                        <div className="flex gap-2 leading-tight">
                                            <div>
                                                <img src={item?.media?.urls?.small} alt={item?.name || "Image"} className="w-10 h-10 object-cover rounded-sm" />
                                            </div>
                                            <div className="flex flex-col gap-1 justify-between">
                                                <p className='text-sm font-medium'>
                                                    {item?.name}
                                                    <br />
                                                    <span className="text-xs font-normal mr-0.5">{item?.sku}</span>
                                                    {Array.isArray(item?.attributes) && item.attributes.length > 0 && (
                                                        <span className="text-[11px] text-slate-500 mx-1.5">
                                                            {item.attributes.map(attr => `${attr.name}: ${attr.value}`).join(", ")}
                                                        </span>
                                                    )}
                                                </p>

                                            </div>


                                        </div>
                                    </div>
                                ))
                            )}

                            {/* no data */}
                            {!isLoading && searchedProducts?.data?.length === 0 && (
                                <div className="p-3 text-center text-slate-500 text-sm">
                                    No products found
                                </div>
                            )}

                        </div>
                    )}

                </div>
            </div>

            {/* Selected Products Table */}
            <Table
                rowKey={record => `${record.product_id}-${record.variant_id || "default"}`}
                headers={headers}
                data={selectedProducts}
                enableFilters={false}
                pagination={false}
            />
        </div>
    );
};

export default OrderProducts;
