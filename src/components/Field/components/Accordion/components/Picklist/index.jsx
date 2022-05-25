import React, {useEffect, useState} from 'react'
import {PickList} from "primereact/picklist";
import {useSelector} from "react-redux";

const Picklist = (props) => {

    const {sourceData,item,presetValue, stepValues, stepSetValues, keyName,configuration,index} = props

    const viewing = useSelector((state) => state.viewing)

    const [source, setSource] = useState(sourceData)
    const [target, setTarget] = useState([]);

    const [value, setValue] = useState(presetValue)

    useEffect(
        () => {
            const temp = presetValue.find(it => it.id === index)
            if (temp) {
                setTarget(temp.value)
                // setSource(temp.source)
                setSource(sourceData.filter(source => !temp.value.find(item => item.id === source.id)))
            }
            setValue(presetValue)
        }, [presetValue]
    )

    useEffect(
        () => {
            let _value = presetValue
            const indexTemp = _value.findIndex(tab => tab.id === index)
            if (indexTemp !== -1) _value.splice(indexTemp,1)
            _value.push({
                id: index,
                // source: source,
                value: target,
                title: item.title
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
                <p>{data.value}</p>
            </div>
        );
    }

    return(
        <PickList source={source} target={target} itemTemplate={itemTemplate}
                  onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected" disabled={viewing}/>
    )
}

export default Picklist
