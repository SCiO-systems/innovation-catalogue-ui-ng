import React from 'react'
import {Text, TextArea,List} from './components'
import './styles.css'

const Field = (props) => {

    const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

    switch (configuration.type) {
        case 'text':
            return <Text configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        case 'text area':
            return <TextArea configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        case 'list':
            return <List configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        default:
            return <Text configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
    }
}

export default Field
