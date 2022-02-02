import React from 'react'
import {
    Description,
} from './components'
import {useSelector} from "react-redux";



const Forms = () => {

    const step = useSelector((state) => state.step)

    switch (step) {
        case 0:
            return <Description/>
        default:
            return <Description/>
    }
}

export default Forms
