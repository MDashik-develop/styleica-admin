import React from "react";
import { FaRegFileExcel } from "react-icons/fa6";

const NoData = () => {

    return (
        <div className="flex flex-col items-center gap-3 opacity-70">
            <FaRegFileExcel className="text-3xl md:text-5xl" />
            <h4 className="text-base md:text-lg font-bold">No Data Found!</h4>
        </div>
    );
};

export default NoData;