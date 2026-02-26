import React, { useState } from "react";
import { Table as AntTable } from "antd";
import "./index.css";
import TableFilters from "./filters";
import FileCopies from "./file-copies";
import SectionLoading from "../ui/section-loading";


const Table = ({
    tableName = "MyTable",
    rowKey = "id",
    className = "",
    headers,
    data,
    loading = false,
    onActionClick = () => { },
    showDataFilter = false,
    onShowDataChange,
    pagination = true,
    pageSize = 10,
    customRender = {},
    summary,
    enableSearch = true,
    searchPlaceholder = "Search here...",
    onSearchChange,
    showIndex = false,
    enableFilters = true,
    enableSelection = false,
    selectedRows = [],
    onSelectRows = () => { },
    ...rest
}) => {

    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [visibleColumns, setVisibleColumns] = useState(
        headers.map(h => ({ ...h, visible: true }))
    );

    // Checkbox selection handler
    const rowSelection = enableSelection
        ? {
            selectedRowKeys: selectedRows.map(row => row[rowKey]),
            onChange: (_, rows) => {
                onSelectRows(rows);
            },
        }
        : undefined;

    const indexColumn = showIndex
        ? {
            title: "#",
            key: "__index",
            align: "center",
            width: 70,
            render: (_, __, index) => index + 1,
        }
        : null;


    const tableColumns = [
        indexColumn,
        ...visibleColumns
            .filter(col => col.visible)        // show only visible columns
            .map(col => ({
                ...col,
                align: "center",
                render: customRender[col.key] || col.render, // Use custom render if provided
            })),
    ].filter(Boolean);


    return (
        <div className={`w-full ${className}`}>
            {enableFilters &&
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <FileCopies
                        columns={tableColumns}
                        data={data}
                        selectedRows={selectedRows}
                        fileName={tableName}
                    />
                    <div className="flex-1">
                        <TableFilters
                            columns={visibleColumns}
                            setColumns={setVisibleColumns}
                            selectedRows={selectedRows}
                            enableSearch={enableSearch}
                            showDataFilter={showDataFilter}
                            onShowDataChange={onShowDataChange}
                            onSearchChange={onSearchChange}
                            searchPlaceholder={searchPlaceholder}
                        />
                    </div>
                </div>
            }

            {
                loading ?
                    <SectionLoading />
                    :
                    <div
                        className="w-full overflow-x-auto scrollbar-hide"
                        style={{
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        <AntTable
                            rowSelection={enableSelection ? rowSelection : null}  // ✅ enables checkbox selection
                            columns={tableColumns}
                            dataSource={data}
                            pagination={false}
                            rowKey={rowKey}
                            bordered
                            size="middle"
                            summary={summary}
                            {...rest}
                            className={`font-primary pt-5 ${className}`}
                        />
                    </div>
            }

        </div >
    );
};


Table.Summary = AntTable.Summary;

export default Table;
