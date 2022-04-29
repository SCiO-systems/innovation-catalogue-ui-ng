import React, {useEffect, useState,useRef} from 'react'
import {Tooltip} from "primereact/tooltip";
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './styles.css'
import {useSelector} from "react-redux";
import ReactHtmlParser from "react-html-parser";
import UploadService from "../../../../services/httpService/upload";
import {InputText} from "primereact/inputtext";
import axios from 'axios'

const Upload = (props) => {

    const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

    const viewing = useSelector((state) => state.viewing)

    const fileUploadRef = useRef(null);

    const [displayDialog, setDisplayDialog] = useState(false)
    const [value, setValue] = useState(presetValue)
    const [fileUrl, setFileUrl] = useState()

    useEffect(
        () => {
            if (presetValue === '') {
                setValue([])
            } else {
                setValue(presetValue)
            }
        }, [presetValue]
    )

    useEffect(
        () => {
            console.log(value)
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

            UploadService.upload(formdata)
                .then(res =>  {
                    let item
                    console.log(res.mimetype)
                    if (res.mimetype.split('/')[0] === 'image') {
                        item = {
                            type: 'image',
                            name: res.filename
                        }
                    } else {
                        item = {
                            type: 'file',
                            name: res.filename
                        }
                    }
                    setValue([...value,item])
                    event.options.clear()
                })
        })
    }

    const downloadFile = (item) => {
            axios.get(`${process.env.REACT_APP_RELAY_URL}/static/${item.name}`, {
                responseType: 'blob'
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(
                    new Blob([blob.data]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    item.name,
                );
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
    }

    const renderImages = () => {
        if (value instanceof Array) {
            return value.map(item => {
                if (item.type === 'image') {
                    return (
                        <div className='uploaded-image'>
                            <img src={`${process.env.REACT_APP_RELAY_URL}/static/${item.name}`} alt={'logo'} />
                            <Button icon='fa-solid fa-x' onClick={() => setValue(value.filter(image => image.name !== item.name))} disabled={viewing}/>
                        </div>
                    )
                } else if (item.type === 'url') {
                    return (
                        <div className='uploaded-file'>
                            <a href={item.name} target="_blank">
                                <p>{item.name}</p>
                            </a>
                            <Button icon='fa-solid fa-x' onClick={() => setValue(value.filter(image => image.name !== item.name))} disabled={viewing}/>
                        </div>
                    )
                } else {
                    return (
                        <div className='uploaded-file'>
                            <i className="fa-solid fa-file-arrow-down" onClick={() => downloadFile(item)}/>
                            <p>{item.name.split('(')[0]}</p>
                            <Button icon='fa-solid fa-x' onClick={() => setValue(value.filter(image => image.name !== item.name))} disabled={viewing}/>
                        </div>
                    )
                }

            })
        } else {
            return null
        }

    }

    return (
        <div className="field upload">
            <Tooltip target=".status"  position="top"/>
            <div className="p-inputgroup">
                <span className="p-float-label">
                    <FileUpload
                        ref={fileUploadRef}
                        customUpload
                        disabled={viewing || configuration.max === value.length}
                        uploadHandler={(event) => uploadFiles(event)}
                        className="image-innovation"
                        mode="basic"
                        url={`${process.env.REACT_APP_RELAY_URL}/rtb-refactored/api/upload`}
                        accept={configuration.files ? '*' : "image/*"}
                        maxFileSize={1000000}
                        auto
                        chooseLabel={configuration.files ? "Upload File" : "Upload Image"} />
                </span>
                <span className="p-inputgroup-addon" id='question' onClick={() => setDisplayDialog(true)}><i className="fad fa-question"/></span>
            </div>
            {
                configuration.url ?
                    <div className='input-url p-inputgroup'>
                        <InputText value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} placeholder='Paste file Url'/>
                        <Button label='Submit Url' onClick={() => setValue([...value, {type: 'url', name: fileUrl}])} disabled={viewing || configuration.max === value.length || !fileUrl}/>
                    </div> :
                    <></>
            }
            {renderImages()}
            <Dialog header={configuration.label} visible={displayDialog} style={{ width: '50vw' }} footer={renderQuesitonFooter('displayBasic')} onHide={() => setDisplayDialog(false)} >
                {ReactHtmlParser(configuration.fieldInformation)}
            </Dialog>
        </div>
    )
}

export default Upload
