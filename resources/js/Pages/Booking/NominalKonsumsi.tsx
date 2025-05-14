import TextInputWithPrefix from '@/Components/TextInputWithPrefix'
import { Foods } from '@/Pages/Booking/Create'
import { useEffect, useState } from 'react'

interface Props {
    foods: Foods
    guests: number
}

export default function NominalKonsumsi({ foods, guests }: Props) {
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        let portion = 0

        if (foods.snack_siang) {
            portion += 20000
        }

        if (foods.makan_siang) {
            portion += 30000
        }

        if (foods.snack_sore) {
            portion += 20000
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
