import React from 'react';
import { Select } from 'antd';

type TProps = {
    placeholder: string
    handleChange: any;
    options: { value: string; label: string }[];
    value: string[];
    isMulti?: boolean; // 
}

const SelectComponent = ({ placeholder, handleChange, options, value }: TProps) => (
    <Select
        placeholder={placeholder}
        bordered={true}
        value={value}
        style={{
            display: "flex",
            alignItems: "center",
            outline: "none",
            width: "150px",
            border: `2px solid "#EAEBEB"`,
            borderRadius: "6px",
            marginLeft: "10px",
            color: "#929393",
        }}
        onChange={handleChange}
        options={options}
    />
);

export default SelectComponent;
