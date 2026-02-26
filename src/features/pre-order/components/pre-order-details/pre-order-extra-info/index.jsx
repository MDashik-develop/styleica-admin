import React from "react";

const PreOrderExtraInfo = ({ order }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ===== Pickup Info ===== */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-2">Pickup Info</h3>
                <p>{order.pickup}</p>
            </div>

            {/* ===== Customer Note ===== */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-2">Customer Note</h3>
                <p className="italic text-slate-600">
                    {order.note || "No note provided."}
                </p>
            </div>

            {/* ===== Pre-Order Logs ===== */}
            <div className="card">
                <h3 className="font-semibold text-lg mb-2">Pre-Order Logs</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
                    <div className="text-sm border-b border-slate-200 pb-2">
                        <p>
                            <strong className="text-slate-700">Admin - Avi Deb</strong> created this pre-order
                        </p>
                        <p className="text-slate-500 text-xs">05 Oct, 2025 - 10:30 AM</p>
                    </div>
                    <div className="text-sm border-b border-slate-200 pb-2">
                        <p>
                            <strong className="text-slate-700">Staff - Rafi</strong> changed status from pending to confirmed
                        </p>
                        <p className="text-slate-500 text-xs">06 Oct, 2025 - 11:45 AM</p>
                    </div>
                    <div className="text-sm pb-2">
                        <p>
                            <strong className="text-slate-700">Admin - Avi Deb</strong> updated payment info
                        </p>
                        <p className="text-slate-500 text-xs">07 Oct, 2025 - 09:15 AM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreOrderExtraInfo;
