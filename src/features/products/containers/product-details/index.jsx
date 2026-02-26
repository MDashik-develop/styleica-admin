import React, { useState } from "react";
import { Tag, Image } from "antd";
import { Link } from "react-router-dom";
import { CurrencyIcon, EditIcon, DeleteIcon } from "../../../../components/reusable/ui/common-icons";


const ProductDetails = () => {

    const [activeImage, setActiveImage] = useState("");

    // Dummy product data (You can fetch this from your API later)
    const product = {
        id: 456,
        title: "Denim Jeans - Slim Fit",
        sulg: "denim-jeans",
        description: `
          <h1 style="margin-bottom:8px;"><strong>Product Overview</strong></h1>
          <p>
            These <strong>Denim Jeans - Slim Fit</strong> are crafted from premium stretchable cotton fabric 
            to ensure maximum comfort and a modern silhouette. The jeans feature <em>reinforced stitching</em>, 
            a classic five-pocket design, and a durable zip closure for long-lasting wear.
          </p>
            
          <h3 style="margin-top:16px;">Key Features</h3>
          <ul style="list-style-type:disc; margin-left:20px;">
            <li>Slim-fit design with soft stretch denim</li>
            <li>Durable stitching and fade-resistant color</li>
            <li>Available in multiple waist sizes</li>
            <li>Machine washable & easy to maintain</li>
          </ul>
            
          <h3 style="margin-top:16px;">Material & Care</h3>
          <p>
            <strong>Material:</strong> 98% Cotton, 2% Elastane <br/>
            <strong>Care:</strong> Gentle machine wash, do not bleach, tumble dry low.
          </p>
            
          <blockquote style="border-left:3px solid #009688; padding-left:12px; color:#444; margin:12px 0;">
            “Comfortable, durable, and stylish — a must-have for your casual wardrobe.”
          </blockquote>
        `,
        category: "Men’s Clothing",
        brand: "Levi’s",
        price: 2490,
        stock: 12,
        status: "Active",
        sku: "JEAN-SLIM-001",
        image: "https://i.ibb.co.com/CKTCvTh0/h.jpg",
        gallery: [
            "https://i.ibb.co.com/6RMbvS1g/p.webp",
            "https://i.ibb.co.com/vpm8h2x/AB-03758.webp",
            "https://i.ibb.co.com/Kp87Lp8g/pa.webp",
        ],
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["Navy Blue", "Black", "Light Blue"],
        attributes: {
            Fit: "Slim",
            Fabric: "Stretch Denim",
            Length: "Full Length",
            Closure: "Zip & Button",
        },
    };

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="title">Product Details</h2>
                <div className="flex items-center gap-3">
                    <Link to={`/products/manage/${product.id}`} className="button">
                        <EditIcon className="!text-light" /> Edit
                    </Link>
                    <button className="button !bg-red-600">
                        <DeleteIcon className="!text-light !text-sm" /> Delete
                    </button>
                </div>
            </div>

            {/* Main Section */}
            <div className="card grid grid-cols-1 md:grid-cols-2 items-center gap-8">

                {/* Left: Image + Gallery */}
                <div>
                    <div className="border border-slate-300 overflow-hidden">
                        <img
                            src={activeImage || product?.image}
                            alt={product.title}
                            className="object-contain w-full h-[300px]"
                            preview={false}
                        />
                    </div>

                    {/* Gallery */}
                    <div className="flex gap-3 mt-4">
                        {product.gallery.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                width={70}
                                height={70}
                                onClick={() => setActiveImage(img)}
                                className="object-contain cursor-pointer border border-slate-300 hover:scale-105 transition-transform"
                                alt="Gallery"
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div>
                    <h3 className="text-lg md:text-2xl font-semibold pb-2">{product.title}</h3>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <p className="text-gray-600 font-medium">Category:</p>
                        <p>{product.category}</p>

                        <p className="text-gray-600 font-medium">Brand:</p>
                        <p>{product.brand}</p>

                        <p className="text-gray-600 font-medium">SKU:</p>
                        <p>{product.sku}</p>

                        <p className="text-gray-600 font-medium">Price:</p>
                        <p className="flex items-center gap-1">
                            <CurrencyIcon /> {product.price}
                        </p>

                        <p className="text-gray-600 font-medium">Stock:</p>
                        <Tag color={product.stock < 20 ? "volcano" : "green"}>
                            {product.stock} pcs
                        </Tag>

                        <p className="text-gray-600 font-medium">Status:</p>
                        <Tag color={product.status === "Active" ? "green" : "red"}>
                            {product.status}
                        </Tag>

                        <p className="text-gray-600 font-medium">Sizes:</p>
                        <p>{product.sizes.join(", ")}</p>

                        <p className="text-gray-600 font-medium">Colors:</p>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map((color, idx) => (
                                <Tag key={idx} color="blue">{color}</Tag>
                            ))}
                        </div>

                        <p className="text-gray-600 font-medium">Attributes:</p>
                        <div>
                            {Object.entries(product.attributes).map(([key, value]) => (
                                <p key={key} className="text-gray-700">
                                    <strong>{key}:</strong> {value}
                                </p>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* product description */}
            <div className="card">
                <h2 className="section-title pb-3">Description: </h2>
                <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
            </div>

            {/* Additional Section */}
            <div className="card">
                <h3 className="text-lg font-semibold mb-4 text-[#005555]">
                    Product Insights
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-4 bg-gray-50">
                        <p className="text-2xl font-bold text-[#005555]">152</p>
                        <p className="text-gray-500 text-sm">Total Orders</p>
                    </div>
                    <div className="p-4 bg-gray-50">
                        <p className="text-2xl font-bold text-[#005555]">98%</p>
                        <p className="text-gray-500 text-sm">Customer Satisfaction</p>
                    </div>
                    <div className="p-4 bg-gray-50">
                        <p className="text-2xl font-bold text-[#005555]">36</p>
                        <p className="text-gray-500 text-sm">Reviews Received</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
