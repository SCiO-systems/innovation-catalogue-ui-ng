import React, {useEffect, useState} from 'react'
import {Tooltip} from "primereact/tooltip";
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './styles.css'
import ReactHtmlParser from "react-html-parser";
import {useSelector} from "react-redux";

const Number = (props) => {

    const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

    const viewing = useSelector((state) => state.viewing)

    const [displayDialog, setDisplayDialog] = useState(false)
    const [value, setValue] = useState(presetValue)
    const [valid,setValid] = useState('no data')

    const renderQuesitonFooter = () => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={() => setDisplayDialog(false)} autoFocus />
            </div>
        );
    }
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
            setValue(presetValue)
        }, [presetValue]
    )

    useEffect(
        () => {
            if (stepValues.length === 0) return
            const _values = stepValues
            const index = _values.indexOf(_values.find(item => item.id === configuration.id))
            const validValue = stepValues.find(item => item.id === configuration.id).valid
            _values.splice(index, 1)
            _values.push({
                id: configuration.id,
                value: value,
                mandatory: configuration.mandatory,
                valid: validValue,
            })
            stepSetValues(_values)
            window.localStorage.setItem(keyName, JSON.stringify(_values))
        }, [value,valid]
    )

    useEffect(
        () => {
            if (value === '') {
                setValue(null)
            }
        },[]
    )

    useEffect(
        () => {
            if (value > configuration.maxNumber) {
                setValid('more than maximum')
                return
            }
            if (value >= configuration.minNumber) {
                setValid('valid')
                return
            }
            if (value < configuration.minNumber) {
                setValid('less than minimum')
                return
            }
            if (value === null) {
                setValid('no data')
                return
            } else {
                if (!configuration.minNumber) {
                    setValid('valid')
                    return
                }
            }
        }, [value]
    )

    return (
        <div className="field">
            <Tooltip target=".status"  position="top"/>
            <div className="p-inputgroup">
                <span className="p-float-label">
                    <InputNumber
                        className={((valid != 'valid') && configuration.mandatory) ? "p-invalid p-d-block" : "p-d-block"}
                        value={value}
                        onChange={(e) => setValue(e.value)}
                        mode="decimal"
                        showButtons={configuration.showButtons}
                        min={configuration.minNumber}
                        max={configuration.maxNumber}
                        suffix={configuration.suffix}
                        disabled={configuration.disabled || (viewing && (!configuration.sr)) || (!viewing && (configuration.sr))}
                    />
                    {/*<label htmlFor="username">{configuration.label}</label>*/}
                </span>
                {configuration.suffix ? <span className="p-inputgroup-addon" id='info' style={{textAlign: "center"}} ><p>{configuration.suffix}</p></span> : <></>}
                <span className="p-inputgroup-addon" id='question' onClick={() => setDisplayDialog(true)}><i className="fad fa-question"/></span>
            </div>
            {/*<div className='field-messages'>*/}
            {/*    /!*{renderValidationMessage(valid, configuration)}*!/*/}
            {/*    {configuration.minCharacters? <small className="p-d-block">{`Number of characters: ${value.length}/${configuration.maxCharacters}`}</small> : <></>}*/}
            {/*</div>*/}
            <Dialog header={configuration.label} visible={displayDialog} style={{ width: '50vw' }} footer={renderQuesitonFooter('displayBasic')} onHide={() => setDisplayDialog(false)} >
                {ReactHtmlParser(configuration.fieldInformation)}
            </Dialog>
        </div>
    )
}

export default Number
