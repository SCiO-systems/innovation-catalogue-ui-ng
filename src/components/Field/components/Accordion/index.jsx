import React, {useState} from 'react'
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

    const accordionData = useSelector((state) => state.accordionData)

    const results = useSelector((state) => state.results)

    const [displayDialog, setDisplayDialog] = useState(false)

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
            const temp = results.find(item => item.header === configuration.resultsKeyword)
            return temp.value.map(item => {
                return (
                    <AccordionTab header={item.title}>
                        <Picklist sourceData={item.value} presetValue={presetValue} item={item} stepValues={stepValues} stepSetValues={stepSetValues} keyName={keyName} configuration={configuration}/>
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
