import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const FileCopies = ({ data: allData = [], selectedRows = [], columns = [], fileName = "table-data", className = "" }) => {

    const data =
        Array.isArray(selectedRows) && selectedRows.length > 0
            ? selectedRows
            : allData;

    // Safe error handler that doesn't break UI
    const handleError = (error, operation) => {
        console.error(`Error in ${operation}:`, error);
        // Use a non-blocking notification instead of alert
        if (window.toast) {
            window.toast.error(`Failed to ${operation}. Please try again.`);
        } else {
            alert(`Failed to ${operation}. Please try again.`);
        }
    };
    // Helper function to extract text from React element or value
    const extractTextFromReactElement = (element) => {
        if (!element) return "";

        // If it's a primitive value, return it
        if (typeof element === "string" || typeof element === "number" || typeof element === "boolean") {
            return String(element);
        }

        // If it's an array, extract text from each element
        if (Array.isArray(element)) {
            const texts = element.map(extractTextFromReactElement).filter(Boolean);
            return texts.join(" ").trim();
        }

        // If it's a React element, try to extract text from props
        if (element && typeof element === "object") {
            // Check if it's a React element (has type and props)
            if (element.type && element.props) {
                // For img elements, return src
                if (element.type === "img" || element.type === "Img" || element.type === "image") {
                    return element.props.src || element.props.alt || "";
                }

                // Extract from children - this is the key part
                if (element.props.children !== undefined && element.props.children !== null) {
                    const childrenText = extractTextFromReactElement(element.props.children);
                    if (childrenText) return childrenText.trim();
                }

                // For Tag components, try to get children
                if (element.type && (element.type.displayName === "Tag" || element.type.name === "Tag")) {
                    return extractTextFromReactElement(element.props.children) || "";
                }

                // For other elements, try to get text content from props
                if (element.props.text) return String(element.props.text);
                if (element.props.value !== undefined) return String(element.props.value);
            }

            // If it's a simple object with common properties
            if (element.name) return element.name;
            if (element.title) return element.title;
            if (element.label) return element.label;
            if (element.text) return element.text;
            if (element.value !== undefined) return String(element.value);
        }

        return "";
    };

    // Get the actual displayed value from a row based on column configuration
    const getColumnValue = (row, column, index) => {
        // Skip index columns
        if (column.key === "__index" || column.dataIndex === "__index") {
            return null;
        }

        // Skip action columns if they don't have dataIndex
        if (column.key === "actions" && !column.dataIndex) {
            return null;
        }

        let value = null;

        // If column has a render function, execute it to get the displayed value
        if (column.render && typeof column.render === "function") {
            try {
                // Ant Design render function signature: (value, record, index) => ReactNode
                // But some custom renders might use: (record) => ReactNode
                // Try both patterns
                let renderResult = null;

                // First try with dataIndex/key value
                const dataKey = column.dataIndex || column.key;
                const dataValue = dataKey ? (dataKey.includes(".")
                    ? dataKey.split(".").reduce((obj, key) => obj?.[key], row)
                    : row[dataKey]) : undefined;

                // Try standard Ant Design render signature: (value, record, index)
                if (dataValue !== undefined) {
                    renderResult = column.render(dataValue, row, index);
                } else {
                    // Try custom render signature: (record) or (row)
                    renderResult = column.render(row, row, index);
                }

                // Extract text from the render result
                if (renderResult !== null && renderResult !== undefined) {
                    // If render returns a primitive, use it directly
                    if (typeof renderResult === "string" || typeof renderResult === "number" || typeof renderResult === "boolean") {
                        value = String(renderResult);
                    } else {
                        // If it's a React element, extract text from it
                        value = extractTextFromReactElement(renderResult);

                        // If extraction failed or returned empty, try intelligent fallback based on column key
                        if (!value || value.trim() === "") {
                            // Try to extract data based on common patterns
                            if (column.key === "image" || column.title === "Image") {
                                value = row.media?.urls?.small || row.image || row.thumbnail || "";
                            } else if (column.key === "title" || column.title === "Title") {
                                value = row.name || row.title || "";
                            } else if (column.key === "category" || column.title === "Category") {
                                value = row.category?.name || "";
                            } else if (column.key === "brand" || column.title === "Brand") {
                                value = row.brand?.name || "";
                            } else if (column.key === "price" || column.title === "Price") {
                                if (row.has_variants == 1 && row.variants?.length) {
                                    value = row.variants[0].price || "";
                                } else {
                                    value = row.base_price || "";
                                }
                            } else if (column.key === "status" || column.title === "Status") {
                                value = row.status || "";
                            } else {
                                // Fallback to dataValue
                                value = dataValue;
                            }
                        }
                    }
                }
            } catch (error) {
                console.warn(`Error executing render function for column ${column.title}:`, error);
            }
        }

        // Fallback: If no render function or render didn't return a value, use dataIndex/key
        if (value === null || value === undefined || value === "") {
            const dataKey = column.dataIndex || column.key;
            if (dataKey) {
                // Handle nested keys like "customer.name"
                if (dataKey.includes(".")) {
                    const keys = dataKey.split(".");
                    value = keys.reduce((obj, key) => {
                        if (obj === null || obj === undefined) return null;
                        // Handle array indices like "variants[0].price"
                        if (key.includes("[") && key.includes("]")) {
                            const arrayKey = key.substring(0, key.indexOf("["));
                            const index = parseInt(key.substring(key.indexOf("[") + 1, key.indexOf("]")));
                            return obj[arrayKey]?.[index];
                        }
                        return obj[key];
                    }, row);
                } else {
                    value = row[dataKey];
                }
            }
        }

        // Format the value for export
        if (value === null || value === undefined) {
            return "";
        }

        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return String(value);
        }

        if (Array.isArray(value)) {
            if (value.length === 0) return "";
            return value.map(v => {
                if (typeof v === "object" && v !== null) {
                    return v.name || v.title || v.label || JSON.stringify(v);
                }
                return String(v);
            }).filter(Boolean).join(", ");
        }

        if (typeof value === "object") {
            // Try common object patterns
            if (value.name) return value.name;
            if (value.title) return value.title;
            if (value.label) return value.label;
            if (value.text) return value.text;
            if (value.url) return value.url;
            if (value.urls?.small) return value.urls.small;
            if (value.id) return String(value.id);
            // Last resort - return full JSON string
            return JSON.stringify(value);
        }

        return String(value);
    };

    // Helper function to check if a column is an image column
    const isImageColumn = (column) => {
        const key = (column.key || "").toLowerCase();
        const title = (column.title || "").toLowerCase();
        return key === "image" || title === "image" || key.includes("image") || title.includes("image");
    };

    // Helper function to get image URL from a row and column
    const getImageUrl = (row, column) => {
        // Try to get image URL from common patterns
        if (row.media?.urls?.small) return row.media.urls.small;
        if (row.media?.urls?.medium) return row.media.urls.medium;
        if (row.media?.urls?.large) return row.media.urls.large;
        if (row.media?.urls?.original) return row.media.urls.original;
        if (row.image) return row.image;
        if (row.thumbnail) return row.thumbnail;

        // Try dataIndex/key
        const dataKey = column.dataIndex || column.key;
        if (dataKey) {
            const value = dataKey.includes(".")
                ? dataKey.split(".").reduce((obj, key) => obj?.[key], row)
                : row[dataKey];
            if (value && typeof value === "string" && (value.startsWith("http") || value.startsWith("/"))) {
                return value;
            }
        }

        return null;
    };

    // Helper function to check if a string is an image URL
    const isImageUrl = (str) => {
        if (!str || typeof str !== "string") return false;
        const lower = str.toLowerCase();
        return lower.startsWith("http") && (
            lower.includes(".jpg") ||
            lower.includes(".jpeg") ||
            lower.includes(".png") ||
            lower.includes(".gif") ||
            lower.includes(".webp") ||
            lower.includes(".svg") ||
            lower.includes("image") ||
            lower.includes("/storage/") ||
            lower.includes("/media/")
        );
    };

    // Flatten nested objects for export
    const flattenData = (data, columns) => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return [];
        }

        // Filter out index and action-only columns
        const exportableColumns = columns.filter(col => {
            if (col.key === "__index") return false;
            if (col.key === "actions" && !col.dataIndex) return false;
            return col.title; // Must have a title
        });

        return data.map((row, rowIndex) => {
            const flatRow = {};

            exportableColumns.forEach(col => {
                const value = getColumnValue(row, col, rowIndex);
                // For image columns, try to get the image URL
                if (isImageColumn(col)) {
                    const imageUrl = getImageUrl(row, col);
                    flatRow[col.title] = imageUrl || value || "";
                } else {
                    flatRow[col.title] = value || "";
                }
            });

            return flatRow;
        });
    };

    // Export CSV
    const exportCSV = () => {
        try {
            const flatData = flattenData(data, columns);
            if (flatData.length === 0) {
                alert("No data available to export");
                return;
            }
            const worksheet = XLSX.utils.json_to_sheet(flatData);
            const csv = XLSX.utils.sheet_to_csv(worksheet);
            // Add BOM for UTF-8 to support Bangla and other Unicode characters
            const BOM = "\uFEFF";
            const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
            saveAs(blob, `${fileName}.csv`);
        } catch (error) {
            handleError(error, "export CSV");
        }
    };

    // Export Excel
    const exportExcel = () => {
        try {
            const flatData = flattenData(data, columns);
            if (flatData.length === 0) {
                alert("No data available to export");
                return;
            }
            const worksheet = XLSX.utils.json_to_sheet(flatData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
            saveAs(blob, `${fileName}.xlsx`);
        } catch (error) {
            handleError(error, "export Excel");
        }
    };

    // Helper function to load image as base64 with timeout
    const loadImageAsBase64 = (url, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            let timeoutId;

            img.onload = () => {
                clearTimeout(timeoutId);
                try {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    const base64 = canvas.toDataURL("image/jpeg", 0.8);
                    resolve(base64);
                } catch (e) {
                    reject(e);
                }
            };

            img.onerror = () => {
                clearTimeout(timeoutId);
                reject(new Error("Failed to load image"));
            };

            timeoutId = setTimeout(() => {
                reject(new Error("Image load timeout"));
            }, timeout);

            img.src = url;
        });
    };

    // Export PDF with Bangla/Unicode support
    const exportPDF = async () => {
        try {
            const flatData = flattenData(data, columns);
            if (flatData.length === 0) {
                alert("No data available to export");
                return;
            }

            const exportableColumns = columns.filter(col => {
                if (col.key === "__index") return false;
                if (col.key === "actions" && !col.dataIndex) return false;
                return col.title;
            });

            const doc = new jsPDF("l", "pt", "a4");
            const tableColumn = exportableColumns.map(c => c.title);

            // Find image column indices
            const imageColumnIndices = exportableColumns
                .map((col, idx) => isImageColumn(col) ? idx : -1)
                .filter(idx => idx !== -1);

            // Load images with error handling
            const imageDataMap = new Map();
            if (imageColumnIndices.length > 0) {
                const imagePromises = [];
                for (let rowIndex = 0; rowIndex < flatData.length; rowIndex++) {
                    for (const colIndex of imageColumnIndices) {
                        const col = exportableColumns[colIndex];
                        const value = flatData[rowIndex][col.title];
                        if (isImageUrl(value)) {
                            imagePromises.push(
                                loadImageAsBase64(value).then(
                                    base64 => imageDataMap.set(`${rowIndex}-${colIndex}`, base64),
                                    () => { } // Silently fail for images
                                )
                            );
                        }
                    }
                }
                await Promise.allSettled(imagePromises);
            }

            // Prepare table rows
            const tableRows = flatData.map((row, rowIndex) =>
                tableColumn.map((colTitle, colIndex) => {
                    const value = row[colTitle] ?? "";
                    const col = exportableColumns[colIndex];

                    if (isImageColumn(col) && isImageUrl(value)) {
                        const imageKey = `${rowIndex}-${colIndex}`;
                        if (imageDataMap.has(imageKey)) {
                            return { type: "image", data: imageDataMap.get(imageKey), url: value };
                        }
                    }
                    return String(value);
                })
            );

            // Store image positions
            const imagePositions = new Map();
            tableRows.forEach((row, rowIdx) => {
                row.forEach((cell, colIdx) => {
                    if (cell && typeof cell === "object" && cell.type === "image") {
                        imagePositions.set(`${rowIdx}-${colIdx}`, cell.data);
                    }
                });
            });

            // Prepare body data
            const bodyData = tableRows.map(row => row.map(cell => {
                if (cell && typeof cell === "object" && cell.type === "image") {
                    return "";
                }
                return cell;
            }));

            // Configure autoTable with better Unicode/Bangla support
            // Note: For full Bangla support, a custom font needs to be added to jsPDF
            // This configuration uses the best available Unicode support
            autoTable(doc, {
                head: [tableColumn],
                body: bodyData,
                theme: "grid",
                styles: {
                    fontSize: 8,
                    cellPadding: 3,
                    overflow: 'linebreak',
                    cellWidth: 'wrap',
                    font: 'helvetica',
                    fontStyle: 'normal',
                    halign: 'left',
                    valign: 'middle'
                },
                headStyles: { fillColor: [66, 139, 202], textColor: 255, fontStyle: "bold" },
                margin: { top: 20 },
                columnStyles: {},
                // Use didParseCell to ensure proper text encoding
                didParseCell: (data) => {
                    // Ensure text is properly encoded for Unicode
                    if (data.cell && data.cell.text) {
                        data.cell.text = String(data.cell.text);
                    }
                },
                didDrawCell: (data) => {
                    if (data.section === "body") {
                        const imageKey = `${data.row.index}-${data.column.index}`;
                        if (imagePositions.has(imageKey)) {
                            try {
                                const imgData = imagePositions.get(imageKey);
                                const imgWidth = 40;
                                const imgHeight = 40;
                                const x = data.cell.x + (data.cell.width - imgWidth) / 2;
                                const y = data.cell.y + (data.cell.height - imgHeight) / 2;
                                doc.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);
                            } catch (e) {
                                // Silently fail for image rendering
                            }
                        }
                    }
                }
            });

            doc.save(`${fileName}.pdf`);
        } catch (error) {
            handleError(error, "export PDF");
        }
    };

    const printTable = () => {
        try {
            const flatData = flattenData(data, columns);
            if (flatData.length === 0) {
                alert("No data available to print");
                return;
            }

            const exportableColumns = columns.filter(col => {
                if (col.key === "__index") return false;
                if (col.key === "actions" && !col.dataIndex) return false;
                return col.title;
            });

            const tableHeader = exportableColumns.map(c => `<th>${c.title}</th>`).join("");
            const tableRows = flatData.map(r => {
                const cells = exportableColumns.map(c => {
                    const value = r[c.title] ?? "";
                    if (isImageColumn(c) && isImageUrl(value)) {
                        return `<td><img src="${value.replace(/"/g, "&quot;")}" alt="Image" style="max-width: 80px; max-height: 80px; object-fit: contain;" /></td>`;
                    }
                    const escapedValue = String(value)
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;");
                    return `<td>${escapedValue}</td>`;
                });
                return `<tr>${cells.join("")}</tr>`;
            }).join("");

            const styles = Array.from(document.querySelectorAll("style, link[rel='stylesheet']"))
                .map(node => node.outerHTML)
                .join("\n");

            const printWindow = window.open("", "_blank");
            if (!printWindow) {
                alert("Please allow popups for this website.");
                return;
            }

            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Print ${fileName}</title>
                    <meta charset="utf-8">
                    ${styles}
                    <style>
                        @media print { @page { margin: 1cm; } }
                        body { padding: 20px; font-family: Arial, sans-serif; font-size: 12px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; word-wrap: break-word; white-space: normal; }
                        td img { display: block; margin: 0 auto; }
                        th { background-color: #428bca; color: white; font-weight: bold; }
                        tr:nth-child(even) { background-color: #f9f9f9; }
                        tr:hover { background-color: #f5f5f5; }
                    </style>
                </head>
                <body>
                    <h2>${fileName}</h2>
                    <table>
                        <thead><tr>${tableHeader}</tr></thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </body>
                </html>
            `);
            printWindow.document.close();

            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
                setTimeout(() => printWindow.close(), 1000);
            }, 250);
        } catch (error) {
            handleError(error, "print table");
        }
    };



    return (
        <div className={`${className} flex items-center gap-x-1`}>
            <button className="button !bg-green-600" onClick={exportCSV}>CSV</button>
            <button className="button !bg-pink-600" onClick={exportExcel}>Excel</button>
            <button className="button !bg-yellow-600" onClick={exportPDF}>PDF</button>
            <button className="button !bg-sky-600" onClick={printTable}>Print</button>
        </div>
    );
};

export default FileCopies;
