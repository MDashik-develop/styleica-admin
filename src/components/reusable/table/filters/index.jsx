import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { VscSettings } from "react-icons/vsc";
import FormInput from "../../form-input";
import { Dropdown, Menu, Checkbox } from "antd";
import { tableDataLimit } from "../../../../utils/tableConstants";


const TableFilters = ({
    enableSearch,
    columns,
    setColumns,
    selectedRows,
    showDataFilter,
    onShowDataChange,
    onSearchChange,
    searchPlaceholder,
}) => {

    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const dataLimits = tableDataLimit();

    const toggleColumn = (index) => {
        const updated = [...columns];
        updated[index].visible = !updated[index].visible;
        setColumns(updated);
    };


    const handlePageSizeChange = (value) => {
        setPageSize(value);
        onShowDataChange?.(value);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearchChange?.(value);
    };

    const menuItems = [
        {
            key: "title",
            label: <p className="font-medium text-sm px-2">Select Columns</p>,
            disabled: true,
        },
        ...columns.map((col, index) => ({
            key: col.key,
            label: (
                <div
                    className="flex items-center gap-2 px-2 py-1 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleColumn(index);
                    }}
                >
                    <Checkbox checked={col.visible} />
                    {col.title}
                </div>
            ),
        })),
    ];


    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

            <div className="flex items-center gap-3">

                {/* <button className="button-outline !px-3 !py-1.5">
                    <LuRefreshCcw />
                </button> */}

                <Dropdown
                    trigger={["click"]}
                    menu={{ items: menuItems }}
                >
                    <button className="button-outline !py-1.5 flex items-center gap-2">
                        <VscSettings />
                        Filter Column
                    </button>
                </Dropdown>

                {showDataFilter && (
                    <div className="flex items-center gap-2 ">
                        <p>Show</p>
                        <FormInput
                            type="select"
                            name="pageSize"
                            options={dataLimits}
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="!mt-1 !w-16"
                        />
                    </div>
                )}


                {selectedRows?.length > 0 &&
                    <div className="px-3 py-0.5 bg-secondary">Row Selected:
                        <span className="font-bold text-lg"> {selectedRows?.length}</span>
                    </div>
                }
            </div>

            {enableSearch && (
                <div className="relative">
                    <span className="absolute z-10 left-[5px] top-[6px] text-dark text-xl opacity-60"><CiSearch /></span>
                    <FormInput
                        label=""
                        name="search"
                        type="text"
                        placeholder={searchPlaceholder || "Search..."}
                        className="!w-[250px] !pl-8"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            )}

        </div>
    );
};

export default TableFilters;
