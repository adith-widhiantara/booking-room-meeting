import CustomCheckbox from '@/Components/CustomCheckbox'
import { Foods } from '@/Pages/Booking/Create'
import React, { useEffect } from 'react'

interface Props {
    start_time: string
    end_time: string
    foods: Foods
    setFoods: React.Dispatch<React.SetStateAction<Foods>>
}

const MeetingFood = ({ start_time, end_time, foods, setFoods }: Props) => {
    useEffect(() => {
        // Extracting the start and end times from the 'data'
        const startTime = new Date(`1970-01-01T${start_time}:00`)
        const endTime = new Date(`1970-01-01T${end_time}:00`)

        // Define the boundaries for different food types
        const morningSnackTime = new Date('1970-01-01T11:00:00')
        const lunchTimeStart = new Date('1970-01-01T11:00:00')
        const lunchTimeEnd = new Date('1970-01-01T14:00:00')
        const afternoonSnackTime = new Date('1970-01-01T14:00:00')

        // Reset the foods state
        setFoods({
            snack_siang: false,
            makan_siang: false,
            snack_sore: false,
        })

        // Logic for determining what food is served
        if (startTime <= morningSnackTime && endTime >= morningSnackTime) {
            setFoods((prevState) => ({ ...prevState, snack_siang: true }))
        }
        if (startTime <= lunchTimeEnd && endTime >= lunchTimeStart) {
            setFoods((prevState) => ({ ...prevState, makan_siang: true }))
        }
        if (startTime <= afternoonSnackTime && endTime >= afternoonSnackTime) {
            setFoods((prevState) => ({ ...prevState, snack_sore: true }))
        }
    }, [start_time, end_time])

    return (
        <>
            <CustomCheckbox
                id={'snack-siang'}
                label={'Snack Siang'}
                checked={foods.snack_siang}
            />

            <CustomCheckbox
                id={'makan-siang'}
                label={'Makan Siang'}
                checked={foods.makan_siang}
            />

            <CustomCheckbox
                id={'snack-sore'}
                label={'Snack Sore'}
                checked={foods.snack_sore}
            />
        </>
    )
}

export default MeetingFood
