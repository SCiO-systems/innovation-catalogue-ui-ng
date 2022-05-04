import React, {useEffect, useState} from 'react'
import {Tooltip} from "primereact/tooltip";
import { AutoComplete } from 'primereact/autocomplete';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import AutocompleteService from '../../../../services/httpService/autocomplete'
import './styles.css'
import ReactHtmlParser from "react-html-parser";
import {useSelector} from "react-redux";

const AutocompleteUsers = (props) => {

    const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

    const viewing = useSelector((state) => state.viewing)

    const [displayDialog, setDisplayDialog] = useState(false)
    const [value, setValue] = useState(presetValue)
    const [filteredKeywords, setFilteredKeywords] = useState([]);

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
        let input = {
                id: id,
                value: '',
            }
        setValue([...value,input])
    }

    const searchKeyword = (event) => {
        if (!event.query.trim().length) {
            setFilteredKeywords([]);
        }
        else {
            AutocompleteService.autocompleteUsers(event.query.toLowerCase())
                .then(res => {
                    setFilteredKeywords(res.autocomplete_suggestions)
                })
        }
    }

    const itemTemplate = (item) => {
        return (
            <div className='user-autocomplete-item'>
                <img src={item.photo} alt='photo' />
                <h4>{item.name}</h4>
            </div>
        )
    }

    const renderFields = () => {

        const removeInput = (e) => {
            setValue(value.filter(item => item.id !== e.target.id))
        }

        const handleInput1 = (input,item) => {
            const _value = value.filter(it => it.id !== item.id)
            _value.push({id:item.id,value:[input,item.value[0]]})
            setValue(_value)
        }

        if (value !== '') {
            return value.map(item => {
                return (
                    <>
                        <div className="p-inputgroup">
                        <span className="p-float-label">
                            <AutoComplete
                                value={value.find(val => item.id === val.id).value[0]}
                                suggestions={filteredKeywords}
                                completeMethod={searchKeyword}
                                onChange={(e) => handleInput1(e.target.value, item)}
                                autoHighlight
                                multiple={configuration.multiple}
                                disabled={configuration.disabled || viewing}
                                itemTemplate={itemTemplate}
                                field="name"
                            />
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

export default AutocompleteUsers
