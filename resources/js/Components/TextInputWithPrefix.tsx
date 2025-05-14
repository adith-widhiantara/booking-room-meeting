import React from 'react'
import TextInput from './TextInput'

interface TextInputWithPrefixProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    prefix: string
    isFocused?: boolean
}

const TextInputWithPrefix: React.FC<TextInputWithPrefixProps> = ({
    prefix,
    ...props
}) => {
    return (
        <div className="flex items-center overflow-hidden rounded-md border">
            <span className="bg-gray-100 px-3 py-2 text-gray-600">
                {prefix}
            </span>
            <TextInput
                {...props}
                className="flex-1 rounded-none border-none focus:ring-0"
            />
        </div>
    )
}

export default TextInputWithPrefix
