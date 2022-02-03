import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../../../reducer/actions";
import configurationArray from './configuration'
import Field from '../../../../../../components/Field'

const BenefitImpact = () => {

    const dispatch = useDispatch();

    const benefitImpactValues = useSelector((state) => state.benefitImpactValues)
    const setBenefitImpactValues = (payload) => dispatch({ type: Actions.SetBenefitImpactValues, payload });

    useEffect(
        () => {
            const storage = window.localStorage.getItem('benefitImpactValues')
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
                setBenefitImpactValues(temp)
                window.localStorage.setItem('benefitImpactValues', JSON.stringify(temp))
            } else {
                setBenefitImpactValues(JSON.parse(storage))
            }
        }, []
    )

    const presetValues = (headerIndex, contentIndex) => {
        if (benefitImpactValues.length === 0) {
            return ''
        } else {
            return benefitImpactValues.find(item => item.id === configurationArray[headerIndex].content[contentIndex].id).value
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
                        <Field configuration={field} presetValue={presetValues(0,configurationArray[0].content.indexOf(field))} stepValues={benefitImpactValues} stepSetValues={setBenefitImpactValues} keyName={'benefitImpactValues'}/>
                    </div>
                </div>
            )
        })
    }

    return renderFields()
}

export default BenefitImpact