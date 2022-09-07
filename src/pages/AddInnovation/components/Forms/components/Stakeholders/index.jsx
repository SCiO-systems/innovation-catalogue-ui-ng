import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../../../reducer/actions";
import configurationArray from './configuration'
import Field from '../../../../../../components/Field'

const Stakeholders = () => {

    const dispatch = useDispatch();

    const stakeholdersValues = useSelector((state) => state.stakeholdersValues)
    const setStakeholdersValues = (payload) => dispatch({ type: Actions.SetStakeholdersValues, payload });

    useEffect(
        () => {
            const storage = window.localStorage.getItem('stakeholdersValues')
            if (!storage || (storage === "[]")) {
                const temp = []
                configurationArray.map(tab => {
                    return tab.content.map(item => {
                        temp.push({
                            id: item.id,
                            value: '',
                            mandatory: item.mandatory,
                            valid: item.valid,
                        })
                    })
                })
                setStakeholdersValues(temp)
                window.localStorage.setItem('stakeholdersValues', JSON.stringify(temp))
            } else {
                setStakeholdersValues(JSON.parse(storage))
            }
        }, []
    )

    const emptyField = (type) => {
        switch (type) {
            case 'accordion': return [];
            case 'calendar': return '';
            case 'innovations autocomplete': return [];
            case 'inputs': return [];
            case 'keywords': return [];
            case 'list': return [];
            case 'number': return 0;
            case 'autocomplete organizations': return []; // ?
            case 'text': return '';
            case 'text area': return '';
            case 'upload': return []; // ?
            case 'autocomplete users': return []; // ?
            default: return '';
        }
    }

    const presetValues = (headerIndex, contentIndex, type) => {
        if (stakeholdersValues.length === 0) {
            return emptyField(type)
        } else {
            const temp = stakeholdersValues.find(item => item.id === contentIndex).value
            if (temp) {
                return temp
            }else {
                return emptyField(type)
            }
        }
    }

    const renderFields = () => {
        return configurationArray[0].content.map(field => {
            return (
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>{field.label}</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <Field configuration={field} presetValue={presetValues(0,field.id, field.type)} stepValues={stakeholdersValues} stepSetValues={setStakeholdersValues} keyName={'stakeholdersValues'}/>
                    </div>
                </div>
            )
        })
    }

    return renderFields()
}

export default Stakeholders
