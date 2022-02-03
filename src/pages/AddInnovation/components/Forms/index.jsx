import React from 'react'
import {
    Description,
    BenefitImpact
} from './components'
import {useSelector} from "react-redux";



const Forms = () => {

    const step = useSelector((state) => state.step)

    switch (step) {
        case 0:
            return <Description/>
        case 1:
            return <BenefitImpact/>
        case 2:
            return <Description/>
        case 3:
            return <Description/>
        case 4:
            return <Description/>
        case 5:
            return <Description/>
        case 6:
            return <Description/>
        case 7:
            return <Description/>
        case 8:
            return <Description/>
        default:
            return <Description/>
    }
}

export default Forms
