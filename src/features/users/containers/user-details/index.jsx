import React from "react";
import { FaUserTie, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaRegEdit, FaTrash } from "react-icons/fa";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import { Tag } from "antd";


const UserDetails = () => {

    const user = {
        id: "USR-1024",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Ahsan Rahman",
        designation: "Manager",
        email: "ahsan@company.com",
        phone: "01711223344",
        joiningDate: "2023-01-15",
        lastLogin: "2025-02-10 11:34 AM",
        status: "Active",
        address: "House 12, Road 8, Gulshan, Dhaka, Bangladesh",
        city: "Dhaka",
        country: "Bangladesh",
        department: "Sales & Operations",
        totalSales: 125,
        completedTasks: 87,
        pendingTasks: 5,
        activity: [
            { time: "10:00 AM", action: "Logged in from Chrome" },
            { time: "11:30 AM", action: "Completed monthly report" },
            { time: "01:00 PM", action: "Approved team tasks" },
        ],
    };

    return (
        <div>

            {/* Header */}
            <h2 className="title">User Profile</h2>

            <div className="grid md:grid-cols-3 gap-6">

                {/* Profile Card */}
                <div className="card flex flex-col items-center text-center relative">
                    <span className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-full 
                        ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {user.status}
                    </span>
                    <img
                        src={user.photo}
                        alt={user.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                    />
                    <h3 className="my-2 text-2xl font-semibold">{user.name}</h3>
                    <Tag color="cyan">
                        {user.designation}
                    </Tag>

                    {/* Stats */}
                    <div className="mt-6 w-full grid grid-cols-3 gap-2 text-center">
                        <div className="bg-indigo-100 p-3 rounded-sm">
                            <p className="text-gray-500 text-xs">Sales</p>
                            <p className="text-indigo-600 font-bold text-lg">{user.totalSales}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-sm">
                            <p className="text-gray-500 text-xs">Completed</p>
                            <p className="text-green-600 font-bold text-lg">{user.completedTasks}</p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-sm">
                            <p className="text-gray-500 text-xs">Pending</p>
                            <p className="text-red-600 font-bold text-lg">{user.pendingTasks}</p>
                        </div>
                    </div>

                    {/* <div className="flex justify-center items-center gap-3 mt-6">
                        <button className="button">
                            <FaRegEdit />
                            Edit
                        </button>
                        <button className="button !bg-red-600">
                            <FaTrash />
                            Delete
                        </button>
                    </div> */}

                </div>

                {/* Main Info */}
                <div className="md:col-span-2 space-y-4">

                    {/* Personal Info */}
                    <div className="card grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaEnvelope className="text-indigo-500" /> Email: {user.email} <CopyToClipboard value={user.email} />
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaPhoneAlt className="text-indigo-500" /> Phone: {user.phone} <CopyToClipboard value={user.phone} />
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaMapMarkerAlt className="text-indigo-500" /> Address: {user.address}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaUserTie className="text-indigo-500" /> Department: {user.department}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaCalendarAlt className="text-indigo-500" /> Joining Date: {user.joiningDate}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <FaCalendarAlt className="text-indigo-500" /> Last Login: {user.lastLogin}
                        </div>
                    </div>

                    {/* Activity Logs */}
                    <div className="card">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Activity Logs</h3>
                        <ul className="divide-y divide-gray-200">
                            {user.activity.map((act, index) => (
                                <li key={index} className="py-2 flex justify-between text-gray-600 hover:bg-gray-50 rounded px-2 transition">
                                    <span>{act.action}</span>
                                    <span className="text-gray-400">{act.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserDetails;
