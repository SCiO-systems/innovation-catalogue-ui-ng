import React, {useEffect, useState,useRef} from 'react'
import {Tooltip} from "primereact/tooltip";
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './styles.css'
import {useSelector} from "react-redux";
import ReactHtmlParser from "react-html-parser";

const Upload = (props) => {

    const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

    const viewing = useSelector((state) => state.viewing)

    const csrfToken = useSelector((state) => state.csrfToken)

    const fileUploadRef = useRef(null);

    const [displayDialog, setDisplayDialog] = useState(false)
    const [value, setValue] = useState(presetValue)

    useEffect(
        () => {
            setValue(presetValue)
        }, [presetValue]
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

    const renderQuesitonFooter = () => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={() => setDisplayDialog(false)} autoFocus />
            </div>
        );
    }

    const uploadFiles = (event)=>{

        event.files.map(item => {

            var formdata = new FormData();
            formdata.append("file", item);

            fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                headers: {
                    // Accept: "application/json",
                    // "Content-Type": "application/json",
                    "xsrf-token": csrfToken,
                },
                body:formdata
            })
        })
    }

    return (
        <div className="field upload">
            <Tooltip target=".status"  position="top"/>
            <div className="p-inputgroup">
                <span className="p-float-label">
                    <FileUpload ref={fileUploadRef} customUpload disabled={viewing} uploadHandler={(event)=>uploadFiles(event)} className="image-innovation" mode="basic" name="demo[]" url="http://localhost:5000/api/upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload Image" />
                </span>
                <span className="p-inputgroup-addon" id='question' onClick={() => setDisplayDialog(true)}><i className="fad fa-question"/></span>
            </div>
            <Dialog header={configuration.label} visible={displayDialog} style={{ width: '50vw' }} footer={renderQuesitonFooter('displayBasic')} onHide={() => setDisplayDialog(false)} >
                {ReactHtmlParser(configuration.fieldInformation)}
            </Dialog>
        </div>
    )
}

export default Upload
