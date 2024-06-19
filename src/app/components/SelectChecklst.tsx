import React from 'react';
import type { SelectProps } from 'antd';
import { Select, Space } from 'antd';


type TProps = {
    placeholder: string
    handleChange: (value: string[]) => void;
    options: { value: string; label: string }[];
    value: string[];
    isMulti?: boolean; // 
}


// const handleChange = (value: string[]) => {
//     console.log(`selected ${value}`);
// };

// const options: SelectProps['options'] = [
//     {
//         label: 'China',
//         value: 'china',
//         emoji: '🇨🇳',
//         desc: 'China (中国)',
//     },
//     {
//         label: 'USA',
//         value: 'usa',
//         emoji: '🇺🇸',
//         desc: 'USA (美国)',
//     },
//     {
//         label: 'Japan',
//         value: 'japan',
//         emoji: '🇯🇵',
//         desc: 'Japan (日本)',
//     },
//     {
//         label: 'Korea',
//         value: 'korea',
//         emoji: '🇰🇷',
//         desc: 'Korea (韩国)',
//     },
// ];

const SelectChecklist = ({ placeholder, handleChange, options, value }: TProps) => (
    <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder={placeholder}
        onChange={handleChange}
        options={options}
        optionRender={(option) => (
            <Space>
                {/* <span role="img" aria-label={option.data.label}>
                    {option.data.emoji}
                </span> */}
                {option}
            </Space>
        )}
    />
);

export default SelectChecklist;