import React, {useEffect, useState} from 'react'
import {Tooltip} from "primereact/tooltip";
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './styles.css'
import ReactHtmlParser from "react-html-parser";
import {useSelector} from "react-redux";

const CalendarInput = (props) => {

    const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

    const viewing = useSelector((state) => state.viewing)

    const parseDate = (input) => {
        const date = new Date(Date.parse(input))
        return date
    }

    const [displayDialog, setDisplayDialog] = useState(false)
    const [value, setValue] = useState(parseDate(presetValue))
    const [valid,setValid] = useState('no data')

    useEffect(
        () => {
            if (presetValue !== '') {
                setValue(parseDate(presetValue))
            }
        }, [presetValue]
    )

    useEffect(
        () => {
            if (stepValues.length) {
                if (valid === 'valid') {
                    stepValues.find(item => item.id === configuration.id).valid = true
                } else {
                    stepValues.find(item => item.id === configuration.id).valid = false
                }
            }
        }, [valid]
    )

    useEffect(
        () => {
            if (stepValues.length === 0) return
            if (!(value instanceof Date)) return
            const _values = stepValues
            const index = _values.indexOf(_values.find(item => item.id === configuration.id))
            const validValue = stepValues.find(item => item.id === configuration.id).valid
            _values.splice(index, 1)
            _values.push({
                id: configuration.id,
                value: value.toString(),
                mandatory: configuration.mandatory,
                valid: validValue,
            })
            stepSetValues(_values)
            window.localStorage.setItem(keyName, JSON.stringify(_values))
        }, [value,valid]
    )

    const renderQuesitonFooter = () => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={() => setDisplayDialog(false)} autoFocus />
            </div>
        );
    }

    useEffect(
        () => {
            if (value instanceof Date) {
                setValid('valid')
                return
            } else {
                setValid('no data')
                return
            }
        }, [value]
    )

    return (
        <div className="field">
            <Tooltip target=".status"  position="top"/>
            <div className="p-inputgroup calendar">
                <span className="p-float-label">
                <Calendar className={((valid !== 'valid') && configuration.mandatory) ? "p-invalid p-d-block" : "p-d-block"} disabled={configuration.disabled || viewing}  selectionMode={configuration.selectionMode} id="icon" value={value} onChange={(e) => setValue(e.value)} showIcon />
            </span>
                <span className="p-inputgroup-addon" id='question' onClick={() => setDisplayDialog(true)}><i className="fad fa-question"/></span>
            </div>
            <Dialog header={configuration.label} visible={displayDialog} style={{ width: '50vw' }} footer={renderQuesitonFooter('displayBasic')} onHide={() => setDisplayDialog(false)} >
                {ReactHtmlParser(configuration.fieldInformation)}
            </Dialog>
        </div>
    )
}


export default CalendarInput
