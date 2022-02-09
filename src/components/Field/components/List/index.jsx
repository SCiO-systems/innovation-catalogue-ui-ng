import React, {useEffect, useState} from 'react'
import {Tooltip} from "primereact/tooltip";
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import './styles.css'
import {useSelector} from "react-redux";
import ReactHtmlParser from "react-html-parser";

const List = (props) => {

    const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

    const results = useSelector((state) => state.results)

    const [options, setOptions] = useState([])

    const [displayDialog, setDisplayDialog] = useState(false)
    let [value, setValue] = useState(presetValue)
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
            if (results.data) {
                if (configuration.resultsKeyword) {
                    setOptions(results.data.summaries[configuration.resultsKeyword].map(item => {
                        return {"value": item.value}
                    }))
                } else {
                    setOptions(configuration.options.map(item => {
                        return {"value": item}
                    }))
                }
            }
        }, [results]
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
            if (configuration.minWords) {
                if (value.length > configuration.maxWords) {
                    setValid('more than maximum')
                    return
                }
                if (value.length >= configuration.minWords) {
                    setValid('valid')
                    return
                }
                if (value.length === 0) {
                    setValid('no data')
                    return
                }
                if (value.length < configuration.minWords) {
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

    return (
        <div className="field">
            <Tooltip target=".status"  position="top"/>
            <div className="p-inputgroup">
                <span className="p-float-label">
                    {configuration.maxWords === 1 ?
                        <Dropdown
                            className={((valid === 'no data') && configuration.mandatory) ? "p-invalid p-d-block" : "p-d-block"}
                            value={value}
                            onChange={(e) => setValue(e.value)}
                            options={options}
                            maxSelectedLabels={configuration.maxWords}
                            disabled={configuration.disabled}
                            filter={configuration.filter}
                            optionLabel="value"
                        />
                        : <MultiSelect
                            className={((valid != 'valid') && configuration.mandatory) ? "p-invalid p-d-block" : "p-d-block"}
                            value={value}
                            onChange={(e) => setValue(e.value)}
                            options={options}
                            maxSelectedLabels={configuration.maxWords}
                            disabled={configuration.disabled}
                            filter={configuration.filter}
                            optionLabel="value"
                        />}
                </span>
                <span className="p-inputgroup-addon" id='question' onClick={() => setDisplayDialog(true)}><i className="fad fa-question"/></span>
            </div>
            <div className='field-messages'>
                {configuration.minCharacters? <small className="p-d-block">{`Number of characters: ${value.length}/${configuration.maxCharacters}`}</small> : <></>}
            </div>
            <Dialog header={configuration.label} visible={displayDialog} style={{ width: '50vw' }} footer={renderQuesitonFooter('displayBasic')} onHide={() => setDisplayDialog(false)} >
                {ReactHtmlParser(configuration.fieldInformation)}
            </Dialog>
        </div>
    )
}

export default List
