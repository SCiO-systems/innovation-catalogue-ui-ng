import React, {useEffect, useState} from 'react'
import {Tooltip} from "primereact/tooltip";
import {InputText} from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './styles.css'
import ReactHtmlParser from "react-html-parser";

const Inputs = (props) => {

    const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

    const [displayDialog, setDisplayDialog] = useState(false)
    const [value, setValue] = useState(presetValue)

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
        }, [value]
    )

    const renderQuesitonFooter = () => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={() => setDisplayDialog(false)} autoFocus />
            </div>
        );
    }

    const addInputs = () => {
        const createId = () => {
            let id = '';
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 5; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }
        const id = createId()
        let input
        if (configuration.double) {
            input = {
                id: id,
                value: ['',''],
            }
        } else {
            input = {
                id: id,
                value: '',
            }
        }
        setValue([...value,input])
    }

    const renderFields = () => {

        const removeInput = (e) => {
            setValue(value.filter(item => item.id !== e.target.id))
        }

        const handleInput1 = (input,item) => {
            const _value = value.filter(it => it.id !== item.id)
            _value.push({id:item.id,value:[input,item.value[1]]})
            setValue(_value)
        }

        const handleInput2 = (input,item) => {
            if (configuration.double) {
                const _value = value.filter(it => it.id !== item.id)
                _value.push({id:item.id,value:[item.value[0],input]})
                setValue(_value)
            } else {
                const _value = value.filter(it => it.id !== item.id)
                _value.push({id:item.id,value:input})
                setValue(_value)
            }
        }

        if (value !== '') {
            return value.map(item => {
                return (
                    <>
                        <div className="p-inputgroup">
                        <span className="p-float-label">
                            <div className='inputs-container'>
                                {configuration.double ? <><InputText
                                    value={value.find(val => item.id === val.id).value[0]}
                                    className="input-size margin-right-7 input-width responsive-layout-input"
                                    onChange={(e) => handleInput1(e.target.value, item)}/><span
                                    className="dash">&#8212;</span></> : <></>}
                                <InputText value={configuration.double ? value.find(val => item.id === val.id).value[1]: value.find(val => item.id === val.id).value} id={'second'}
                                           className="input-size margin-right-7 input-width responsive-layout-input"
                                           onChange={(e) => handleInput2(e.target.value, item)}/>
                            </div>
                        </span>
                            <span className="p-inputgroup-addon" id='question' onClick={() => setDisplayDialog(true)}><i
                                className="fad fa-question"/></span>
                        </div>
                        <Button id={item.id} label="Remove" icon="fad fa-minus fa-lg"
                                className="p-mr-2 margin-left-5 add-button" onClick={(e) => removeInput(e)}/>
                    </>
                )
            })
        }
    }

    return (
        <div className="field">
            <Tooltip target=".status"  position="top"/>
            {renderFields()}
            <Button label="Add" icon="fad fa-plus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={addInputs}/>
            <Dialog header={configuration.label} visible={displayDialog} style={{ width: '50vw' }} footer={renderQuesitonFooter('displayBasic')} onHide={() => setDisplayDialog(false)} >
                {ReactHtmlParser(configuration.fieldInformation)}
            </Dialog>
        </div>
    )
}

export default Inputs
