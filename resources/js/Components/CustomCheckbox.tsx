import React from 'react'

interface CheckboxProps {
    id: string
    label: string
    checked?: boolean
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    className?: string
}

const CustomCheckbox: React.FC<CheckboxProps> = ({
    id,
    label,
    checked = false,
    onChange,
    disabled = false,
    className = '',
}) => {
    return (
        <div className={`flex ${className}`}>
            <input
                type="checkbox"
                className="mt-0.5 shrink-0 rounded-sm border-gray-200 text-blue-600 checked:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                id={id}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <label htmlFor={id} className="ms-3 text-sm text-gray-500">
                {label}
            </label>
        </div>
    )
}

export default CustomCheckbox

// Usage example
// <CustomCheckbox id="hs-default-checkbox" label="Default checkbox" />
