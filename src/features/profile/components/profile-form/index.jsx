import React from "react";
import FormInput from "../../../../components/reusable/form-input";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import Media from "../../../../components/reusable/media";
import { useLogout } from "../../../auth/services/auth";


const ProfileForm = () => {

    const handleLogOut = useLogout();

    return (
        <div className="card w-full">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 border-b border-b-slate-300 pb-4 mb-4">
                <h2 className="title !pb-0">My Profile Details</h2>
                <div className="flex items-center gap-3">
                    {/* <button className="button !bg-green-600">
                        <FaLock />
                        Change Password
                    </button> */}
                    <button onClick={handleLogOut} className="button !bg-red-600">
                        <RiLogoutCircleLine />
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <FormInput label="Full Name" placeholder="Maria" />
                <FormInput label="Password" type="password" placeholder="**********" />

                <FormInput label="City" placeholder="City" type="select" />
                <FormInput label="Country" placeholder="Aland Islands" type="select" />

                <FormInput label="Phone Number" placeholder="(123) 456-7890" />
                <FormInput label="Email" placeholder="maria@email.com" />

                <FormInput label="State" placeholder="State" type="select" />
                <FormInput label="Zip Code" placeholder="Zip Code" />

                <FormInput label="Address" placeholder="Address" />
                <div className="flex flex-col gap-2 mt-2">
                    <label className="font-semibold opacity-80">Upload Image</label>
                    <Media />
                </div>

            </div>

            <button className="button mx-auto !mt-5">
                Update information
            </button>

        </div>
    );
};

export default ProfileForm;
