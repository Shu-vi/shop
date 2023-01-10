import React from 'react';

const Select = ({options, defaultValue, value, onChange, margin}) => {
    return (
        <select
            value={value}
            style={{margin}}
            onChange={onChange}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default Select;