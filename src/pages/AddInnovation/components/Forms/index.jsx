import React from 'react'
import {
    Description,
    BenefitImpact,
    Context,
    Evidence,
    IntellectualProperty,
    Interventions,
    Investment,
    Readiness,
    Stakeholders
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
            return <Context/>
        case 3:
            return <Evidence/>
        case 4:
            return <IntellectualProperty/>
        case 5:
            return <Interventions/>
        case 6:
            return <Investment/>
        case 7:
            return <Readiness/>
        case 8:
            return <Stakeholders/>
        default:
            return <Description/>
    }
}

export default Forms
