import React from "react";
import ProfileInfo from "../../components/profile-info";
import ProfileForm from "../../components/profile-form";
import { useSelector } from "react-redux";
import SectionLoading from "../../../../components/reusable/ui/section-loading";


const Profile = () => {

    const { user, loading } = useSelector((state) => state.user);


    return (
        <div className="flex flex-col md:flex-row gap-6">
            {
                loading ?
                    <SectionLoading />
                    :
                    <div className="max-w-sm">
                        <ProfileInfo user={user} />
                    </div>
            }
            <div className="flex-1">
                <ProfileForm />
            </div>
        </div>
    );
};

export default Profile;