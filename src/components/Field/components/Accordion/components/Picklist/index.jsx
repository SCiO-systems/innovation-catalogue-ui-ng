import React, {useEffect, useState} from 'react'
import {PickList} from "primereact/picklist";

const Picklist = (props) => {

    const {sourceData,item,presetValue, stepValues, stepSetValues, keyName,configuration} = props

    const [source, setSource] = useState(sourceData)
    const [target, setTarget] = useState([]);

    const [value, setValue] = useState(presetValue)

    useEffect(
        () => {
            const temp = presetValue.find(it => it.source === item.source)
            if (temp) {
                setTarget(temp.value)
            }
            setValue(presetValue)
        }, [presetValue]
    )

    useEffect(
        () => {
            let _value = presetValue
            const index = _value.findIndex(tab => tab.source === item.source)
            if (index !== -1) _value.splice(index,1)
            _value.push({
                source: item.source,
                value: target
            })
            setValue([..._value])
        },[target]
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

    const onChange = (e) => {
        setSource(e.source);
        setTarget(e.target);
    }

    const itemTemplate = (data) => {
        return (
            <div className="product-item">
                <p>{data.title}</p>
            </div>
        );
    }

    return(
        <PickList source={source} target={target} itemTemplate={itemTemplate}
                  onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
    )
}

export default Picklist