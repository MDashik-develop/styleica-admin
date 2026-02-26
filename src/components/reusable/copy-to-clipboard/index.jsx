import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { TiTick } from "react-icons/ti";


const CopyToClipboard = ({ value = "", className = "" }) => {

    const [isCopied, setIsCopied] = useState(false);


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500); // revert icon after 1.5s
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };


    return (
        <>
            <button onClick={handleCopy} className={`text-primary ${className}`} title="Copy">
                {isCopied ? <TiTick /> : <MdContentCopy />}
            </button>
        </>
    );
};

export default CopyToClipboard;