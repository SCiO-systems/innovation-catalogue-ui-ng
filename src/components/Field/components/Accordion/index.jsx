import React, {useEffect, useState} from 'react'
import {Tooltip} from "primereact/tooltip";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import {Picklist} from './components'
import './styles.css'
import {Accordion, AccordionTab} from "primereact/accordion";
import {useSelector} from "react-redux";
import ReactHtmlParser from "react-html-parser";

const AccordionTabs = (props) => {

    const {configuration, stepValues, stepSetValues, keyName} = props

    let {presetValue} = props

    const viewing = useSelector((state) => state.viewing)

    const results = useSelector((state) => state.results)

    const [displayDialog, setDisplayDialog] = useState(false)

    useEffect(
        () => {
            console.log(presetValue)
            if (stepValues.length === 0) return
            const _values = stepValues
            const index = _values.indexOf(_values.find(item => item.id === configuration.id))
            const validValue = stepValues.find(item => item.id === configuration.id).valid
            _values.splice(index, 1)
            _values.push({
                id: configuration.id,
                value: presetValue,
                mandatory: configuration.mandatory,
                valid: validValue,
            })
            stepSetValues(_values)
            window.localStorage.setItem(keyName, JSON.stringify(_values))
        }, []
    )

    const renderQuesitonFooter = () => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={() => setDisplayDialog(false)} autoFocus />
            </div>
        );
    }

    const renderTabs = () => {

        if (presetValue === '') {
            presetValue = []
        }

        if (results[0]) {
            console.log(presetValue)
            const temp = results.find(item => item.header === configuration.resultsKeyword)
            return temp.value.map((item,index) => {
                const presetValueExists = presetValue.find(item => item.id === index);
                let highlight = false
                if (presetValueExists) {
                    if (presetValueExists.value?.length) {
                        highlight = true
                    }
                }
                return (
                    <AccordionTab header={item.title} headerStyle={highlight ? {backgroundColor: 'lightgray'} : {}}>
                        <Picklist sourceData={item.value} presetValue={presetValue} item={item} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName} configuration={configuration} index={index}/>
                    </AccordionTab>
                )
            })
        }
    }

    return (
        <div className="field accordion">
            <Tooltip target=".status"  position="top"/>
            <div className="p-inputgroup">
                <span className="p-float-label">
                    <Accordion multiple>
                        {renderTabs()}
                    </Accordion>
                </span>
                <span className="p-inputgroup-addon" id='question' onClick={() => setDisplayDialog(true)}><i className="fad fa-question"/></span>
            </div>
            <Dialog header={configuration.label} visible={displayDialog} style={{ width: '50vw' }} footer={renderQuesitonFooter('displayBasic')} onHide={() => setDisplayDialog(false)} >
                {ReactHtmlParser(configuration.fieldInformation)}
            </Dialog>
        </div>
    )
}

export default AccordionTabs
