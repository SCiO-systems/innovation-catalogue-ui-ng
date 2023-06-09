import React, {useEffect, useState} from 'react'
import {Tooltip} from "primereact/tooltip";
import {InputText} from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import ReactHtmlParser from "react-html-parser";
import './styles.css'
import {useSelector} from "react-redux";

const Text = (props) => {

    const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

    const viewing = useSelector((state) => state.viewing)

    const [displayDialog, setDisplayDialog] = useState(false)
    const [value, setValue] = useState(presetValue)
    const [valid,setValid] = useState('no data')
    const [checked, setChecked] = useState(false);

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
            if (value.length > configuration.maxCharacters) {
                setValid('more than maximum')
                return
            }
            if (value.length >= configuration.minCharacters) {
                setValid('valid')
                return
            }
            if (value.length === 0) {
                setValid('no data')
                return
            }
            if (value.length < configuration.minCharacters) {
                setValid('less than minimum')
                return
            }

            if (configuration.minWords) {
                if (value.length > configuration.maxCharacters) {
                    setValid('more than maximum')
                    return
                }
                if (value.length >= configuration.minCharacters) {
                    setValid('valid')
                    return
                }
                if (value.length === 0) {
                    setValid('no data')
                    return
                }
                if (value.length < configuration.minCharacters) {
                    setValid('less than minimum')
                    return
                }
            }
            if (value.length === 0) {
                setValid('no data')
                return
            } else {
                setValid('valid')
                return
            }
        }, [value]
    )

    const renderQuesitonFooter = () => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={() => setDisplayDialog(false)} autoFocus />
            </div>
        );
    }

    return (
        <div className="field">
            <Tooltip target=".status"  position="top"/>
            <div className="p-inputgroup">
                <span className="p-float-label">
                    <InputText className={((valid != 'valid') && configuration.mandatory) ? "p-invalid p-d-block" : "p-valid p-d-block"}
                               disabled={viewing || (configuration.checkbox ? (configuration.disabled || !checked) : (configuration.disabled))}
                               value={value} onChange={(e) => setValue(e.target.value)}
                               placeholder={configuration.placeholder}
                    />
                </span>
                <span className="p-inputgroup-addon" id='question' onClick={() => setDisplayDialog(true)}><i className="fad fa-question"/></span>
            </div>
            <Dialog header={configuration.label} visible={displayDialog} style={{ width: '50vw' }} footer={renderQuesitonFooter('displayBasic')} onHide={() => setDisplayDialog(false)} >
                {ReactHtmlParser(configuration.fieldInformation)}
            </Dialog>
        </div>
    )
}

export default Text
