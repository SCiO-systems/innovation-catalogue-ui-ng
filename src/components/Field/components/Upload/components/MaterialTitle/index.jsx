import React, {useEffect, useState} from 'react'
import {InputText} from "primereact/inputtext";

const MaterialTitle = (props) => {

    const {item,value,setValue} = props

    const [title, setTitle] = useState(item.title)

    useEffect(
        () => {
            if (item.title !== '') {
                setTitle(item.title)
            }
        },[value]
    )

    useEffect(
        () => {
            const index = value.indexOf(value.find(asset => asset.name === item.name))
            value[index].title = title
            setValue([...value])

        },[title]
    )

    return (
        <InputText value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Reference Material Title'/>
    )
}

export default MaterialTitle
