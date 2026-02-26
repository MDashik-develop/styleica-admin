import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import SectionLoading from "../../ui/section-loading";


const AllMedia = ({ media, onMediaClick, selectedItems = [], singleUpload, pagination, isLoading }) => {

    const isSelected = (item) => selectedItems.find((m) => m.id === item.id);

    const { currentPage, lastPage, onChange } = pagination || {};
    const hasNext = currentPage < lastPage;
    const hasPrev = currentPage > 1;


    // Tailwind classes for the dynamic blue border
    const selectedBorder = "border-2 border-[#1890ff]";
    const defaultBorder = "border border-gray-200";

    // Tailwind classes for the blue checkmark circle
    const selectedCheck = "absolute top-1 right-1 bg-[#1890ff] text-white rounded-full w-5 h-5 flex justify-center items-center text-xs";



    return (
        <>
            {
                isLoading ?
                    <SectionLoading />
                    :
                    <div className="flex flex-col h-full">
                        {/* Media Grid */}
                        <div
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto"
                        >
                            {media.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => onMediaClick(item)}
                                    className={`
                                        ${isSelected(item) ? selectedBorder : defaultBorder} 
                                        rounded-lg overflow-hidden cursor-pointer relative
                                    `}
                                >
                                    <img
                                        src={item?.urls?.small}
                                        alt={`media-${idx}`}
                                        className={`
                                            w-full h-46 object-cover 
                                            ${isSelected(item) ? 'opacity-70' : 'opacity-100'}
                                        `}
                                    />
                                    {!singleUpload && isSelected(item) && (
                                        <div
                                            className={selectedCheck}
                                        >
                                            ✓
                                        </div>
                                    )}
                                    <div className="w-full h-fit text-center p-1 bg-dark text-light text-xs">
                                        {item?.path || "No Name"}
                                    </div>
                                </div>
                            ))}

                            {media.length === 0 && <p className="col-span-full text-center py-10 text-gray-500">No media yet.</p>}

                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-end items-center gap-3 pt-6 shrink-0">
                            <button
                                className="button-outline"
                                onClick={() => onChange(currentPage - 1)}
                                disabled={!hasPrev}
                            >
                                <IoIosArrowBack />
                            </button>
                            <p className="px-4 py-1 bg-primary text-light rounded">
                                {currentPage} / {lastPage}
                            </p>
                            <button
                                className={`button-outline rotate-180`}
                                onClick={() => onChange(currentPage + 1)}
                                disabled={!hasNext}
                            >
                                <IoIosArrowBack />
                            </button>
                        </div>
                    </div>
            }
        </>
    );
};

export default AllMedia;