import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../../../reducer/actions";
import configurationArray from './configuration'
import Field from '../../../../../../components/Field'

const Evidence = () => {

    const dispatch = useDispatch();

    const evidenceValues = useSelector((state) => state.evidenceValues)
    const setEvidenceValues = (payload) => dispatch({ type: Actions.SetEvidenceValues, payload });

    useEffect(
        () => {
            const storage = window.localStorage.getItem('evidenceValues')
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
                setEvidenceValues(temp)
                window.localStorage.setItem('evidenceValues', JSON.stringify(temp))
            } else {
                setEvidenceValues(JSON.parse(storage))
            }
        }, []
    )

    const presetValues = (headerIndex, contentIndex) => {
        if (evidenceValues.length === 0) {
            return ''
        } else {
            return evidenceValues.find(item => item.id === configurationArray[headerIndex].content[contentIndex].id).value
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
                        <Field configuration={field} presetValue={presetValues(0,configurationArray[0].content.indexOf(field))} stepValues={evidenceValues} stepSetValues={setEvidenceValues} keyName={'evidenceValues'}/>
                    </div>
                </div>
            )
        })
    }

    return renderFields()
}

export default Evidence
