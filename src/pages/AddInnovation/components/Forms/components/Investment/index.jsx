import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../../../reducer/actions";
import configurationArray from './configuration'
import Field from '../../../../../../components/Field'

const Investment = () => {

    const dispatch = useDispatch();

    const investmentValues = useSelector((state) => state.investmentValues)
    const setInvestmentValues = (payload) => dispatch({ type: Actions.SetInvestmentValues, payload });

    useEffect(
        () => {
            const storage = window.localStorage.getItem('investmentValues')
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
                setInvestmentValues(temp)
                window.localStorage.setItem('investmentValues', JSON.stringify(temp))
            } else {
                setInvestmentValues(JSON.parse(storage))
            }
        }, []
    )
    //
    // const presetValues = (headerIndex, contentIndex) => {
    //     if (investmentValues.length === 0) {
    //         return ''
    //     } else {
    //         return investmentValues.find(item => item.id === configurationArray[headerIndex].content[contentIndex].id).value
    //     }
    // }

    const presetValues = (headerIndex, contentIndex) => {
        if (investmentValues.length === 0) {
            return ''
        } else {
            const temp = investmentValues.find(item => item.id === contentIndex).value
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
                        <Field configuration={field} presetValue={presetValues(0,field.id)} stepValues={investmentValues} stepSetValues={setInvestmentValues} keyName={'investmentValues'}/>
                    </div>
                </div>
            )
        })
    }

    return renderFields()
}

export default Investment
