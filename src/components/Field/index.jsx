import React from 'react'
import {Text, TextArea,List,Number,CalendarInput, Keywords, AccordionTabs,Upload,Inputs,AutocompleteUsers} from './components'
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
        case 'number':
            return <Number configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        case 'calendar':
            return <CalendarInput configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        case 'keywords':
            return <Keywords configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        case 'accordion':
            return <AccordionTabs configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        case 'upload':
            return <Upload configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        case 'inputs':
            return <Inputs configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        case 'autocomplete users':
            return <AutocompleteUsers configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
        default:
            return <Text configuration={configuration} presetValue={presetValue} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName}/>
    }
}

export default Field
