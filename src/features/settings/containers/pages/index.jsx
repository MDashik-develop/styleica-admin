import React, { useState } from "react";
import PageManageModal from "../../components/pages/page-manage-modal";

const Pages = () => {

    const [pages, setPages] = useState([
        { id: 1, title: "Home" },
        { id: 2, title: "About" },
        { id: 3, title: "Contact" },
    ]);

    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);

    // HANDLE ADD & UPDATE
    const handleSubmit = (data) => {
        if (editData) {
            // UPDATE
            setPages(prev =>
                prev.map(p =>
                    p.id === editData.id ? { ...p, title: data.name } : p
                )
            );
        } else {
            // ADD NEW PAGE
            setPages(prev => [
                ...prev,
                {
                    id: prev.length ? prev[prev.length - 1].id + 1 : 1,
                    title: data.name,
                },
            ]);
        }
    };

    return (
        <div>

            <div className="flex justify-between items-center">
                <h2 className="title !pb-0">Pages</h2>
                <button
                    className="button !bg-primary text-light mt-2"
                    onClick={() => {
                        setEditData(null);
                        setOpenModal(true);
                    }}
                >
                    Add Page
                </button>
            </div>

            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                {pages.map(page => (
                    <div key={page.id} className="card flex justify-between items-center gap-3">
                        <span>{page.title}</span>

                        <button
                            className="button-outline !px-3 !py-1.5"
                            onClick={() => {
                                setEditData({ id: page.id, name: page.title });
                                setOpenModal(true);
                            }}
                        >
                            Edit
                        </button>
                    </div>
                ))}


                {/* MODAL */}
                <PageManageModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    initialValues={editData}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Pages;
