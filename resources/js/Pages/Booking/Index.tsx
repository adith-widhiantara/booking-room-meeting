import PrimaryButton from '@/Components/PrimaryButton'
import Table from '@/Components/Table'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

interface Props {
    bookings: never[]
}

export default function Index({ bookings }: Props) {
    const columns = [
        {
            name: 'ID',
            selector: (row: any) => row.id,
        },
        {
            name: 'Room Name',
            selector: (row: any) => row.room.name,
        },

        {
            name: 'Date',
            selector: (row: any) => row.date,
        },
        {
            name: 'Start',
            selector: (row: any) => row.start_time,
        },
        {
            name: 'End',
            selector: (row: any) => row.end_time,
        },
        {
            name: 'Status',
            selector: (row: any) => row.status,
        },
        {
            name: 'Number of Guests',
            selector: (row: any) => row.number_of_guests,
        },
        {
            name: 'Actions',
            cell: (row: any) => (
                <div className="flex space-x-2">
                    <Link href={route('booking-rooms.edit', row.id)}>
                        <PrimaryButton className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                            Edit
                        </PrimaryButton>
                    </Link>
                    <Link href={route('booking-rooms.show', row.id)}>
                        <PrimaryButton className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                            View
                        </PrimaryButton>
                    </Link>
                </div>
            ),
        },
    ]

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between px-4 py-2 text-lg font-semibold text-gray-900 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Booking Rooms
                    </h2>

                    <PrimaryButton className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                        <Link href={route('booking-rooms.create')}>
                            Create Booking
                        </Link>
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Booking Rooms" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Table data={bookings} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
