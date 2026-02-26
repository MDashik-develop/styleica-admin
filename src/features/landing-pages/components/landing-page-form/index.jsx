import React, { useEffect, useState, useRef } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    Alignment, Autoformat, BlockQuote, Bold, ClassicEditor, Code, CodeBlock,
    Essentials, Font, Heading, Highlight, HorizontalLine, Image, ImageCaption,
    ImageInsert, ImageResize, ImageStyle, ImageToolbar, Indent, IndentBlock,
    Italic, Link, LinkImage, List, ListProperties, MediaEmbed, Mention,
    Paragraph, SimpleUploadAdapter, Table, TableToolbar, TodoList, Undo, Underline
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import FormInput from "../../../../components/reusable/form-input";
import Media from "../../../../components/reusable/media";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";
import { useGetAllProducts } from "../../../../features/products/services/productsApi";
import { IoCloseCircle } from "react-icons/io5";


const LandingPageForm = ({ editData, onSubmit, btnLoading, isEdit }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { data: productsData, isLoading: productsLoading } = useGetAllProducts({
        search: searchTerm,
        paginate: 20
    });
    const [errMessage, setErrMessage] = useState("");
    const [heroImage, setHeroImage] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [sizeChartImages, setSizeChartImages] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [newReview, setNewReview] = useState({ name: "", comment: "" });
    const [formData, setFormData] = useState({
        page_slug: "",
        gtm_key: "",
        main_title: "",
        sub_title: "",
        title: "",
        short_description: "",
        image_gallary_title: "",
        video_embaded_url: "",
        characteristics_title: "",
        characteristics_details: "",
        products_details_title: "",
        products_details_description: "",
        size_chart_title: "",
        reviews_title: "",
        reviews_details: [],
        contact_number: "",
        products_ids: [],
        primary_color: "",
        secondary_color: "",
    });

    const editorConfig = {
        plugins: [
            Essentials, Bold, Italic, Underline, Paragraph, Undo, Heading, List, Link,
            Table, TableToolbar, BlockQuote, Mention, Image, ImageToolbar,
            ImageCaption, ImageStyle, ImageResize, ImageInsert, Alignment, Font,
            Autoformat, Highlight, MediaEmbed, HorizontalLine, Indent,
            IndentBlock, Code, CodeBlock, ListProperties, TodoList, LinkImage,
            SimpleUploadAdapter
        ],
        toolbar: {
            items: [
                'undo', 'redo', '|', 'heading', '|',
                'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                'bold', 'italic', 'underline', '|',
                'link', 'insertImage', 'mediaEmbed', 'insertTable', 'blockQuote', '|',
                'alignment', 'bulletedList', 'numberedList', 'outdent', 'indent'
            ],
            shouldNotGroupWhenFull: true
        },
        licenseKey: 'GPL',
    };

    useEffect(() => {
        if (editData) {
            // Handle reviews_details parsing
            let parsedReviews = [];
            if (editData.reviews_details) {
                try {
                    // If it's a string, parse it. If it's already an array, use it.
                    parsedReviews = typeof editData.reviews_details === 'string'
                        ? JSON.parse(editData.reviews_details)
                        : editData.reviews_details;
                } catch (error) {
                    console.error("Error parsing reviews_details:", error);
                    parsedReviews = []; // Fallback to empty array on error
                }
            }

            setFormData({
                page_slug: editData.page_slug || "",
                gtm_key: editData.gtm_key || "",
                main_title: editData.main_title || "",
                sub_title: editData.sub_title || "",
                title: editData.title || "",
                short_description: editData.short_description || "",
                image_gallary_title: editData.image_gallary_title || "",
                video_embaded_url: editData.video_embaded_url || "",
                characteristics_title: editData.characteristics_title || "",
                characteristics_details: editData.characteristics_details || "",
                products_details_title: editData.products_details_title || "",
                products_details_description: editData.products_details_description || "",
                size_chart_title: editData.size_chart_title || "",
                reviews_title: editData.reviews_title || "",
                reviews_details: parsedReviews, // Parsed Array
                contact_number: Array.isArray(editData.numbers) ? editData.numbers[0] || "" : "",
                products_ids: Array.isArray(editData.products_ids) ? editData.products_ids : [],
                primary_color: editData.primary_color || "",
                secondary_color: editData.secondary_color || "",
            });

            // Media and Products
            if (editData.hero_media) setHeroImage([editData.hero_media]);
            if (editData.gallery_media) setGalleryImages(editData.gallery_media);
            if (editData.size_chart_media) setSizeChartImages(editData.size_chart_media);
            if (editData.products) setSelectedProducts(editData.products);
        }
    }, [editData]);

    const handleInputChange = (e, name) => {
        setErrMessage("");
        const field = name || e.target?.name;
        const value = e.target ? e.target.value : e;
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleProduct = (product) => {
        const isAlreadySelected = formData.products_ids.includes(product.id);
        if (isAlreadySelected) {
            setFormData(prev => ({
                ...prev,
                products_ids: prev.products_ids.filter(id => id !== product.id)
            }));
            setSelectedProducts(prev => prev.filter(p => p.id !== product.id));
        } else {
            setFormData(prev => ({
                ...prev,
                products_ids: [...prev.products_ids, product.id]
            }));
            setSelectedProducts(prev => [...prev, product]);
        }
        setIsDropdownOpen(false);
        setSearchTerm("");
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.page_slug) return setErrMessage("Page slug is required");
        const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        if (!slugRegex.test(formData.page_slug)) {
            return setErrMessage(
                "Invalid slug format. Use only lowercase letters, numbers, and single hyphens (e.g., 'summer-collection-2024')."
            );
        }

        const payload = {
            ...formData,
            numbers: formData.contact_number ? [formData.contact_number] : [],
            hero_image: heroImage[0]?.id || null,
            reviews_details: JSON.stringify(formData.reviews_details),
            image_gallary_images: galleryImages.map(img => img.id),
            size_chart_image: sizeChartImages.map(img => img.id),
        };

        // Remove contact_number helper from actual payload
        const { contact_number, ...finalPayload } = payload;
        onSubmit(finalPayload);
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const addReview = () => {
        if (!newReview.name || !newReview.comment) return;

        setFormData(prev => ({
            ...prev,
            reviews_details: [...prev.reviews_details, { ...newReview, id: Date.now() }]
        }));
        setNewReview({ name: "", comment: "" }); // Reset inputs
    };

    const removeReview = (id) => {
        setFormData(prev => ({
            ...prev,
            reviews_details: prev.reviews_details.filter(review => review.id !== id)
        }));
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Configuration Section */}
                <div className="lg:col-span-3 card !p-0 overflow-hidden">
                    <h3 className="text-sm font-bold text-center py-3 bg-gray-100 uppercase tracking-wider">Basic Info</h3>
                    <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
                        <FormInput label="Page Slug" name="page_slug" Required value={formData.page_slug || ""} onChange={handleInputChange} />
                        <FormInput label="GTM Key" name="gtm_key" value={formData.gtm_key || ""} onChange={handleInputChange} />
                        <FormInput label="Page Title" name="title" Required value={formData.title || ""} onChange={handleInputChange} />
                        <FormInput label="Main Title" name="main_title" value={formData.main_title || ""} onChange={handleInputChange} />
                        <FormInput label="Sub Title" name="sub_title" value={formData.sub_title || ""} onChange={handleInputChange} />
                        <FormInput label="Contact Number" name="contact_number" value={formData.contact_number || ""} onChange={handleInputChange} placeholder="e.g. 01700000000" />
                        <div className="lg:col-span-2">
                            <FormInput label="Short Description" name="short_description" type="textarea" value={formData.short_description || ""} onChange={handleInputChange} />
                        </div>
                        <div className="lg:col-span-2">
                            <FormInput label="Video Embedded URL" name="video_embaded_url" value={formData.video_embaded_url || ""} onChange={handleInputChange} />
                        </div>
                        <FormInput label="Primary Color" type="color" name="primary_color" value={formData.primary_color || ""} onChange={handleInputChange} />
                        <FormInput label="Secondary Color" type="color" name="secondary_color" value={formData.secondary_color || ""} onChange={handleInputChange} />
                    </div>
                </div>

                {/* Product & Contacts Section */}
                <div className="lg:col-span-2 card !p-0">
                    <h3 className="text-sm font-bold text-center py-3 bg-gray-100 uppercase tracking-wider">Select Products</h3>
                    <div className="p-5 space-y-5">
                        <div className="relative" ref={dropdownRef}>
                            <FormInput
                                label="Search Products"
                                type="text"
                                className="w-full mt-1 border rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-[#005555]"
                                placeholder="Search products (min 3 chars)..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setIsDropdownOpen(e.target.value.length > 2);
                                }}
                                onFocus={() => searchTerm.length > 2 && setIsDropdownOpen(true)}
                            />

                            {isDropdownOpen && (
                                <div className="absolute z-30 w-full mt-1 bg-light border border-slate-300 shadow-lg max-h-80 overflow-y-auto custom-scrollbar">
                                    {productsLoading ? (
                                        <div className="p-3 text-sm text-gray-500">Searching...</div>
                                    ) : productsData?.data?.length > 0 ? (
                                        productsData.data.map(product => (
                                            <div
                                                key={product.id}
                                                onClick={() => toggleProduct(product)}
                                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
                                            >
                                                <img src={product?.media?.urls?.small} alt={product.name || "image"} className="w-10 h-10 mr-2" />
                                                <span className="line-clamp-1">{product.name}</span>
                                                {formData.products_ids.includes(product.id) && <span className="bg-green-600 px-2 py-1 rounded-md text-light text-[10px] font-bold">Selected</span>}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-3 text-sm text-gray-500">No products found</div>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-3">
                                {selectedProducts.map(product => (
                                    <div key={product.id} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md border border-slate-300 text-xs">
                                        <div className="flex-1 flex items-center gap-2">
                                            <img src={product?.media?.urls?.small} alt={product.name || "image"} className="w-8 h-8 object-cover" />
                                            <span className="truncate max-w-[150px]">{product.name}</span>
                                        </div>
                                        <IoCloseCircle
                                            className="text-red-500 cursor-pointer text-lg"
                                            onClick={() => toggleProduct(product)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* all media */}
            <div className="lg:col-span-2 card !p-0">
                <h3 className="text-sm font-bold text-center py-3 bg-gray-100 uppercase tracking-wider">Select Media</h3>
                <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="card space-y-2">
                        <label className="text-sm font-medium block mb-1">Hero Image</label>
                        <Media selectedMedia={heroImage} setSelectedMedia={setHeroImage} />
                    </div>
                    <div className="card p-5">
                        <FormInput label="Gallery Title" name="image_gallary_title" value={formData.image_gallary_title || ""} onChange={handleInputChange} />
                        <div className="space-y-2 pt-2">
                            <label className="text-sm font-medium block mb-1">Gallery Images</label>
                            <Media singleUpload={false} selectedMedia={galleryImages} setSelectedMedia={setGalleryImages} />
                        </div>

                    </div>
                    <div className="card p-5">
                        <FormInput label="Size Chart Title" name="size_chart_title" value={formData.size_chart_title || ""} onChange={handleInputChange} />
                        <div className="space-y-2 pt-2">
                            <label className="text-sm font-medium block mb-1">Size Chart Image</label>
                            <Media singleUpload={true} selectedMedia={sizeChartImages} setSelectedMedia={setSizeChartImages} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="card !p-0">
                <h3 className="text-sm font-bold text-center py-3 bg-gray-100 uppercase tracking-wider">Detailed Content Sections</h3>
                <div className="p-5 space-y-8">
                    <div className="space-y-3 border-b border-dashed pb-10">
                        <FormInput label="Characteristics Section Title" name="characteristics_title" value={formData.characteristics_title || ""} onChange={handleInputChange} />
                        <h2 className="pt-3">Characteristics Section Description</h2>
                        <div className="bg-light overflow-hidden min-h-[250px]">
                            <CKEditor
                                key={isEdit ? `char-${editData?.id}` : 'char-new'}
                                editor={ClassicEditor}
                                data={formData.characteristics_details || ""}
                                config={editorConfig}
                                onChange={(event, editor) => handleInputChange(editor.getData(), "characteristics_details")}
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <FormInput label="Product Details Title" name="products_details_title" value={formData.products_details_title || ""} onChange={handleInputChange} />

                        <h2 className="pt-3">Product Details Description</h2>
                        <div className="bg-light overflow-hidden min-h-[250px]">
                            <CKEditor
                                key={isEdit ? `prod-${editData?.id}` : 'prod-new'}
                                editor={ClassicEditor}
                                data={formData.products_details_description || ""}
                                config={editorConfig}
                                onChange={(event, editor) => handleInputChange(editor.getData(), "products_details_description")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="card !p-0">
                <h3 className="text-sm font-bold text-center py-3 bg-gray-100 uppercase tracking-wider">Review Section</h3>

                <div className="p-5">
                    <div className="">
                        <FormInput
                            label="Reviews Section Title"
                            name="reviews_title"
                            value={formData.reviews_title || ""}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="card mt-3">
                        <label className="text-sm font-bold block mb-3">Customer Reviews</label>

                        {/* Review Input Fields */}
                        <div className="flex gap-2 mb-4">
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <FormInput
                                    name="name"
                                    type="text"
                                    placeholder="Customer Name"
                                    className="w-full border rounded-md p-2 text-sm outline-none"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                />
                                <FormInput
                                    name="comment"
                                    placeholder="Review Message"
                                    className="w-full border rounded-md p-2 text-sm outline-none"
                                    rows="2"
                                    value={newReview.comment}
                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={addReview}
                                className="button !py-1 !text-xs"
                            >
                                Add Review
                            </button>
                        </div>

                        {/* Review List Display */}
                        <div className="space-y-2">
                            {formData.reviews_details?.map((review) => (
                                <div key={review.id} className="flex justify-between items-start bg-light p-2 rounded border border-gray-200">
                                    <div className="flex-1 pr-4">
                                        <p className="font-bold text-xs">{review.name}</p>
                                        <p className="text-gray-600 text-xs italic">"{review.comment}"</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeReview(review.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <IoCloseCircle size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {errMessage && <div className="text-red-500 text-center font-medium py-2 bg-red-50 border border-red-100 rounded-md">{errMessage}</div>}

            <div className="flex justify-center pb-10">
                <SubmitButton btnText={isEdit ? "Update Landing Page" : "Add Landing Page"} loading={btnLoading} />
            </div>
        </form>
    );
};

export default LandingPageForm;