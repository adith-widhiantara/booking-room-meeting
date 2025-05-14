import React from 'react'

interface SelectProps {
    options: string[]
    defaultValue?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
    className?: string
    disabled?: boolean
}

const CustomSelect: React.FC<SelectProps> = ({
    options,
    defaultValue = 'Open this select menu',
    onChange,
    className = '',
    disabled = false,
}) => {
    return (
        <select
            className={`block w-full rounded-lg border-gray-200 px-4 py-3 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 ${className}`}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
        >
            <option disabled value="">
                {defaultValue}
            </option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default CustomSelect

// Usage example
// <CustomSelect options={['1', '2', '3']} />
