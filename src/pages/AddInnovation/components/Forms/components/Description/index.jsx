import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../../../reducer/actions";
import configurationArray from './configuration'
import Field from '../../../../../../components/Field'

const Description = () => {

    const dispatch = useDispatch();

    const descriptionValues = useSelector((state) => state.descriptionValues)
    const setDescriptionValues = (payload) => dispatch({ type: Actions.SetDescriptionValues, payload });

    useEffect(
        () => {
            const storage = window.localStorage.getItem('descriptionValues')
            if (!storage) {
                console.log('hi')
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
                setDescriptionValues(temp)
                window.localStorage.setItem('descriptionValues', JSON.stringify(temp))
            } else {
                setDescriptionValues(JSON.parse(storage))
            }
        }, []
    )

    const presetValues = (headerIndex, contentIndex) => {
        if (descriptionValues.length === 0) {
            return ''
        } else {
            return descriptionValues.find(item => item.id === contentIndex).value
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
                        <Field configuration={field} presetValue={presetValues(0,field.id)} stepValues={descriptionValues} stepSetValues={setDescriptionValues} keyName={'descriptionValues'}/>
                    </div>
                </div>
            )
        })
    }

    return renderFields()
}

export default Description
