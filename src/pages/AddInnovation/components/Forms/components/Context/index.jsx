import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../../../reducer/actions";
import configurationArray from './configuration'
import Field from '../../../../../../components/Field'

const Context = () => {

    const dispatch = useDispatch();

    const contextValues = useSelector((state) => state.contextValues)
    const setContextValues = (payload) => dispatch({ type: Actions.SetContextValues, payload });

    useEffect(
        () => {
            const storage = window.localStorage.getItem('contextValues')
            if (!storage) {
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
                setContextValues(temp)
                window.localStorage.setItem('contextValues', JSON.stringify(temp))
            } else {
                setContextValues(JSON.parse(storage))
            }
        }, []
    )

    const presetValues = (headerIndex, contentIndex) => {
        if (contextValues.length === 0) {
            return ''
        } else {
            return contextValues.find(item => item.id === contentIndex).value
        }
    }

    const renderFields = () => {
        return configurationArray[0].content.map((field) => {
            return (
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>{field.label}</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <Field configuration={field} presetValue={presetValues(0,field.id)} stepValues={contextValues} stepSetValues={setContextValues} keyName={'contextValues'}/>
                    </div>
                </div>
            )
        })
    }

    return renderFields()
}

export default Context
