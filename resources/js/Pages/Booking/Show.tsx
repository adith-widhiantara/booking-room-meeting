import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

interface Unit {
    name: string
}

interface Room {
    name: string
    unit: Unit
    capacity: number
}

interface Props {
    booking: {
        room: Room
        date: string
        start_time: string
        end_time: string
        number_of_guests: number
        total_price: number
        consumptions_data: string
    }
}

export default function Show({ booking }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between px-4 py-2 text-lg font-semibold text-gray-900 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {booking.room.name}
                    </h2>
                </div>
            }
        >
            <Head title={booking.room.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className={'mb-4 text-2xl'}>
                                Informasi Ruangan Meeting
                            </h3>

                            <div className={'grid grid-cols-3 gap-4'}>
                                <div>
                                    <div>
                                        <InputLabel
                                            htmlFor="unit"
                                            value="Unit"
                                        />

                                        <TextInput
                                            className="mt-1 block w-full"
                                            type="text"
                                            value={booking.room.unit.name}
                                            readOnly
                                        />
                                    </div>

                                    <div className={'mt-4'}>
                                        <InputLabel
                                            htmlFor="capacity"
                                            value="Capacity"
                                        />

                                        <TextInput
                                            className="mt-1 block w-full"
                                            type="text"
                                            value={booking.room.capacity}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="room" value="Room" />

                                    <TextInput
                                        className="mt-1 block w-full"
                                        type="text"
                                        value={booking.room.name}
                                        readOnly
                                    />
                                </div>

                                <div></div>
                            </div>

                            <hr className={'my-8 border-t border-gray-300'} />

                            <h3 className={'mb-4 text-2xl'}>Informasi Rapat</h3>

                            <div className={'grid grid-cols-3 gap-4'}>
                                <div>
                                    <div>
                                        <InputLabel
                                            htmlFor="date"
                                            value="Tanggal Rapat"
                                        />

                                        <TextInput
                                            className="mt-1 block w-full"
                                            type="text"
                                            value={booking.date}
                                            readOnly
                                        />
                                    </div>

                                    <div className={'mt-4'}>
                                        <InputLabel
                                            htmlFor="number_of_guests"
                                            value="Jumlah Peserta"
                                        />

                                        <TextInput
                                            className="mt-1 block w-full"
                                            type="text"
                                            value={booking.number_of_guests}
                                            readOnly
                                        />
                                    </div>

                                    <div className={'mt-4'}>
                                        <InputLabel
                                            htmlFor="foods"
                                            value="Jenis Makanan"
                                        />

                                        <TextInput
                                            className="mt-1 block w-full"
                                            type="text"
                                            value={booking.consumptions_data}
                                            readOnly
                                        />
                                    </div>

                                    <div className={'mt-4'}>
                                        <InputLabel
                                            htmlFor="nominal_konsumsi"
                                            value="Nominal Konsumsi"
                                        />

                                        <TextInput
                                            className="mt-1 block w-full"
                                            type="text"
                                            value={booking.total_price}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <InputLabel
                                            htmlFor="start_time"
                                            value="Waktu Mulai"
                                        />

                                        <TextInput
                                            className="mt-1 block w-full"
                                            type="text"
                                            value={booking.start_time}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <InputLabel
                                            htmlFor="end_time"
                                            value="Waktu Selesai"
                                        />

                                        <TextInput
                                            className="mt-1 block w-full"
                                            type="text"
                                            value={booking.end_time}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className={'my-8 border-t border-gray-300'} />

                            <div className="flex justify-end gap-4">
                                <Link
                                    href={route('booking.index')}
                                    className={
                                        'inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-semibold uppercase text-red-500 shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-25'
                                    }
                                >
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
