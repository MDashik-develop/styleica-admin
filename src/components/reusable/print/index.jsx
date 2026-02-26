import React from "react";
import { MdLocalPrintshop } from "react-icons/md";


const Print = ({
    value = "",
    className = "",
    btnText = "",
    onBeforePrint,
    onAfterPrint,
    useNewWindow = true,
}) => {

    const handlePrint = () => {

        if (onBeforePrint) {
            onBeforePrint();
        }

        const printContent = value
            ? document.getElementById(value)?.innerHTML
            : document.body.innerHTML;

        if (!printContent) {
            console.error("No content found to print!");
            return;
        }

        // 🟢 DEFAULT (your existing behavior)
        if (useNewWindow) {
            const printWindow = window.open("", "_blank");
            printWindow.document.open();
            printWindow.document.write(`
                <html>
                    <body>${printContent}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();

            setTimeout(() => {
                printWindow.print();
                printWindow.close();

                // ✅ SAFE callback after print
                if (onAfterPrint) {
                    setTimeout(onAfterPrint, 0);
                }
            }, 100);
        }
        // 🔵 Optional inline print (for future use)
        else {
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContents;

            if (onAfterPrint) {
                setTimeout(onAfterPrint, 0);
            }
        }
    };

    return (
        <button
            onClick={handlePrint}
            className={`text-primary flex items-center gap-1 ${className}`}
            title="Print"
        >
            <MdLocalPrintshop />
            {btnText && <span>{btnText}</span>}
        </button>
    );
};

export default Print;
