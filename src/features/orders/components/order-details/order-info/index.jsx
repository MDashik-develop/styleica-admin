import React, { useState } from "react";
import { ViewIcon, WhatsappIcon } from "../../../../../components/reusable/ui/common-icons";
import FormInput from "../../../../../components/reusable/form-input"
import { Tag } from "antd";
import { Link } from "react-router-dom";
import CopyToClipboard from "../../../../../components/reusable/copy-to-clipboard";


const OrderInfo = ({ order }) => {

    const [noteEdit, setNoteEdit] = useState(false);

    if (!order) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* LEFT INFO */}
            <div className="space-y-3">

                <div className="flex items-center gap-3">
                    <div className="w-fit flex items-center gap-2 text-primary bg-primary/10 px-3 py-1">
                        <p>{order?.invoice_no}</p>
                        <CopyToClipboard value={order?.invoice_no} />
                    </div>

                </div>

                <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(order?.created_at)?.toLocaleString()}
                </p>

                <p>
                    <strong>Assigned Courier:</strong>{" "}
                    {order?.partner?.name || "N/A"}
                </p>

                <p>
                    <strong>Delivery Area:</strong>{" "}
                    {order?.customer?.address}
                </p>

                <p>
                    <strong>Source:</strong>{" "}
                    <Tag className="uppercase">{order?.channel}</Tag>
                </p>

                <p>
                    <strong>Order Type:</strong>{" "}
                    <Tag className="uppercase">{order?.order_type}</Tag>
                </p>

                {/* INTERNAL NOTE */}
                {/* <div className="max-w-52 p-3 border border-slate-300">
                    <div className="flex justify-between items-center mb-3">
                        <p>Internal Notes</p>
                        <button
                            onClick={() => setNoteEdit(!noteEdit)}
                            className="text-primary"
                        >
                            {noteEdit ? "Close" : "Add Notes"}
                        </button>
                    </div>

                    {noteEdit ? (
                        <form>
                            <FormInput
                                name="note"
                                placeholder="Add Notes"
                                defaultValue={order?.customer?.note}
                            />
                            <button className="button !mt-3">Save</button>
                        </form>
                    ) : (
                        <p className="opacity-60">
                            {order?.customer?.note || "No Note."}
                        </p>
                    )}
                </div> */}


            </div>

            {/* RIGHT INFO */}
            <div className="md:text-right flex flex-col md:items-end gap-2">

                <div className="flex items-center gap-1 font-bold text-base md:text-lg">
                    <button><ViewIcon /></button>
                    <h2>{order?.customer?.name}</h2>
                </div>

                <Tag color="blue" className="w-fit capitalize">
                    {order?.payment_status}
                </Tag>

                <div className="flex items-center gap-2 font-semibold">
                    <Link to={`https://wa.me/${order?.customer?.phone}`} target="_blank" rel="noreferrer">
                        <WhatsappIcon />
                    </Link>
                    <CopyToClipboard value={order?.customer?.phone} />
                    <Link to={`tel:${order?.customer?.phone}`}>{order?.customer?.phone}</Link>
                </div>

                <p>{order?.customer?.address}</p>

                <p>
                    <strong>Payment Method:</strong>{" "}
                    <Tag color="green">{order?.payment_method}</Tag>
                </p>
            </div>
        </div>
    );
};

export default OrderInfo;
