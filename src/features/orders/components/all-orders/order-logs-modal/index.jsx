import React, { useState } from "react";
import { Modal, Tag, Timeline } from "antd";
import { TbLogs } from "react-icons/tb";
import dayjs from "dayjs";

const OrderLogsModal = ({ logs = [] }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openLogId, setOpenLogId] = useState(null);

    // Toggle one log at a time
    const toggleLog = (id) => {
        setOpenLogId((prev) => (prev === id ? null : id));
    };

    // Safely parse notes JSON or object
    const parseNotes = (notes) => {
        if (!notes) return null;
        if (typeof notes === "object") return notes;

        try {
            return JSON.parse(notes);
        } catch {
            return null;
        }
    };

    // Check if a log has any old/new changes
    const hasDetails = (notes) => {
        const parsed = parseNotes(notes);
        return parsed?.old && parsed?.new && Object.keys({ ...parsed.old, ...parsed.new }).some(
            key => JSON.stringify(parsed.old[key]) !== JSON.stringify(parsed.new[key])
        );
    };

    // Render value nicely
    const safeParse = (value) => {
        if (typeof value !== "string") return value;
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    };

    const isObject = (val) =>
        val && typeof val === "object" && !Array.isArray(val);

    // ✅ STRICT ISO DATE CHECK (FIX)
    const isIsoDate = (value) =>
        typeof value === "string" &&
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);

    const renderValue = (value) => {
        const parsed = safeParse(value);

        if (isObject(parsed)) {
            return (
                <div className="space-y-1 text-xs">
                    {Object.entries(parsed).map(([k, v]) => (
                        <div key={k}>
                            <span className="font-medium">
                                {k.replaceAll("_", " ")}:
                            </span>{" "}
                            {String(v)}
                        </div>
                    ))}
                </div>
            );
        }

        // ✅ ONLY real ISO dates will be formatted
        if (isIsoDate(parsed)) {
            return dayjs(parsed).format("DD MMM YYYY, hh:mm A");
        }

        return String(parsed ?? "—");
    };

    // Render old → new changes in 2-column grid
    const renderChangeDetails = (notes) => {
        const parsed = parseNotes(notes);
        if (!parsed?.old || !parsed?.new) return null;

        const oldData = parsed.old;
        const newData = parsed.new;

        const keysToShow = Object.keys({ ...oldData, ...newData }).filter(
            key => JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])
        );

        if (keysToShow.length === 0) return null;

        return (
            <div className="mt-3 border border-slate-300 rounded bg-gray-50 p-3 text-sm">
                <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="font-medium text-xs">Old</div>
                    <div className="font-medium text-xs">New</div>
                </div>

                {keysToShow.map((key) => (
                    <div key={key} className="grid grid-cols-2 gap-4 items-start">
                        <div className="text-red-600 text-xs">
                            <div className="font-medium capitalize">
                                {key.replaceAll("_", " ")}
                            </div>
                            {renderValue(oldData[key])}
                        </div>

                        <div className="text-green-600 text-xs">
                            <div className="font-medium capitalize">
                                {key.replaceAll("_", " ")}
                            </div>
                            {renderValue(newData[key])}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 text-primary"
            >
                <TbLogs />
            </button>

            <Modal
                title="Order Logs"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={750}
                destroyOnClose
            >
                {logs.length === 0 ? (
                    <p>No logs available.</p>
                ) : (
                    <Timeline>
                        {logs.map((log) => {
                            const isOpen = openLogId === log.id;
                            const showDetailsBtn = hasDetails(log.notes);

                            return (
                                <Timeline.Item key={log.id}>
                                    <div className="space-y-1">
                                        <p className="text-xs opacity-70">
                                            {dayjs(log.created_at).format(
                                                "DD MMM YYYY, hh:mm A"
                                            )}
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <p className="font-medium">
                                                {parseNotes(log.notes)?.message || "Log updated"}
                                                {/* {log.changed_by_id && (
                                                    <span className="opacity-70">
                                                        {" "}– By #{log.changed_by_id}
                                                    </span>
                                                )} */}
                                            </p>

                                            {showDetailsBtn && (
                                                <button
                                                    onClick={() => toggleLog(log.id)}
                                                >
                                                    <Tag color="blue">
                                                        {isOpen ? "Hide" : "Details"}
                                                    </Tag>
                                                </button>
                                            )}
                                        </div>

                                        <div
                                            className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"
                                                }`}
                                        >
                                            {isOpen && renderChangeDetails(log.notes)}
                                        </div>
                                    </div>
                                </Timeline.Item>
                            );
                        })}
                    </Timeline>
                )}
            </Modal>
        </>
    );
};

export default OrderLogsModal;





// import React, { useState } from "react";
// import { Modal, Tag, Timeline } from "antd";
// import { TbLogs } from "react-icons/tb";
// import dayjs from "dayjs";


// const OrderLogsModal = ({ logs = [] }) => {

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [openLogId, setOpenLogId] = useState(null);

//     // Toggle one log at a time
//     const toggleLog = (id) => {
//         setOpenLogId((prev) => (prev === id ? null : id));
//     };

//     // Safely parse notes JSON or object
//     const parseNotes = (notes) => {
//         if (!notes) return null;
//         if (typeof notes === "object") return notes;

//         try {
//             return JSON.parse(notes);
//         } catch {
//             return null;
//         }
//     };

//     // Check if a log has any old/new changes
//     const hasDetails = (notes) => {
//         const parsed = parseNotes(notes);
//         return parsed?.old && parsed?.new && Object.keys({ ...parsed.old, ...parsed.new }).some(
//             key => JSON.stringify(parsed.old[key]) !== JSON.stringify(parsed.new[key])
//         );
//     };

//     // Render value nicely
//     const safeParse = (value) => {
//         if (typeof value !== "string") return value;
//         try {
//             return JSON.parse(value);
//         } catch {
//             return value;
//         }
//     };

//     const isObject = (val) =>
//         val && typeof val === "object" && !Array.isArray(val);

//     const renderValue = (value) => {
//         const parsed = safeParse(value);

//         if (isObject(parsed)) {
//             return (
//                 <div className="space-y-1 text-xs">
//                     {Object.entries(parsed).map(([k, v]) => (
//                         <div key={k}>
//                             <span className="font-medium">{k.replaceAll("_", " ")}:</span>{" "}
//                             {String(v)}
//                         </div>
//                     ))}
//                 </div>
//             );
//         }

//         if (typeof parsed === "string" && dayjs(parsed).isValid()) {
//             return dayjs(parsed).format("DD MMM YYYY, hh:mm A");
//         }

//         return String(parsed ?? "—");
//     };

//     // Render old → new changes in 2-column grid
//     const renderChangeDetails = (notes) => {
//         const parsed = parseNotes(notes);
//         if (!parsed?.old || !parsed?.new) return null;

//         const oldData = parsed.old;
//         const newData = parsed.new;

//         const keysToShow = Object.keys({ ...oldData, ...newData }).filter(
//             key => JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])
//         );

//         if (keysToShow.length === 0) return null;

//         return (
//             <div className="mt-3 border border-slate-300 rounded bg-gray-50 p-3 text-sm">
//                 <div className="grid grid-cols-2 gap-4 mb-2">
//                     <div className="font-medium text-xs">Old</div>
//                     <div className="font-medium text-xs">New</div>
//                 </div>

//                 {keysToShow.map((key) => (
//                     <div key={key} className="grid grid-cols-2 gap-4 items-start">
//                         <div className="text-red-600 text-xs">
//                             <div className="font-medium capitalize">{key.replaceAll("_", " ")}</div>
//                             {renderValue(oldData[key])}
//                         </div>

//                         <div className="text-green-600 text-xs">
//                             <div className="font-medium capitalize">{key.replaceAll("_", " ")}</div>
//                             {renderValue(newData[key])}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <>
//             <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="flex items-center gap-1 text-primary"
//             >
//                 <TbLogs />
//             </button>

//             <Modal
//                 title="Order Logs"
//                 open={isModalOpen}
//                 onCancel={() => setIsModalOpen(false)}
//                 footer={null}
//                 width={750}
//                 destroyOnClose
//             >
//                 {logs.length === 0 ? (
//                     <p>No logs available.</p>
//                 ) : (
//                     <Timeline>
//                         {logs.map((log) => {
//                             const isOpen = openLogId === log.id;
//                             const showDetailsBtn = hasDetails(log.notes);

//                             return (
//                                 <Timeline.Item key={log.id}>
//                                     <div className="space-y-1">
//                                         <p className="text-xs opacity-70">
//                                             {dayjs(log.created_at).format(
//                                                 "DD MMM YYYY, hh:mm A"
//                                             )}
//                                         </p>

//                                         <div className="flex items-center gap-3">
//                                             <p className="font-medium">
//                                                 {parseNotes(log.notes)?.message || "Log updated"}
//                                                 {log.changed_by_id && (
//                                                     <span className="opacity-70">
//                                                         {" "}– By #{log.changed_by_id}
//                                                     </span>
//                                                 )}
//                                             </p>

//                                             {showDetailsBtn && (
//                                                 <button
//                                                     onClick={() => toggleLog(log.id)}
//                                                 >
//                                                     <Tag color="blue">
//                                                         {isOpen ? "Hide" : "Details"}
//                                                     </Tag>
//                                                 </button>
//                                             )}
//                                         </div>

//                                         {/* Expandable change details */}
//                                         <div
//                                             className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"
//                                                 }`}
//                                         >
//                                             {isOpen && renderChangeDetails(log.notes)}
//                                         </div>
//                                     </div>
//                                 </Timeline.Item>
//                             );
//                         })}
//                     </Timeline>
//                 )}
//             </Modal>
//         </>
//     );
// };

// export default OrderLogsModal;



