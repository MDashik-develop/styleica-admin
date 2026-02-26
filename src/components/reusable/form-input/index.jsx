import React from "react";
import { Input, Select, Radio, Checkbox, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./index.css";

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const FormInput = ({
    label,
    type = "text",
    options = [],
    placeholder = "",
    defaultValue = "",
    Required = false,
    disabled = false,
    ...rest
}) => {
    const inputStyle = { width: "100%" };

    return (
        <div className="mb-1">
            {/* Label */}
            {label && (
                <label className="block mb-1 font-medium">
                    {label} {Required && <span className="text-red-500">*</span>}
                </label>
            )}

            {/* TEXT FIELD */}
            {type === "text" && <Input placeholder={placeholder} style={inputStyle} disabled={disabled} {...rest} />}

            {/* NUMBER */}
            {type === "number" && (
                <Input
                    type="number"
                    placeholder={placeholder}
                    disabled={disabled}
                    style={{ ...inputStyle, appearance: "none" }}
                    {...rest}
                />
            )}

            {/* TEXTAREA */}
            {type === "textarea" && (
                <TextArea rows={4} placeholder={placeholder} style={inputStyle} disabled={disabled} {...rest} />
            )}

            {/* SELECT */}
            {type === "select" && (
                <Select
                    showSearch
                    filterOption={(input, option) =>
                        option?.label?.toLowerCase().includes(input.toLowerCase())
                    }
                    placeholder={placeholder}
                    style={inputStyle}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    {...rest}
                >
                    {options.map(option => (
                        <Option key={option.value} value={option.value} label={option.label}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            )}

            {/* RADIO */}
            {type === "radio" && (
                <Radio.Group {...rest} disabled={disabled}>
                    {options.map(option => (
                        <Radio key={option.value} value={option.value}>
                            {option.label}
                        </Radio>
                    ))}
                </Radio.Group>
            )}

            {/* CHECKBOX */}
            {type === "checkbox" && <Checkbox {...rest} disabled={disabled}>{label}</Checkbox>}

            {/* DATE */}
            {type === "date" && <DatePicker style={inputStyle} {...rest} disabled={disabled} />}

            {/* DATETIME */}
            {type === "datepicker" && <DatePicker showTime style={inputStyle} {...rest} disabled={disabled} />}

            {/* DATE RANGE */}
            {type === "daterange" && <RangePicker style={inputStyle} {...rest} disabled={disabled} />}

            {/* EMAIL */}
            {type === "email" && (
                <Input type="email" placeholder={placeholder} style={inputStyle} {...rest} disabled={disabled} />
            )}

            {/* PASSWORD */}
            {type === "password" && (
                <Input.Password placeholder={placeholder} style={inputStyle} {...rest} disabled={disabled} />
            )}

            {/* IMAGE UPLOAD */}
            {type === "image" && (
                <Upload name={name} listType="picture" beforeUpload={() => false} {...rest} disabled={disabled}>
                    <Button icon={<UploadOutlined />} style={inputStyle}>
                        Upload Image
                    </Button>
                </Upload>
            )}

            {/* FILE UPLOAD */}
            {type === "file" && (
                <Upload name={name} beforeUpload={() => false} {...rest} disabled={disabled}>
                    <Button icon={<UploadOutlined />} style={inputStyle}>
                        Upload File
                    </Button>
                </Upload>
            )}

            {/* COLOR */}
            {type === "color" && (
                <Input
                    type="color"
                    defaultValue={defaultValue}
                    style={{ ...inputStyle, height: "40px" }}
                    {...rest}
                    disabled={disabled}
                />
            )}
        </div>
    );
};

export default FormInput;
