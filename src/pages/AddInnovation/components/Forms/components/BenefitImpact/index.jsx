import React, {useEffect,useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../../../reducer/actions";
import configurationArray from './configuration'
import Field from '../../../../../../components/Field'

const BenefitImpact = () => {

    const dispatch = useDispatch();

    const benefitImpactValues = useSelector((state) => state.benefitImpactValues)
    const setBenefitImpactValues = (payload) => dispatch({ type: Actions.SetBenefitImpactValues, payload });

    const [trick, setTrick] = useState(0)

    useEffect(
        () => {
            const storage = window.localStorage.getItem('benefitImpactValues')
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
                setBenefitImpactValues(temp)
                setTrick(trick + 1)
                window.localStorage.setItem('benefitImpactValues', JSON.stringify(temp))
            } else {
                setBenefitImpactValues(JSON.parse(storage))
            }
        }, [trick]
    )

    // const presetValues = (headerIndex, contentIndex) => {
    //     if (benefitImpactValues.length === 0) {
    //         return ''
    //     } else {
    //         return benefitImpactValues.find(item => item.id === configurationArray[headerIndex].content[contentIndex].id).value
    //     }
    // }

    const presetValues = (headerIndex, contentIndex) => {
        console.log(benefitImpactValues,contentIndex)
        if (benefitImpactValues.length === 0) {
            return ''
        } else {
            const temp = benefitImpactValues.find(item => item.id === contentIndex).value
            if (temp) {
                return temp
            }else {
                return ''
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
                        <Field configuration={field} presetValue={presetValues(0,field.id)} stepValues={benefitImpactValues} stepSetValues={setBenefitImpactValues} keyName={'benefitImpactValues'}/>
                    </div>
                </div>
            )
        })
    }

    return renderFields()
}

export default BenefitImpact
