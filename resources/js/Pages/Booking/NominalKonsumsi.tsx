import TextInputWithPrefix from '@/Components/TextInputWithPrefix'
import { Foods } from '@/Pages/Booking/Create'
import { useEffect, useState } from 'react'

interface Props {
    foods: Foods
    guests: number
}

export default function NominalKonsumsi({ foods, guests }: Props) {
    const [total, setTotal] = useState<number>(0)
    const [consumption, setConsumption] = useState<{
        snack_siang: number
        makan_siang: number
        snack_sore: number
    }>({
        snack_siang: 0,
        makan_siang: 0,
        snack_sore: 0,
    })

    // fetch api consumption
    useEffect(() => {
        const fetchConsumption = async () => {
            try {
                const response = await fetch('/consumption')
                const data = await response.json()

                setConsumption({
                    snack_siang: data.consumptions.find(
                        (item: { name: string }) => item.name === 'Snack Siang',
                    ).price,
                    makan_siang: data.consumptions.find(
                        (item: { name: string }) => item.name === 'Makan Siang',
                    ).price,
                    snack_sore: data.consumptions.find(
                        (item: { name: string }) => item.name === 'Snack Sore',
                    ).price,
                })
            } catch (error) {
                console.error('Error fetching consumption data:', error)
            }
        }

        fetchConsumption()
    }, [])

    useEffect(() => {
        let portion = 0

        if (foods.snack_siang) {
            portion += consumption.snack_siang
        }

        if (foods.makan_siang) {
            portion += consumption.makan_siang
        }

        if (foods.snack_sore) {
            portion += consumption.snack_sore
        }

        setTotal(portion * guests)
    }, [foods, guests])

    return (
        <>
            <TextInputWithPrefix
                prefix={'Rp. '}
                readOnly={true}
                type={'text'}
                value={total}
            />
        </>
    )
}
