import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateLandingPage,
    useGetLandingPageById,
    useUpdateLandingPage
} from "../../services/landingPagesApi";
import toast from "react-hot-toast";
import SectionLoading from "../../../../components/reusable/ui/section-loading";
import LandingPageForm from "../../components/landing-page-form";


const ManageLandingPages = () => {

    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();

    const { data: landingPageRes, isLoading } = useGetLandingPageById(id);
    const createMutation = useCreateLandingPage();
    const updateMutation = useUpdateLandingPage();

    const btnLoading = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = (payload) => {

        // console.log("payload:", payload);
        // return;

        if (isEdit) {
            updateMutation.mutate(
                { id, payload },
                {
                    onSuccess: (res) => {
                        toast.success(res?.message || "Landing Page Updated");
                        navigate("/landing-pages");
                    },
                    onError: (err) => {
                        toast.error(err?.response?.data?.message || "Update failed!");
                    },
                }
            );
        } else {
            createMutation.mutate(payload, {
                onSuccess: (res) => {
                    toast.success(res?.message || "Landing Page Created");
                    navigate("/landing-pages");
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Create failed!");
                },
            });
        }
    };

    // console.log(landingPageRes);


    return (
        <div>
            <h2 className="title">
                {isEdit ? "Edit Landing Page" : "Add New Landing Page"}
            </h2>
            {isLoading ? (
                <SectionLoading />
            ) : (
                <LandingPageForm
                    editData={landingPageRes}
                    onSubmit={handleSubmit}
                    isEdit={isEdit}
                    btnLoading={btnLoading}
                />
            )}
        </div>
    );
};

export default ManageLandingPages;