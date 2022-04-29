import React, {useEffect, useState} from 'react'
import {InputText} from "primereact/inputtext";

const MaterialTitle = (props) => {

    const {item,value,setValue} = props

    const [title, setTitle] = useState('')

    useEffect(
        () => {
            if (item.title !== '') {
                setTitle(item.title)
            }
        },[value]
    )

    useEffect(
        () => {
            const newItem = {
                type: item.type,
                title: title,
                name: item.name
            }
            const _value = value.filter(asset => asset.name !== item.name)
            setValue([..._value,newItem])
        },[title]
    )

    return (
        <InputText value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Reference Material Title'/>
    )
}

export default MaterialTitle
