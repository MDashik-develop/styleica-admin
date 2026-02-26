import { Tag } from "antd";
import Table from "../../../../components/reusable/table";
import { WhatsappIcon } from "../../../../components/reusable/ui/common-icons";
import { Link } from "react-router-dom";
import CopyToClipboard from "../../../../components/reusable/copy-to-clipboard";
import CustomersFilter from "../../components/customers-filter";
import CustomerManageModal from "../../components/customer-manage-modal";
import { useDeleteCustomer, useGetAllCustomers } from "../../services/customerApi";
import { DeleteButton } from "../../../../components/reusable/ui/action-btns";
import toast from "react-hot-toast";
import { useState } from "react";
import Pagination from "../../../../components/reusable/pagination";
import MarkFraudModal from "../../components/mark-fraud-modal";


const AllCustomers = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [showData, setShowData] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [queryParams, setQueryParams] = useState({});
    const { data, isLoading } = useGetAllCustomers(currentPage, showData, searchQuery, queryParams);
    const deleteCustomerMutation = useDeleteCustomer();


    // Headers
    const headers = [
        {
            title: "Customer",
            dataIndex: "name",
            key: "name",
            render: (name, record) => (
                <Link to={`/customers/${record?.id}`} className="!text-primary font-semibold text-left flex justify-start">
                    {name}
                </Link>
            ),
        },
        {
            title: "Contact Info",
            key: "contact",
            render: (_, record) => (
                <div>
                    <div className="flex justify-center items-center gap-3">
                        <p className="">
                            {record?.phone}
                        </p>
                        <CopyToClipboard value={record.phone} />
                        <Link to={`https://wa.me/${record?.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"><WhatsappIcon /></Link>
                    </div>
                    {record?.email &&
                        <div className="flex justify-center items-center gap-1 mt-2">
                            <p className="text-gray-500 text-xs">{record?.email}</p>
                            <CopyToClipboard value={record?.email} />
                        </div>
                    }
                </div>
            ),
        },
        {
            title: "Address", dataIndex: "address", key: "address", render: (_, record) =>
                <div className="max-w-60 text-left">
                    <p><strong>Thana:</strong> {record?.thana}</p>
                    <p><strong>District:</strong> {record?.district}</p>
                    <p><strong>Address:</strong> {record?.address}</p>
                </div>
        },
        {
            title: "Label", dataIndex: "label", key: "label",
        },
        {
            title: "Note", dataIndex: "note", key: "note", render: (note) =>
                <p className="max-w-60 text-left">{note}</p>
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (type) => {
                const colors = {
                    New: "cyan",
                    Good: "blue",
                    Excellent: "gold",
                    Risky: "pink",
                    Fraud: "red",
                };
                return <Tag color={colors[type]} className="uppercase">{type}</Tag>;
            },
        },
        {
            title: "Actions",
            render: (_, record) => (
                <div className="flex justify-end items-center gap-3">
                    {/* <EditButton
                        onClick={() => {
                            setEditData(record);
                            setOpenModal(true);
                        }}
                    /> */}

                    {record?.type != "Fraud" &&
                        <MarkFraudModal data={record} />
                    }

                    <DeleteButton onClick={() => handleDeleteCustomer(record?.id)} />
                </div>
            )
        }
    ];

    // delete customer fn
    const handleDeleteCustomer = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteCustomerMutation.mutate(id, {
                onSuccess: (res) => {
                    toast.success(res?.message || "User deleted successfully!")
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed!")
                },
            });
        }
    };


    return (
        <>

            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="title !pb-0">Customers</h2>
                <div className="flex items-center gap-4">
                    {/* Customer Modal */}
                    <CustomerManageModal />
                </div>
            </div>

            {/* Filters */}
            <CustomersFilter
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                setCurrentPage={setCurrentPage}
            />

            {/* Table */}
            <Table
                loading={isLoading}
                headers={headers}
                data={data?.data}
                showIndex={true}
                showDataFilter={true}
                onShowDataChange={(value) => {
                    setShowData(Number(value));
                    setCurrentPage(1);
                }}
                onSearchChange={(value) => {
                    setSearchQuery(value);
                    setCurrentPage(1);
                }}
                searchPlaceholder="Ex: name, mobile.."
                onSelectRows={(rows) => console.log("Selected Customers:", rows)}
            />
            <Pagination
                paginationMeta={data}
                onPaginationChange={(page) => setCurrentPage(page)}
            />

        </>
    );
};

export default AllCustomers;
