import React from "react";
import { Tag } from "antd";
import { IoMail, IoLocationSharp, IoCall, IoPhonePortrait } from "react-icons/io5";


const ProfileInfo = ({ user }) => {

    // console.log(user);

    return (
        <div className="space-y-4">

            <div className="card flex flex-col items-center text-center">
                <img
                    src={user?.media?.urls?.small}
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover"
                />

                <h2 className="text-xl font-semibold my-3">{user?.name}</h2>

                <Tag color="cyan-inverse" className="!mb-2">
                    {user?.roles[0]?.name}
                </Tag>
                <Tag color={user?.active ? "green" : "red"}>
                    {user?.active ? "Active" : "Inactive"}
                </Tag>
            </div>

            {/* Contact Info */}
            <div className="card space-y-3">
                <div className="flex items-center gap-3">
                    <IoMail className="text-primary text-xl" />
                    <p>{user?.email}</p>
                </div>
                {/* <div className="flex items-center gap-3">
                    <IoLocationSharp className="text-primary text-xl" />
                    <p>312 3rd St, Albany, New York 12206, USA</p>
                </div> */}
                {
                    user?.phone &&
                    <div className="flex items-center gap-3">
                        <IoCall className="text-primary text-xl" />
                        <p>{user?.phone}</p>
                    </div>
                }
            </div>

        </div>
    );
};

export default ProfileInfo;
