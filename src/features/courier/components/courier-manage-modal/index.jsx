import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import FormInput from "../../../../components/reusable/form-input";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";
import toast from "react-hot-toast";


const CourierManageModal = ({ open, setOpen, editData, setEditData, onSubmit, loading }) => {

    const [formData, setFormData] = useState({
        name: "",
        // code: "",
        phone: "",
        base_url: "",
        // auth_type: "token",
        api_key: "",
        api_secret: "",
        username: "",
        password: "",
        token: "",
        inside_charge: "",
        outside_charge: "",
        cod_percent: "",
        status: false,
        extra: [{ key: "", value: "" }],
    });

    // load initial data
    useEffect(() => {
        if (editData) {
            let safeExtra = [{ key: "", value: "" }];

            try {
                if (editData.extra) {
                    const parsed =
                        typeof editData.extra === "string"
                            ? JSON.parse(editData.extra)
                            : editData.extra;

                    if (Array.isArray(parsed)) {
                        safeExtra = parsed.length ? parsed : safeExtra;
                    } else if (typeof parsed === "object") {
                        safeExtra = Object.entries(parsed).map(([key, value]) => ({
                            key,
                            value:
                                value !== null && value !== undefined
                                    ? String(value)
                                    : "",
                        }));
                    }
                }
            } catch (error) {
                toast.error("Invalid extra data");
            }

            setFormData(prev => ({
                ...prev,
                ...editData,
                status:
                    editData.status === true ||
                    editData.status === "1" ||
                    editData.status === 1 ||
                    editData.status === "active",
                extra: safeExtra,
            }));
        } else {
            resetForm();
        }
        // eslint-disable-next-line
    }, [editData]);


    /* -------------------- Helpers -------------------- */
    const resetForm = () => {
        setFormData({
            name: "",
            code: "",
            phone: "",
            base_url: "",
            auth_type: "token",
            api_key: "",
            api_secret: "",
            username: "",
            password: "",
            token: "",
            inside_charge: "",
            outside_charge: "",
            cod_percent: "",
            status: false,
            extra: [{ key: "", value: "" }],
        });
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    /* -------------------- Extra field handlers -------------------- */
    const handleExtraChange = (index, field, value) => {
        const updated = [...formData.extra];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, extra: updated }));
    };

    const addExtraRow = () => {
        setFormData(prev => ({
            ...prev,
            extra: [...prev.extra, { key: "", value: "" }],
        }));
    };

    const removeExtraRow = (index) => {
        const updated = formData.extra.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, extra: updated.length ? updated : [{ key: "", value: "" }] }));
    };

    /* -------------------- Submit -------------------- */
    const handleSubmit = (e) => {

        e.preventDefault();

        const payload = {
            name: formData.name,
            code: formData.code,
            phone: formData.phone,
            base_url: formData.base_url,
            auth_type: formData.auth_type,
            api_key: formData.api_key,
            api_secret: formData.api_secret,
            username: formData.username,
            password: formData.password,
            token: formData.token,
            inside_charge: Number(formData.inside_charge),
            outside_charge: Number(formData.outside_charge),
            cod_percent: Number(formData.cod_percent),
            status: formData.status ? "1" : "0",
            webhook_url: null,
            extra: JSON.stringify(
                formData.extra.filter(e => e.key && e.value)
            ),

        };

        onSubmit(payload);

    };


    return (
        <Modal
            open={open}
            title={editData ? "Edit Courier" : "Add Courier"}
            centered
            footer={null}
            onCancel={() => {
                setOpen(false);
                setEditData(null);
                resetForm();
            }}
        >
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">

                {/* BASIC INFO */}
                <FormInput
                    label="Courier Name"
                    placeholder="Enter courier name"
                    value={formData.name}
                    onChange={e => handleChange("name", e.target.value)}
                    Required
                />

                {/* <FormInput
                    label="Code"
                    placeholder="Enter courier code"
                    value={formData.code}
                    onChange={e => handleChange("code", e.target.value)}
                    Required
                /> */}

                <FormInput
                    label="Phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={e => handleChange("phone", e.target.value)}
                />

                <FormInput
                    label="Base URL"
                    placeholder="https://example.com"
                    value={formData.base_url}
                    onChange={e => handleChange("base_url", e.target.value)}
                />

                {/* AUTH */}
                {/* <FormInput
                    label="Auth Type"
                    type="select"
                    value={formData.auth_type}
                    options={[
                        { label: "Token", value: "token" },
                        { label: "Key & Secret", value: "key_secret" },
                        { label: "Username & Password", value: "username_password" },
                        { label: "None", value: "none" },
                    ]}
                    onChange={value => handleChange("auth_type", value)}
                /> */}

                <FormInput
                    label="API Key"
                    placeholder="Enter API key"
                    value={formData.api_key}
                    onChange={e => handleChange("api_key", e.target.value)}
                />

                <FormInput
                    label="API Secret"
                    placeholder="Enter API secret"
                    value={formData.api_secret}
                    onChange={e => handleChange("api_secret", e.target.value)}
                />

                <FormInput
                    label="Username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={e => handleChange("username", e.target.value)}
                />

                <FormInput
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={e => handleChange("password", e.target.value)}
                />

                <FormInput
                    label="Token"
                    placeholder="Enter token"
                    value={formData.token}
                    onChange={e => handleChange("token", e.target.value)}
                />

                {/* CHARGES */}
                <FormInput
                    label="Inside Charge"
                    type="number"
                    placeholder="e.g. 50"
                    value={formData.inside_charge}
                    onChange={e => handleChange("inside_charge", e.target.value)}
                />

                <FormInput
                    label="Outside Charge"
                    type="number"
                    placeholder="e.g. 100"
                    value={formData.outside_charge}
                    onChange={e => handleChange("outside_charge", e.target.value)}
                />

                <FormInput
                    label="COD Percent"
                    type="number"
                    placeholder="e.g. 1.5"
                    value={formData.cod_percent}
                    onChange={e => handleChange("cod_percent", e.target.value)}
                />

                {/* STATUS */}
                <FormInput
                    label="Status"
                    type="select"
                    value={formData.status}
                    options={[
                        { label: "Active", value: true },
                        { label: "Inactive", value: false },
                    ]}
                    onChange={value => handleChange("status", value)}
                />

                {/* EXTRA */}
                <div className="col-span-2 space-y-2">
                    <p className="font-semibold">Extra Fields</p>
                    <div>
                        {formData.extra.map((row, index) => (
                            <div key={index} className="flex gap-2">
                                <div className="flex-1 grid grid-cols-2 gap-2">
                                    <FormInput
                                        placeholder="Key"
                                        value={row.key}
                                        onChange={e => handleExtraChange(index, "key", e.target.value)}
                                    />
                                    <FormInput
                                        placeholder="Value"
                                        value={row.value}
                                        onChange={e => handleExtraChange(index, "value", e.target.value)}
                                    />
                                </div>
                                <button type="button" className="bg-red-600 text-light px-1 h-fit mt-1" onClick={() => removeExtraRow(index)}>✕</button>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="button-outline" onClick={addExtraRow}>+ Add Row</button>
                </div>

                {/* FOOTER */}
                <div className="col-span-2 flex justify-end gap-3 pt-4">
                    <button type="button" className="button-outline" onClick={() => setOpen(false)}>Cancel</button>
                    <SubmitButton btnText={editData ? "Update" : "Add"} loading={loading} />
                </div>
            </form>
        </Modal>
    );
};

export default CourierManageModal;
