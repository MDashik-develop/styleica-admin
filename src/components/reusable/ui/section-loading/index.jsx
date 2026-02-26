import { Spin } from "antd";
import React from "react";


const SectionLoading = () => {

    return (
        <div className="w-full flex justify-center py-16 md:py-28">
            <Spin size="large" />
        </div>
    );
};

export default SectionLoading;