import { useEffect, useState } from "react";
import FormInput from "../../../../components/reusable/form-input";
import Media from "../../../../components/reusable/media";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";
import { useGetAllAttributes } from "../../services/attributeApi";
import { useGetAllBrands } from "../../services/brandApi";
import { useGetAllCategory } from "../../services/categoryApi";
import { Select } from "antd";
import { DeleteIcon } from "../../../../components/reusable/ui/common-icons";


const ProductForm = ({ editData, onSubmit, btnLoading }) => {

    const { data: brandData } = useGetAllBrands();
    const { data: categoryData } = useGetAllCategory({ page: null, pagination: 100 });
    const { data: attributeData } = useGetAllAttributes();
    const [errMessage, setErrMessage] = useState("");
    const [selectedMainMedia, setSelectedMainMedia] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [variants, setVariants] = useState([
        {
            product_id: null,
            price: null,
            cost_price: null,
            stock: null,
            weight: null,
            media: null,
            attributes: [
                { product_variant_id: null, attribute_id: null, attribute_value_ids: [] }
            ]
        }
    ]);
    const [formData, setFormData] = useState({
        brand_id: null,
        category_id: null,
        subcategory_id: null,
        child_subcategory_id: null,
        name: null,
        description: null,
        short_description: null,
        base_price: null,
        cost_price: null,
        weight: null,
        stock: null,
        has_variants: true,
        status: "pending",
        meta_title: null,
        meta_description: null,
        change_reason: null,
    });


    // EDIT MODE LOADING
    useEffect(() => {
        if (!editData) return resetForm();

        const hv = editData.has_variants === true || editData.has_variants == 1;
        const variantData = editData.variant ? JSON.parse(editData.variant) : null;

        setFormData({
            brand_id: Number(editData.brand_id),
            category_id: Number(editData.main_category?.id) || null,
            subcategory_id: Number(editData?.sub_category?.id) || null,
            child_subcategory_id: Number(editData?.child_category?.id) || null,
            name: editData.name,
            description: editData.description,
            short_description: editData.short_description,
            base_price: editData.base_price,
            cost_price: editData.cost_price,
            weight: editData.weight,
            // stock: editData.variant?.stock ?? null,
            stock: variantData?.stock ?? null,
            has_variants: hv,
            status: editData.status,
            meta_title: editData.meta_title,
            meta_description: editData.meta_description,
            change_reason: editData.change_reason || null,
        });
        // console.log("editData.stock =>", variantData?.stock ?? null)
        // setSelectedMedia(editData.media);

        // console.log("editData.media =>", editData.media);

        if (editData.media) {
            setSelectedMainMedia([editData.media]);
        }

        if (hv && editData.variants?.length) {
            setVariants(
                editData.variants.map(v => ({
                    id: v?.id || null,
                    product_id: v.product_id || null,
                    price: v.price,
                    cost_price: v.cost_price,
                    stock: v.stock || null,
                    weight: v.weight,
                    media_id: v.media_id,
                    media: v.media?.urls ? v.media : editData?.media,
                    change_reason: v?.change_reason || null,
                    attributes: (v.variant_attributes || []).reduce((acc, a) => {
                        const found = acc.find(x => x.attribute_id === Number(a.attribute_id));

                        if (found) {
                            found.attribute_value_ids.push(Number(a.attribute_value_id));
                        } else {
                            acc.push({
                                product_variant_id: a.product_variant_id || null,
                                attribute_id: Number(a.attribute_id),
                                attribute_value_ids: [Number(a.attribute_value_id)],
                            });
                        }

                        return acc;
                    }, []),
                }))
            );
        }
    }, [editData]);

    // RESET FORM
    const resetForm = () => {
        setFormData({
            brand_id: null,
            category_id: null,
            name: null,
            description: null,
            short_description: null,
            base_price: null,
            cost_price: null,
            weight: null,
            stock: null,
            has_variants: true,
            status: "pending",
            meta_title: null,
            meta_description: null,
            change_reason: null,
        });

        setSelectedMedia([]);
        setVariants([
            {
                product_id: null,
                price: null,
                cost_price: null,
                stock: null,
                weight: null,
                media: null,
                attributes: [
                    { product_variant_id: null, attribute_id: null, attribute_value_ids: [] }
                ],
            }
        ]);

    };

    // INPUT HANDLERS
    const handleInputChange = (e, name) => {
        setErrMessage("");

        const field = name || e.target.name;
        let value = e.target ? e.target.value : e;

        if (field === "has_variants") {
            const hv = value === true || value === "true" || value === 1;
            setFormData(prev => ({ ...prev, has_variants: hv }));

            if (!hv) setVariants([{ ...variants[0], attributes: [{ product_variant_id: null, attribute_id: null, attribute_value_id: null }] }]);
            return;
        }

        if (value === "") value = null;

        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleVariantChange = (vIdx, field, value) => {

        if (field === "price" || field === "cost_price" || field === "stock" || field === "weight") {
            // Regex: শুধু সংখ্যা এবং একটি দশমিক ডট ছাড়া সব রিমুভ করে দিবে
            value = value.replace(/[^0-9.]/g, '');

            // ডট যেন দুইবার না বসে তার চেক (ঐচ্ছিক)
            if ((value.match(/\./g) || []).length > 1) return;
        }

        setVariants(prev => {
            const updated = [...prev];
            updated[vIdx][field] = value;
            return updated;
        });
    };

    const handleAttributeChange = (vIdx, aIdx, field, value) => {
        setVariants(prev => {
            const updated = [...prev];
            updated[vIdx].attributes[aIdx][field] = value;
            return updated;
        });
    };

    // ADD / REMOVE VARIANT
    const addVariant = () => {
        setVariants(prev => [
            ...prev,
            {
                product_id: null,
                price: null,
                cost_price: null,
                stock: null,
                weight: null,
                media: null,
                attributes: [{ product_variant_id: null, attribute_id: null, attribute_value_ids: [] }]
            }
        ]);
    };

    const removeVariant = (index) => {
        setVariants(prev => prev.filter((_, i) => i !== index));
    };

    // ADD / REMOVE ATTRIBUTE
    const addAttribute = (vIdx) => {
        setVariants(prev =>
            prev.map((variant, index) =>
                index === vIdx
                    ? {
                        ...variant,
                        attributes: [
                            ...variant.attributes,
                            { product_variant_id: null, attribute_id: null, attribute_value_ids: [] }
                        ]
                    }
                    : variant
            )
        );
    };

    const removeAttribute = (vIdx, aIdx) => {
        setVariants(prev => {
            const updated = [...prev];
            updated[vIdx].attributes = updated[vIdx].attributes.filter((_, i) => i !== aIdx);
            return updated;
        });
    };

    const productHasVariants = formData.has_variants === true || formData.has_variants === "true";

    // attributes
    const attributeOptions = attributeData?.map(attr => ({
        label: attr.name,
        value: attr.id,
    })) || [];


    const getValues = (attrId) => {
        const attr = attributeData?.find(a => a.id === attrId);
        if (!attr) return [];
        return attr.values?.map(v => ({
            label: v.value,
            value: v.id,
        })) || [];
    };

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrMessage("");

        // --- Main product validation ---
        if (!formData.name) return setErrMessage("Product name is required");
        if (!formData.brand_id) return setErrMessage("Brand is required");
        if (!formData.category_id) return setErrMessage("Category is required");
        if (!formData.short_description) return setErrMessage("Short description is required");
        // if (!formData.description) return setErrMessage("Description is required");
        // if (!formData.base_price) return setErrMessage("Base price is required");
        // if (!formData.cost_price) return setErrMessage("Cost price is required");
        // if (!formData.weight) return setErrMessage("Weight is required");
        // if (!selectedMainMedia.length) return setErrMessage("Main product image is required");

        const isVariant = formData.has_variants === true || formData.has_variants === "true";

        if (isVariant) {
            for (let i = 0; i < variants.length; i++) {
                const v = variants[i];
                if (!v.price) return setErrMessage(`Variant #${i + 1}: Price is required`);
                if (!v.cost_price) return setErrMessage(`Variant #${i + 1}: Cost Price is required`);
                // if (!v.stock && v.stock !== 0) return setErrMessage(`Variant #${i + 1}: Stock is required`);
                // if (!v.weight) return setErrMessage(`Variant #${i + 1}: Weight is required`);
                if (!v.media) return setErrMessage(`Variant #${i + 1}: Image is required`); // ✅ Variant image check

                // validate attributes
                for (let j = 0; j < v.attributes.length; j++) {
                    const a = v.attributes[j];
                    if (!a.attribute_id) return setErrMessage(`Variant #${i + 1}, Attribute #${j + 1}: Attribute is required`);
                    if (!a.attribute_value_ids || a.attribute_value_ids.length === 0)
                        return setErrMessage(
                            `Variant #${i + 1}, Attribute #${j + 1}: At least one value is required`
                        );
                }
            }
        };

        const { subcategory_id, child_subcategory_id, ...restFormData } = formData;

        const finalCategoryId =
            child_subcategory_id
                ? child_subcategory_id
                : subcategory_id
                    ? subcategory_id
                    : formData.category_id;


        const payload = {
            ...restFormData,
            category_id: finalCategoryId,
            media_id: selectedMainMedia[0]?.id,
            variants: isVariant
                ? variants.map(v => ({
                    ...v,
                    media_id: v.media?.id || null,
                    media: undefined,
                    attributes: v.attributes.flatMap(attr =>
                        attr.attribute_value_ids.map(valId => ({
                            attribute_id: attr.attribute_id,
                            attribute_value_id: valId,
                        }))
                    ),
                }))
                : [],
        };

        // console.log("payload", payload);
        // return;

        onSubmit(payload)
    };


    const selectedCategory = categoryData?.data?.find(
        c => c.id === Number(formData.category_id)
    );

    const subCategoryOptions =
        selectedCategory?.child?.map(sub => ({
            label: sub.name,
            value: sub.id,
        })) || [];

    const selectedSubCategory = selectedCategory?.child?.find(
        sub => sub.id === Number(formData.subcategory_id)
    );

    const childSubCategoryOptions =
        selectedSubCategory?.child?.map(child => ({
            label: child.name,
            value: child.id,
        })) || [];


    // console.log(editData);


    return (
        <form onSubmit={handleSubmit} className="">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                <div className="lg:col-span-2 card !p-0">

                    <h3 className="text-lg font-semibold text-center py-3 bg-gray-100 uppercase">Basic Info</h3>

                    {/* BASIC INFO */}
                    <div className="p-5">
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="md:col-span-2">
                                <FormInput label="Product Name" name="name" Required value={formData.name || ""} onChange={handleInputChange} placeholder="Enter product name" />
                            </div>

                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                                {
                                    categoryData &&
                                    <FormInput
                                        label="Category"
                                        name="category_id"
                                        type="select"
                                        Required
                                        value={formData.category_id || ""}
                                        options={categoryData?.data?.map(c => ({
                                            label: c.name,
                                            value: c.id
                                        })) || []}
                                        onChange={(v) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                category_id: v,
                                                subcategory_id: null,
                                            }));
                                        }}
                                    />
                                }

                                <FormInput
                                    label="Sub-Category"
                                    name="subcategory_id"
                                    type="select"
                                    value={formData.subcategory_id || ""}
                                    options={subCategoryOptions}
                                    onChange={(v) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            subcategory_id: v,
                                            child_subcategory_id: null,
                                        }))
                                    }
                                    disabled={subCategoryOptions.length === 0}
                                />


                                <FormInput
                                    label="Child Sub-Category"
                                    name="child_subcategory_id"
                                    type="select"
                                    value={formData.child_subcategory_id || ""}
                                    options={childSubCategoryOptions}
                                    onChange={(v) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            child_subcategory_id: v,
                                        }))
                                    }
                                    disabled={childSubCategoryOptions.length === 0}
                                />



                            </div>

                            {
                                brandData &&
                                <FormInput label="Brand" name="brand_id" type="select" Required
                                    value={formData.brand_id || ""}
                                    options={brandData?.data?.map(b => ({ label: b.name, value: b.id })) || []}
                                    onChange={(v) => handleInputChange(v, "brand_id")}
                                />
                            }

                            <FormInput
                                label="Status"
                                name="status"
                                type="select"
                                value={formData.status || ""}
                                options={[
                                    { label: "Pending", value: "pending" },
                                    { label: "Published", value: "published" },
                                    { label: "Deactivated", value: "deactivated" },
                                    { label: "Suspended", value: "suspended" },
                                ]}
                                onChange={(value) => handleInputChange(value, "status")}
                                Required
                            />

                            {/* <FormInput
label="Has Variants?"
name="has_variants"
type="select"
value={productHasVariants}
options={[
{ label: "No", value: false },
{ label: "Yes", value: true },
]}
onChange={(value) => handleInputChange(value, "has_variants")}
/> */}
                        </div>

                        <div className="py-3">
                            <FormInput label="Short Description" name="short_description" type="textarea" Required value={formData.short_description || ""} onChange={handleInputChange} placeholder="Enter short description" />
                        </div>

                        <FormInput label="Description" name="description" type="textarea" value={formData.description || ""} onChange={handleInputChange} placeholder="Enter description" />

                        {/* <div className="bg-yellow-50 p-4 border border-slate-200 rounded-sm space-y-4 mb-4">

<div className="grid grid-cols-3 gap-3">
<FormInput label="Base Price" name="base_price" type="number" Required value={formData.base_price || ""} onChange={handleInputChange} />
<FormInput label="Cost Price" name="cost_price" type="number" Required value={formData.cost_price || ""} onChange={handleInputChange} />
<FormInput label="Weight" name="weight" type="number" Required value={formData.weight || ""} onChange={handleInputChange} />
<FormInput label="stock" name="stock" type="number" Required value={formData.stock || ""} onChange={handleInputChange} />
<div className="flex items-center gap-2 col-span-2">
<h3 className="font-medium">Main Image:</h3>
<Media selectedMedia={selectedMainMedia} setSelectedMedia={setSelectedMainMedia} />
</div>
</div>


</div> */}
                    </div>

                </div>

                {/* varients */}
                <div className="lg:col-span-3 card !p-0">
                    <h3 className="text-lg lg:text-xl font-semibold text-center py-3 bg-gray-100 uppercase">Varients</h3>
                    {productHasVariants && (
                        <div className="space-y-6 p-5">

                            {variants.map((variant, vIdx) => (
                                <div key={vIdx} className="bg-white p-4 rounded-sm border border-slate-200 space-y-4">

                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-blue-800">Variant #{vIdx + 1}</h3>

                                        {variants.length > 1 && (
                                            <button type="button" className="text-red-500" onClick={() => removeVariant(vIdx)}>
                                                Remove Variant
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid md:grid-cols-4 gap-3">
                                        <FormInput label="Regular Price" type="text" name={`variant_price_${vIdx}`} autoComplete="on" value={variant.price || ""} onChange={e => handleVariantChange(vIdx, "price", e.target.value)} placeholder="Enter sale price" Required />

                                        <FormInput label="Sale Price" type="text" name="variant_cost_price" autoComplete="on" value={variant.cost_price || ""} onChange={e => handleVariantChange(vIdx, "cost_price", e.target.value)} placeholder="Enter regular price" Required />

                                        <FormInput label="Stock" type="text" name="variant_stock" autoComplete="on" value={variant.stock || ""} onChange={e => handleVariantChange(vIdx, "stock", e.target.value)} placeholder="Enter stock" />

                                        <FormInput label="Weight(KG)" type="text" name="variant_weight" autoComplete="on" value={variant.weight || ""} onChange={e => handleVariantChange(vIdx, "weight", e.target.value)} placeholder="Enter weight" />
                                    </div>

                                    <div>
                                        <h4 className="font-medium mb-1">Variant Image</h4>
                                        <Media
                                            selectedMedia={variant.media ? [variant.media] : []}
                                            setSelectedMedia={(media) =>
                                                handleVariantChange(vIdx, "media", media[0] || null)
                                            }
                                        />

                                    </div>

                                    {/* attributes */}
                                    <div className="space-y-1">

                                        {variant.attributes.map((attr, aIdx) => (
                                            <div key={aIdx} className="flex items-center gap-2">

                                                <div className="flex-1 grid md:grid-cols-2 gap-3 items-center">
                                                    {/* Attribute Dropdown */}
                                                    <FormInput
                                                        label="Attribute"
                                                        type="select"
                                                        value={attr.attribute_id || ""}
                                                        options={attributeOptions}
                                                        onChange={(v) => {
                                                            const allValues = getValues(v).map(x => x.value);
                                                            handleAttributeChange(vIdx, aIdx, "attribute_id", v);
                                                            handleAttributeChange(vIdx, aIdx, "attribute_value_ids", allValues);
                                                        }}
                                                        Required
                                                    />

                                                    <div>
                                                        <label className="text-sm font-medium">Values</label>
                                                        <Select
                                                            mode="multiple"
                                                            allowClear
                                                            className="w-full mt-1"
                                                            value={attr.attribute_value_ids || []}
                                                            options={getValues(attr.attribute_id)}
                                                            onChange={(vals) =>
                                                                handleAttributeChange(vIdx, aIdx, "attribute_value_ids", vals)
                                                            }
                                                        />
                                                    </div>

                                                </div>

                                                {/* Remove Attribute */}
                                                {variant.attributes.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className="ml-1.5 mt-5 2xl:mt-6"
                                                        onClick={() => removeAttribute(vIdx, aIdx)}
                                                    >
                                                        <DeleteIcon />
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            className="text-blue-600"
                                            onClick={() => addAttribute(vIdx)}
                                        >
                                            + Add Attribute
                                        </button>
                                    </div>
                                    {editData && (
                                        <FormInput
                                            label="Attribute Change Reason"
                                            type="textarea"
                                            name={`change_reason_${vIdx}`}
                                            value={variant.change_reason || ""}
                                            onChange={(e) => handleVariantChange(vIdx, "change_reason", e.target.value)}
                                            placeholder="Write attribute change reason"
                                        />
                                    )}
                                </div>
                            ))}

                            <button type="button" className="text-blue-700 font-medium" onClick={addVariant}>
                                + Add Variant
                            </button>

                        </div>
                    )}
                </div>

            </div>

            <div className="card !p-0 mt-8">
                <h3 className="text-lg font-semibold text-center py-3 bg-gray-100 uppercase">Meta Info</h3>
                {/* meta data */}
                <div className="grid md:grid-cols-2 gap-3 pt-3 p-5">

                    <FormInput
                        label="Meta Title"
                        name="meta_title"
                        value={formData.meta_title || ""}
                        onChange={handleInputChange}
                        placeholder="Enter meta title"
                    />

                    <FormInput
                        label="Meta Description"
                        name="meta_description"
                        value={formData.meta_description || ""}
                        onChange={handleInputChange}
                        placeholder="Enter meta description"
                    />



                </div>
            </div>

            {editData &&
                <div className="card mt-8">

                    <FormInput
                        label="Change Reason"
                        type="textarea"
                        name="change_reason"
                        value={formData.change_reason || ""}
                        onChange={handleInputChange}
                        placeholder="Write change reason"
                    />
                </div>
            }

            {errMessage && <div className="err-msg">{errMessage}</div>}

            <div className="flex justify-center pt-8">
                <SubmitButton btnText={editData ? "Update Product" : "Add Product"} loading={btnLoading} />
            </div>
        </form>
    );
};

export default ProductForm;