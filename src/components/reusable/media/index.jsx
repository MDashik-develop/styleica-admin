// Media.jsx
import React, { useState, useEffect } from "react";
import { Modal, Tabs, Button } from "antd";
import AllMedia from "./all-media";
import UploadMedia from "./upload-media";
import { useMedia } from "./services/mediaApi";
import toast from "react-hot-toast";
import { FaImages } from "react-icons/fa6";


const Media = ({ selectedMedia = [], setSelectedMedia, singleUpload = true, iconBtn = false, sidebarCollapsed = false }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useMedia(currentPage);
    const [open, setOpen] = useState(false);
    const [localSelected, setLocalSelected] = useState(selectedMedia || []);
    const [activeTabKey, setActiveTabKey] = useState("1");


    const handleMediaClick = (media) => {
        if (singleUpload) {
            setLocalSelected([media]);
            setSelectedMedia && setSelectedMedia([media]);
            setOpen(false);
        } else {
            const exists = localSelected.find((item) => item.id === media.id);
            let updated;
            if (exists) {
                updated = localSelected.filter((item) => item.id !== media.id);
            } else {
                updated = [...localSelected, media];
            }
            setLocalSelected(updated);
        }
    };

    const handleSelectMulti = () => {
        if (localSelected.length > 0) {
            setSelectedMedia && setSelectedMedia(localSelected);
            setOpen(false);
        } else {
            toast.error("Please select at least one media.");
        }
    };

    // page change fn
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const tabsItems = [
        {
            key: "1",
            label: "All Media",
            children: (
                <>
                    <AllMedia
                        media={data?.data || []}
                        onMediaClick={handleMediaClick}
                        selectedItems={localSelected}
                        singleUpload={singleUpload}
                        isLoading={isLoading}
                        pagination={{
                            currentPage: data?.current_page,
                            lastPage: data?.last_page,
                            onChange: handlePageChange,
                        }}
                    />

                    {!singleUpload && localSelected.length > 0 && (
                        <div className="mt-4 text-right">
                            <Button
                                onClick={handleSelectMulti}
                                className="button !text-light flex mx-auto"
                            >
                                Select {localSelected.length} Item(s)
                            </Button>
                        </div>
                    )}
                </>
            ),
        },
        {
            key: "2",
            label: "Upload Media",
            children: <UploadMedia setActiveTabKey={setActiveTabKey} />,
        },
    ];


    // console.log(selectedMedia, "selected media");


    return (
        <div>

            {
                iconBtn ?
                    <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="flex items-center gap-3 px-[10px] py-2 rounded-md transition-all duration-200
    hover:bg-dark hover:text-light w-full"
                    >
                        <FaImages className="text-lg min-w-[24px]" />

                        <span className={`${sidebarCollapsed && "opacity-0 duration-300"} whitespace-nowrap`}>
                            Media
                        </span>
                    </button>

                    :
                    <button onClick={() => setOpen(true)} type="button" className="button">
                        Open Media
                    </button>
            }

            {selectedMedia &&
                <div className="flex flex-wrap items-center gap-2 pt-3">
                    {selectedMedia?.map(item =>
                        <img src={item?.urls?.small} key={item?.id} className="w-10 h-10 object-cover" alt="image" />
                    )}
                </div>
            }

            <Modal
                title="Media Library"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                width="80vw"
                // bodyStyle={{ height: "80vh", maxHeight: "1200px", overflowY: "auto" }}
                style={{ maxWidth: "1200px", top: "5vh" }}
            >
                <Tabs
                    activeKey={activeTabKey}
                    onChange={setActiveTabKey}
                    items={tabsItems}
                />
            </Modal>
        </div>
    );
};

export default Media;
