import React from 'react';
import { Select } from 'antd';

type TProps = {
    placeholder: string
}

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};

const SelectComponent = ({ placeholder }: TProps) => (
    <Select
        showSearch
        placeholder={placeholder}
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options={[
            {
                value: 'jack',
                label: 'Jack',
            },
            {
                value: 'lucy',
                label: 'Lucy',
            },
            {
                value: 'tom',
                label: 'Tom',
            },
        ]}
    />
);

export default SelectComponent;