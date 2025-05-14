import React from 'react'

interface Column {
    name: string
    selector?: (item: never) => React.ReactNode
    cell?: (item: never) => React.ReactNode
}

interface TableProps {
    data: never[]
    columns: Column[]
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="inline-block min-w-full p-1.5 align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    {columns.map((column, index) => (
                                        <th
                                            scope="col"
                                            key={index}
                                            className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500"
                                        >
                                            {column.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        {columns.map((column, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className="whitespace-nowrap px-6 py-4 text-sm text-gray-800"
                                            >
                                                {column.selector
                                                    ? column.selector(item)
                                                    : column.cell?.(item)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
