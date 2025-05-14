import CustomSelect from '@/Components/CustomSelect'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import MeetingFood from '@/Pages/Booking/MeetingFood'
import NominalKonsumsi from '@/Pages/Booking/NominalKonsumsi'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEventHandler, useEffect, useState } from 'react'

export interface Foods {
    snack_siang: boolean
    makan_siang: boolean
    snack_sore: boolean
}

interface Rooms {
    name: string
    capacity: number
}

interface Units {
    name: string
    rooms: Rooms[]
}

interface Props {
    units: Units[]
}

export default function Index({ units }: Props) {
    const [foods, setFoods] = useState<Foods>({
        snack_siang: false,
        makan_siang: false,
        snack_sore: false,
    })
    const { data, setData, post, processing, errors } = useForm({
        unit: '',
        room: '',
        date: '',
        start_time: '',
        end_time: '',
        number_of_guests: 0,
        foods: {
            snack_siang: foods.snack_siang,
            makan_siang: foods.makan_siang,
            snack_sore: foods.snack_sore,
        },
    })
    const [capacity, setCapacity] = useState<number | string>('')
    const [resetRoom, setResetRoom] = useState<number>(1)

    useEffect(() => {
        const selectedUnit = units.find((unit) => unit.name === data.unit)
        if (selectedUnit) {
            const selectedRoom = selectedUnit.rooms.find(
                (room) => room.name === data.room,
            )
            if (selectedRoom) {
                setCapacity(selectedRoom.capacity)
            } else {
                setCapacity('')
            }
        } else {
            setCapacity('')
        }
    }, [data.unit, data.room, units])

    useEffect(() => {
        setData('room', '')
        setResetRoom((prev) => prev + 1)
    }, [data.unit, setData])

    useEffect(() => {
        setData('foods', {
            snack_siang: foods.snack_siang,
            makan_siang: foods.makan_siang,
            snack_sore: foods.snack_sore,
        })
    }, [foods])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('booking-rooms.store'))
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between px-4 py-2 text-lg font-semibold text-gray-900 sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Create Booking
                    </h2>
                </div>
            }
        >
            <Head title="Booking Rooms" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
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

                                            <CustomSelect
                                                options={units.map(
                                                    (unit) => unit.name,
                                                )}
                                                defaultValue="Open this select unit"
                                                onChange={(e) =>
                                                    setData(
                                                        'unit',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full"
                                            />

                                            <InputError
                                                message={errors.unit}
                                                className="mt-2"
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
                                                value={capacity}
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="room"
                                            value="Room"
                                        />

                                        <CustomSelect
                                            key={resetRoom}
                                            options={
                                                units
                                                    .find(
                                                        (unit) =>
                                                            unit.name ===
                                                            data.unit,
                                                    )
                                                    ?.rooms.map(
                                                        (room) => room.name,
                                                    ) ?? []
                                            }
                                            defaultValue="Open this select room"
                                            onChange={(e) =>
                                                setData('room', e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                        />

                                        <InputError
                                            message={errors.room}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div></div>
                                </div>

                                <hr
                                    className={'my-8 border-t border-gray-300'}
                                />

                                <h3 className={'mb-4 text-2xl'}>
                                    Informasi Rapat
                                </h3>

                                <div className={'grid grid-cols-3 gap-4'}>
                                    <div>
                                        <div>
                                            <InputLabel
                                                htmlFor="date"
                                                value="Tanggal Rapat"
                                            />

                                            <TextInput
                                                id="date"
                                                className="mt-1 block w-full"
                                                type="date"
                                                name="date"
                                                onChange={(e) =>
                                                    setData(
                                                        'date',
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.date}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className={'mt-4'}>
                                            <InputLabel
                                                htmlFor="number_of_guests"
                                                value="Jumlah Peserta"
                                            />

                                            <TextInput
                                                id="number_of_guests"
                                                className="mt-1 block w-full"
                                                type="number"
                                                min={1}
                                                name="number_of_guests"
                                                onChange={(e) =>
                                                    setData(
                                                        'number_of_guests',
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={
                                                    errors.number_of_guests
                                                }
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className={'mt-4'}>
                                            <InputLabel
                                                htmlFor="foods"
                                                value="Jenis Makanan"
                                            />

                                            <div className={'mt-2'}>
                                                <MeetingFood
                                                    start_time={data.start_time}
                                                    end_time={data.end_time}
                                                    foods={foods}
                                                    setFoods={setFoods}
                                                />
                                            </div>
                                        </div>

                                        <div className={'mt-4'}>
                                            <InputLabel
                                                htmlFor="nominal_konsumsi"
                                                value="Nominal Konsumsi"
                                            />

                                            <div className={'mt-2'}>
                                                <NominalKonsumsi
                                                    foods={foods}
                                                    guests={
                                                        data.number_of_guests
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <InputLabel
                                                htmlFor="start_time"
                                                value="Waktu Mulai"
                                            />

                                            <TextInput
                                                id="start_time"
                                                className="mt-1 block w-full"
                                                type="time"
                                                name="start_time"
                                                onChange={(e) =>
                                                    setData(
                                                        'start_time',
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.start_time}
                                                className="mt-2"
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
                                                id="end_time"
                                                className="mt-1 block w-full"
                                                type="time"
                                                name="end_time"
                                                onChange={(e) =>
                                                    setData(
                                                        'end_time',
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.end_time}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr
                                    className={'my-8 border-t border-gray-300'}
                                />

                                <div className="flex justify-end gap-4">
                                    <Link
                                        href={route('booking-rooms.index')}
                                        className={
                                            'inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-semibold uppercase text-red-500 shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-25'
                                        }
                                    >
                                        Batal
                                    </Link>
                                    <PrimaryButton
                                        type="submit"
                                        className={
                                            'inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-25'
                                        }
                                    >
                                        Simpan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
