import { FaPlus, FaTrash } from "react-icons/fa";
import { MdLocalPrintshop, MdContentCopy, MdInfoOutline } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export const CurrencyIcon = ({ className }) => {
    return (
        <span className={`${className} text-xl`}>৳</span>
    );
};

export const AddIcon = ({ className }) => {
    return (
        <FaPlus className={`text-2xl ${className}`} />
    );
};

export const ViewIcon = ({ className }) => {
    return (
        <MdInfoOutline className={`text-primary text-base ${className}`} />
    );
};

export const EditIcon = ({ className }) => {
    return (
        <RiEditLine className={`text-primary ${className}`} />
    );
};

export const DeleteIcon = ({ className }) => {
    return (
        <FaTrash className={`text-red-600 text-xl ${className}`} />
    );
};

export const PrintIcon = ({ className }) => {
    return (
        <MdLocalPrintshop className={`text-primary text-base ${className}`} />
    );
};

// export const CopyIcon = ({ className }) => {
//     return (
//         <MdContentCopy className={`text-primary ${className}`} />
//     );
// };

export const InvoiceIcon = ({ className }) => {
    return (
        <FaFileInvoice className={`text-pink-600 text-2xl ${className}`} />
    );
};

export const WhatsappIcon = ({ className }) => {
    return (
        <IoLogoWhatsapp className={`text-green-600 text-base ${className}`} />
    );
};
