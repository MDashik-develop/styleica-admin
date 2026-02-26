import React, { useState } from "react";
import {
    FaUsers,
    FaUserCheck,
    FaUserTimes,
    FaSignOutAlt,
    FaGlobe,
    FaDesktop,
} from "react-icons/fa";
import Table from "../../../../components/reusable/table";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";


const AllUserActivity = () => {

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John Doe",
            status: "Active",
            ip: "103.44.101.22",
            browser: "Chrome (Windows)",
            loginTime: "2025-02-10 11:35 AM"
        },
        {
            id: 2,
            name: "Sarah Ali",
            status: "Active",
            ip: "182.160.210.44",
            browser: "Firefox (MacOS)",
            loginTime: "2025-02-10 10:20 AM"
        },
        {
            id: 3,
            name: "Tanvir Hasan",
            status: "Inactive",
            ip: "103.120.78.11",
            browser: "Safari (iPhone)",
            loginTime: "2025-02-09 09:15 PM"
        },
    ]);

    // Table Columns
    const headers = [
        {
            title: "User",
            dataIndex: "name",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (value) => (
                value === "Active" ?
                    <span className="text-green-600 font-medium flex justify-center items-center gap-1">
                        <FaUserCheck /> Active
                    </span>
                    :
                    <span className="text-red-600 font-medium flex justify-center items-center gap-1">
                        <FaUserTimes /> Inactive
                    </span>
            )
        },
        {
            title: "IP Address",
            dataIndex: "ip",
            render: (value) => (
                <div className="flex justify-center items-center gap-2">
                    <FaGlobe className="text-gray-500" />
                    {value}
                    <CopyToClipboard value={value} />
                </div>
            )
        },
        {
            title: "Browser",
            dataIndex: "browser",
            render: (value) => (
                <div className="flex justify-center items-center gap-2">
                    <FaDesktop className="text-gray-500" />
                    {value}
                </div>
            )
        },
        {
            title: "Login Time",
            dataIndex: "loginTime"
        },
        {
            title: "Actions",
            render: (_, record) => (
                <button
                    disabled={record.status === "Inactive"}
                    onClick={() => handleLogout(record.id)}
                    className={`button !py-1 !px-3 flex mx-auto items-center gap-2 ${record.status === "Inactive" ? "!bg-gray-400 cursor-not-allowed" : "!bg-red-600"}`}
                >
                    <FaSignOutAlt /> Logout
                </button>
            )
        }
    ];


    // Logout single user
    const handleLogout = (id) => {
        setUsers(prev =>
            prev.map(u =>
                u.id === id ? { ...u, status: "Inactive" } : u
            )
        );
    };

    // Logout all users
    const handleLogoutAll = () => {
        setUsers(prev =>
            prev.map(u => ({ ...u, status: "Inactive" }))
        );
    };

    // Stats
    const activeCount = users.filter(u => u.status === "Active").length;
    const inactiveCount = users.filter(u => u.status === "Inactive").length;


    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="title !pb-0">User Activities</h2>

                <button
                    onClick={handleLogoutAll}
                    className="button !bg-red-600"
                >
                    <FaSignOutAlt /> Logout All Users
                </button>
            </div>


            {/* Stats Section */}
            <div className="grid md:grid-cols-3 gap-6">

                <div className="card flex items-center gap-4">
                    <FaUsers className="text-4xl text-primary" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <p className="text-xl font-semibold">{users.length}</p>
                    </div>
                </div>

                <div className="card flex items-center gap-4">
                    <FaUserCheck className="text-4xl text-green-600" />
                    <div>
                        <p className="text-gray-500 text-sm">Active Users</p>
                        <p className="text-xl font-semibold">{activeCount}</p>
                    </div>
                </div>

                <div className="card flex items-center gap-4">
                    <FaUserTimes className="text-4xl text-red-600" />
                    <div>
                        <p className="text-gray-500 text-sm">Inactive Users</p>
                        <p className="text-xl font-semibold">{inactiveCount}</p>
                    </div>
                </div>

            </div>


            {/* Users Table */}
            <Table
                headers={headers}
                data={users}
                enableSelection={false}
            />

        </div>
    );
};

export default AllUserActivity;
