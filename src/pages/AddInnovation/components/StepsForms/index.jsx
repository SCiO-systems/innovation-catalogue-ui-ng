import React, {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {Button} from "primereact/components/button/Button";
import ResultsService from "../../../../services/ResultsService";
import {PickList} from "primereact/picklist";
import {Accordion, AccordionTab} from "primereact/accordion";
import {MultiSelect} from "primereact/multiselect";
import { Calendar } from 'primereact/calendar';
import {InputNumber} from "primereact/inputnumber";
import {Link} from "react-router-dom";
import {Chips} from "primereact/chips";
import {disable} from "@amcharts/amcharts4/.internal/core/utils/Debug";

const StepsForms = (props) => {
    const [steps, setSteps] = useState("step-1");
    const [formResults, setFormResults] = useState(null);
    const [forms, setForms] = useState(null);
    const [date1, setDate1] = useState(null);
    const [source, setSource]= useState([]);
    const [target, setTarget] = useState([]);
    const [values, setValues] = useState([]);
    const [selectedItem1, setSelectedItem1] = useState(null);
    const [selectedItem2, setSelectedItem2] = useState(null);
    const [selectedItem3, setSelectedItem3] = useState(null);
    const [selectedItem4, setSelectedItem4] = useState(null);
    const [selectedItem5, setSelectedItem5] = useState(null);
    const [selectedItem6, setSelectedItem6] = useState(null);
    const [selectedItem7, setSelectedItem7] = useState(null);
    const [selectedItem8, setSelectedItem8] = useState(null);
    const [selectedItem9, setSelectedItem9] = useState(null);
    const [selectedItem10, setSelectedItem10] = useState(null);
    const [selectedItem11, setSelectedItem11] = useState(null);
    const [selectedItem12, setSelectedItem12] = useState(null);
    const [selectedItem13, setSelectedItem13] = useState(null);
    const [selectedItem14, setSelectedItem14] = useState(null);
    const [selectedItem15, setSelectedItem15] = useState(null);
    const [selectedItem16, setSelectedItem16] = useState(null);
    const [selectedItem17, setSelectedItem17] = useState(null);
    const [selectedItem18, setSelectedItem18] = useState(null);
    const [selectedItem19, setSelectedItem19] = useState(null);
    const [selectedItem20, setSelectedItem20] = useState(null);
    const [selectedItem21, setSelectedItem21] = useState(null);
    const [selectedItem22, setSelectedItem22] = useState(null);
    const [hideBtn, setHideBtn] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const stepsService = new ResultsService();

    const addDoubleInputs = (e) => {
        // console.log(disableBtn)
        //
        // if(inputs.length >= 1){
        //     e.target.style.display = "none";
        // }

        let _doubleInputs = doubleInputs;
        _doubleInputs.push(<div  className="margin-top-20">
            <InputText className="input-size margin-right-7 input-width responsive-layout-input"/> <span className="margin-right-7 dash">&#8212;</span>
            <InputText className="input-size margin-right-7 input-width responsive-layout-input"/>
            <Button label="Add" icon="fad fa-plus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={addDoubleInputs}/>
            <Button label="Remove" icon="fad fa-minus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={removeDoubleInputs}/>
        </div>);

        setDoubleInputs([..._doubleInputs]);
    }

    const removeDoubleInputs = () => {
        let _doubleInputs = doubleInputs;
        if(_doubleInputs.length > 1){
            let i = _doubleInputs.indexOf(this);
            _doubleInputs.splice(i, 1);
            setDoubleInputs([..._doubleInputs]);
        }
    }

    const [doubleInputs, setDoubleInputs] = useState([<div key="1">
        <InputText className="input-size margin-right-7 input-width responsive-layout-input"/> <span className="margin-right-7 dash">&#8212;</span>
        <InputText className="input-size margin-right-7 input-width responsive-layout-input"/>
        <Button label="Add" icon="fad fa-plus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={addDoubleInputs}/>
        <Button label="Remove" icon="fad fa-minus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={removeDoubleInputs}/>
    </div>]);

    const addInputs = (e) => {
        let _inputs = inputs;
        _inputs.push(<div  className="margin-top-20">
            <InputText className="input-size margin-right-7 display-block-responsive responsive-layout-input"/>
            <Button label="Add" icon="fad fa-plus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={addInputs}/>
            <Button label="Remove" icon="fad fa-minus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={removeInputs}/>
        </div>);

        setInputs([..._inputs]);
    }

    const removeInputs = (i) => {
        let _inputs = inputs;
        if(_inputs.length > 1){
            let i = _inputs.indexOf(this);
            _inputs.splice(i, 1);
            setInputs([..._inputs]);
        }
    }

    const [inputs, setInputs] = useState([<div key="1">
        <InputText className="input-size margin-right-7 display-block-responsive responsive-layout-input"/>
        <Button label="Add" icon="fad fa-plus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={addInputs}/>
        <Button label="Remove" icon="fad fa-minus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={removeInputs}/>
    </div>]);

    useEffect(() => {
        stepsService.getSteps().then(data => setSource(data));

        if(props.results){
            setFormResults(props.results)
        }

        if(formResults){
            if(props.activeIndex === 0){
                setForms(showStepOne)
            }
            if(props.activeIndex === 1){
                setForms(showStepTwo)
            }
            if(props.activeIndex === 2){
                setForms(showStepThree)
            }
            if(props.activeIndex === 3){
                setForms(showStepFour)
            }
            if(props.activeIndex === 4){
                setForms(showStepFive)
            }
            if(props.activeIndex === 5){
                setForms(showStepSix)
            }
            if(props.activeIndex === 6){
                setForms(showStepSeven)
            }
            if(props.activeIndex === 7){
                setForms(showStepEight)
            }
            if(props.activeIndex === 8){
                setForms(showStepNine)
            }
        }

    }, [props.activeIndex, inputs, source, target,  doubleInputs, steps, values, formResults, selectedItem1, selectedItem3, selectedItem4, selectedItem5, selectedItem6, selectedItem7, selectedItem8, selectedItem10, selectedItem11, selectedItem12, selectedItem13, selectedItem14, selectedItem15, selectedItem16, selectedItem17, selectedItem18, selectedItem19, selectedItem20, selectedItem21, selectedItem22]);

    const administrative_scale = [
        {value: "Subnational"},
        {value: "National"},
        {value: "Multi-National"},
    ];

    const related_innovations = [
        {value: "Innovation 1"},
        {value: "Innovation 2"},
        {value: "Innovation 3"},
    ];

    const type_of_investment = [
        {value: "Bonds"},
        {value: "Grant"},
        {value: "Guarantee"},
        {value: "Private Equity"},
        {value: "Venture Capital"},
        {value: "Other"}
    ];

    const tech_stage = [
        {value: "TRL 1 – Basic principles observed"},
        {value: "TRL 2 – Technology concept formulated"},
        {value: "TRL 3 – Experimental proof of concept"},
        {value: "TRL 4 – Technology validated in lab"},
        {value: "TRL 5 – Technology validated in relevant environment (industrially relevant environment in the case of key enabling technologies)"},
        {value: "TRL 6 – Technology demonstrated in relevant environment (industrially relevant environment in the case of key enabling technologies)"},
        {value: "TRL 7 – System prototype demonstration in operational environment"},
        {value: "TRL 8 – System complete and qualified"},
        {value: "TRL 9 – Actual system proven in operational environment (competitive manufacturing in the case of key enabling technologies; or in space)"}
    ];

    const readiness_levels = [
        {value: "Idea"},
        {value: "Hypothesis (proven)"},
        {value: "Basic Model (unproven)"},
        {value: "Basic Model (proven)"},
        {value: "Application Model (unproven)"},
        {value: "Application Model (proven)"},
        {value: "Application (unproven)"},
        {value: "Application (proven)"},
        {value: "Innovation (unproven)"},
        {value: "Innovation (proven)"},
    ];

    const users_innovation = [
        {name: "Farmers (small-scale or commercial farmers)"},
        {name: "Community-based Organizations"},
        {name: "Private Sector"},
        {name: "Researchers"},
        {name: "NARES/NARS"},
        {name: "Extension Agents"},
        {name: "Government"},
        {name: "Traders"},
        {name: "Foundations"},
        {name: "Financial Institutions"},
        {name: "Multilateral"},
        {name: "Agro-manufacturers"},
        {name: "Agro-dealers"},
        {name: "Land users"},
        {name: "Bilateral And Donor"},
        {name: "Women"},
        {name: "Youth"},
        {name: "Other"}
    ];

    const benef_innovation = [
        {name: "Farmers (small-scale or commercial farmers)"},
        {name: "Community-based Organizations"},
        {name: "Private Sector"},
        {name: "Researchers"},
        {name: "NARES/NARS"},
        {name: "Extension Agents"},
        {name: "Government"},
        {name: "Traders"},
        {name: "Foundations"},
        {name: "Financial Institutions"},
        {name: "Multilateral"},
        {name: "Agro-manufacturers"},
        {name: "Agro-dealers"},
        {name: "Land users"},
        {name: "Bilateral And Donor"},
        {name: "Women"},
        {name: "Youth"},
        {name: "Other"}
    ];

    const innovation_partners = [
        {name: "Wageningen University and Research Centre"},
        {name: "Mikocheni Agricultural Research Institute"},
        {name: "Institut National de Recherche Agricole du Benin"}
    ];

    const scaling_partners = [
        {name: "Georg-August-Universität Göttingen"},
        {name: "International Rice Research Institute"},
        {name: "National Agricultural Research Organisation (Uganda)"}
    ];

    const demand_partners = [
        {name: "Mbeya Agricultural Research and Training Institute"},
        {name: "Institut Senegalais de Recherche Agricole"},
        {name: "Institut d’Economie Rurale (Mali)"}
    ];

    const onFormChange = (e) => {
        if(e.target.id === "action_areas"){
            setSelectedItem1(e.value);
        }
        if(e.target.id === "regions_of_implementation"){
            setSelectedItem2(e.value);
        }
        if(e.target.id === "countries_of_implementation"){
            setSelectedItem3(e.value);
        }
        if(e.target.id === "environmental_benefits"){
            setSelectedItem4(e.value);
        }
        if(e.target.id === "type_of_innovation"){
            setSelectedItem5(e.value);
        }
        if(e.target.id === "business_category"){
            setSelectedItem6(e.value);
        }
        if(e.target.id === "technical_field"){
            setSelectedItem7(e.value);
        }
        if(e.target.id === "governance_type"){
            setSelectedItem8(e.value);
        }
        if(e.target.id === "impact_targets"){
            setSelectedItem9(e.value);
        }
        if(e.target.id === "administrative_scale"){
            setSelectedItem10(e.value);
        }
        if(e.target.id === "related_innovations"){
            setSelectedItem11(e.value);
        }
        if(e.target.id === "countries_of_applied"){
            setSelectedItem12(e.value);
        }
        if(e.target.id === "countries_of_experimental"){
            setSelectedItem13(e.value);
        }
        if(e.target.id === "countries_of_impact"){
            setSelectedItem14(e.value);
        }
        if(e.target.id === "type_of_investment"){
            setSelectedItem15(e.value);
        }
        if(e.target.id === "tech_stage"){
            setSelectedItem16(e.value);
        }
        if(e.target.id === "readiness_levels"){
            setSelectedItem17(e.value);
        }
        if(e.target.id === "users_innovation"){
            setSelectedItem18(e.value);
        }
        if(e.target.id === "benef_innovation"){
            setSelectedItem19(e.value);
        }
        if(e.target.id === "innovation_partners"){
            setSelectedItem20(e.value);
        }
        if(e.target.id === "scaling_partners"){
            setSelectedItem21(e.value);
        }

    }
    //
    // const displayInputs = () => {
    //     return (
    //         <>
    //             <InputText className="input-size"/>
    //         </>
    //     );
    // }


    // setInputs(<div key="1">
    //     <InputText className="input-size margin-right-7"/> <span className="margin-right-7">&#8212;</span>
    //     <InputText className="input-size margin-right-7"/>
    //     <Button label="Add" icon="fad fa-plus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={addInputs}/>
    // </div>);

    // let inputs = [
    //     <div key="1">
    //         <InputText className="input-size margin-right-7"/> <span className="margin-right-7">&#8212;</span>
    //         <InputText className="input-size margin-right-7"/>
    //         <Button label="Add" icon="fad fa-plus fa-lg" className="p-mr-2 margin-left-5 add-button" onClick={addInputs}/>
    //     </div>
    // ];

    //...Step One Description Displaying Function...

    const showStepOne = () => {

        setSteps("step-1");

        return (
            <>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Title</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputText className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Summary</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Business Category</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="business_category" value={selectedItem6} optionLabel="value" options={formResults.Business_category} onChange={onFormChange} className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Administrative Scale</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="administrative_scale" options={administrative_scale} value={selectedItem10} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Keywords</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <Chips value={values} onChange={(e) => setValues(e.value)} separator="," placeholder="Comma Separated" style={{width: "100%", height: "40px"}}/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Innovation URL</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputText className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Image of the Innovation</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <FileUpload className="image-innovation" mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload Image" />
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Images of the Innovation Components</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <FileUpload className="images-innovation-components" mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload Image" />
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Technical Field</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="technical_field" options={formResults.Technical_field} value={selectedItem7} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Type of Innovation (Initially Reported)</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect disabled className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Type of Innovation</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="type_of_innovation" options={formResults.Type_of_innovation} value={selectedItem5} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Governance Type</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="governance_type" options={formResults.Gοvernance_type} value={selectedItem8} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Related Innovations</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="related_innovations" options={related_innovations} value={selectedItem11} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                {/*<div className="p-grid p-justify-end margin-top-40">*/}
                {/*    <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button" onClick={showStepTwo}></Button>*/}
                {/*</div>*/}
            </>
        );
    }

    //...Step Two Benefit/Impact Description Displaying Function...

    const showStepTwo = () => {

        setSteps("step-2");

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
            <>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>CGIAR Action Areas</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="action_areas" options={formResults.CGIAR_impact_area} value={selectedItem1} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Value Added of the Innovation</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Main Advantages</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Main Disadvantages</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Description of the problem the innovation provides a solution</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>SDG Target Addressed</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">

                        <Accordion multiple >
                            <AccordionTab header="SDG 1. End poverty in all its forms everywhere">
                                <PickList source={source.sdg1} target={target} itemTemplate={itemTemplate}
                                onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 2. End hunger, achieve food security and improved nutrition and promote sustainable agriculture">
                                <PickList source={source.sdg2} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 3. Ensure healthy lives and promote well-being for all at all ages">
                                <PickList source={source.sdg3} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 4. Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all">
                                <PickList source={source.sdg4} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 5. Achieve gender equality and empower all women and girls">
                                <PickList source={source.sdg5} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 6. Ensure availability and sustainable management of water and sanitation for all">
                                <PickList source={source.sdg6} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 7. Ensure access to affordable, reliable, sustainable and modern energy for all">
                                <PickList source={source.sdg7} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 8. Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all">
                                <PickList source={source.sdg8} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 9. Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation">
                                <PickList source={source.sdg9} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 10. Reduce inequality within and among countries">
                                <PickList source={source.sdg10} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 11. Make cities and human settlements inclusive, safe, resilient and sustainable">
                                <PickList source={source.sdg11} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 12. Ensure sustainable consumption and production patterns">
                                <PickList source={source.sdg12} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 13. Take urgent action to combat climate change and its impacts">
                                <PickList source={source.sdg13} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 14. Conserve and sustainably use the oceans, seas and marine resources for sustainable development">
                                <PickList source={source.sdg14} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 15. Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss">
                                <PickList source={source.sdg15} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 16. Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels">
                                <PickList source={source.sdg16} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="SDG 17. Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development">
                                <PickList source={source.sdg17} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>CGIAR Impact Target</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <Accordion multiple >
                            <AccordionTab header="Nutrition, health and food security">
                                <PickList source={source.impTarget1} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="Poverty reduction, livelihoods and jobs">
                                <PickList source={source.impTarget2} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="Gender equality, youth and social inclusion">
                                <PickList source={source.impTarget3} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="Climate adaptation and mitigation">
                                <PickList source={source.impTarget4} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                            <AccordionTab header="Environmental health and biodiversity">
                                <PickList source={source.impTarget5} target={target} itemTemplate={itemTemplate}
                                          onChange={onChange} sourceHeader="Available" sourceStyle={{ height: '350px' }} targetStyle={{ height: '350px' }} targetHeader="Selected"/>
                            </AccordionTab>
                        </Accordion>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Initiative/Project Outcome Addressed</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Environmental Benefits</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="environmental_benefits" value={selectedItem4} options={formResults.Environmental_benefits} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                {/*<div className="p-grid p-justify-between margin-top-40">*/}
                {/*    <Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={showStepOne}></Button>*/}
                {/*    <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button"onClick={showStepThree}></Button>*/}
                {/*</div>*/}
            </>
        );
    }

    //...Step Three Context Displaying Function...

    const showStepThree = () => {

        setSteps("step-3");

        return(
            <>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Locations of Implementation</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="countries_of_implementation" options={formResults.Countries} filter value={selectedItem3} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>State Date of Work</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <Calendar className="input-size" value={date1} onChange={(e) => setDate1(e.value)} />
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>End Date of Work</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <Calendar className="input-size" value={date1} onChange={(e) => setDate1(e.value)} />
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Locations of Applied Evidence</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="countries_of_applied" options={formResults.Countries} filter value={selectedItem12} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Locations of Experimental Evidence</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="countries_of_experimental" options={formResults.Countries} filter value={selectedItem13} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Locations of Impact/Profit Evidence</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="countries_of_impact" options={formResults.Countries} filter value={selectedItem14} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                {/*<div className="p-grid p-justify-between margin-top-40">*/}
                {/*    <Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={showStepTwo}></Button>*/}
                {/*    <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button" onClick={showStepFour}></Button>*/}
                {/*</div>*/}
            </>
        );
    }

    //...Step Four Evidence Displaying Function...

    const showStepFour = () => {

        setSteps("step-4");

        return(
            <>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Reference Materials</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        {/*<Dropdown options={business_category} value={businessCategory} onChange={selectBusinessCategory} optionLabel="name" className="input-size"/>*/}
                        {/*<MultiSelect options={business_category} filter value={businessCategory} onChange={selectBusinessCategory} optionLabel="name" className="input-size"/>*/}
                        <FileUpload className="upload-files" mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload Files" />
                        <InputText className="input-size margin-top-20" placeholder="Paste file URL"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label htmlFor="value">Technology Appraisal</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Technology Appraisal Image</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        {/*<InputText id="advantages" className="input-size"/>*/}
                        <FileUpload className="upload-image" mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload Image" />
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Documentation available upon request to potential investors</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputText  className="input-size"/>
                        {/*<FileUpload mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload File" />*/}
                        {/*<InputText className="input-size margin-top-20" placeholder="Paste file URL"/>*/}
                    </div>
                </div>
                {/*<div className="p-grid p-justify-between margin-top-40">*/}
                {/*    <Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={showStepThree}></Button>*/}
                {/*    <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button" onClick={showStepFive}></Button>*/}
                {/*</div>*/}
            </>
        );
    }

    //...Step Five Intellectual Property Displaying Function...

    const showStepFive = () => {

        setSteps("step-5");

        return(
            <>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Type of Patent Number</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputText className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Patent Number</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputNumber className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Patent Office</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputNumber className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Patent Know-How Information</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <FileUpload className="upload-files-info" mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload Files" />
                        <InputText className="input-size margin-top-20" placeholder="Paste file URL"/>
                    </div>
                </div>
                {/*<div className="p-grid p-justify-between margin-top-40">*/}
                {/*    <Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={showStepFour}></Button>*/}
                {/*    <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button" onClick={showStepSix}></Button>*/}
                {/*</div>*/}
            </>
        );
    }

    //...Step Six Interventions Displaying Function...

    const showStepSix = () => {

        setSteps("step-6");

        return(
            <>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Intervention Acronym - Intervention Name</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        {/*<InputText className="input-size"/>*/}
                        {doubleInputs.map(e =>  e )}
                    </div>
                </div>
                {/*<div className="p-grid p-justify-start margin-bottom-20">*/}
                {/*    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">*/}
                {/*        <label>Intervention Acronym</label>*/}
                {/*    </div>*/}
                {/*    <div className="p-col-12 p-sm-12 p-lg-6">*/}
                {/*        <InputNumber className="input-size"/>*/}
                {/*        <Button label="Add" icon="fad fa-plus fa-lg" className="p-mr-2 margin-left-20 add-button" />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Total Budget of Interventions</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        {/*<InputText id="advantages" className="input-size"/>*/}
                        <InputNumber className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Intervention Team Members</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        {inputs.map(e =>  e )}
                        {/*<InputText className="input-size"/>*/}
                        {/*<Button  label="Add" icon="fad fa-plus fa-lg" className="p-mr-2 margin-left-20 add-button"/>*/}
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Challenge Statement</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Objective Statement</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Intervention Description</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                {/*<div className="p-grid p-justify-between margin-top-40">*/}
                {/*    <Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={showStepFive}></Button>*/}
                {/*    <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button" onClick={showStepSeven}></Button>*/}
                {/*</div>*/}
            </>
        );
    }

    //...Step Seven Investment Displaying Function...

    const showStepSeven = () => {

        setSteps("step-7");

        return(
            <>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Investment Sought</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Type of Investment Sought</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="type_of_investment" options={type_of_investment} value={selectedItem15} onChange={onFormChange} optionLabel="value" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label >Estimated Amount Sought in USD</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputNumber className="input-size"/>
                    </div>
                </div>
                {/*<div className="p-grid p-justify-between margin-top-40">*/}
                {/*    <Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={showStepSix}></Button>*/}
                {/*    <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button" onClick={showStepEight}></Button>*/}
                {/*</div>*/}
            </>
        );
    }

    //...Step Eight Readiness Displaying Function...

    const showStepEight = () => {

        setSteps("step-8");

        return(
            <>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Technology Development Stage</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <Dropdown id="tech_stage" options={tech_stage} value={selectedItem16} onChange={onFormChange} optionLabel="value" className="input-size" />
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Technology Development Project Summary</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Innovation Readiness Levels of the Components</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        {/*<InputText id="advantages" className="input-size"/>*/}
                        <Dropdown id="readiness_levels" options={readiness_levels} value={selectedItem17} onChange={onFormChange} optionLabel="value" className="input-size" />
                    </div>
                </div>
                {/*<div className="p-grid p-justify-between margin-top-40">*/}
                {/*    <Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={showStepSeven}></Button>*/}
                {/*    <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button" onClick={showStepNine}></Button>*/}
                {/*</div>*/}
            </>
        );
    }

    //...Step Nine Stakeholders Displaying Function...

    const showStepNine = () => {

        setSteps("step-9");

        return(
            <>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Users of the Innovation</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="users_innovation" options={users_innovation} value={selectedItem18} onChange={onFormChange} optionLabel="name" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Beneficiaries of the Innovation</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect id="benef_innovation" options={benef_innovation} value={selectedItem19} onChange={onFormChange} optionLabel="name" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Sponsors of the Innovation</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <InputTextarea rows={5} className="textarea-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Key Innovation Partners</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect filter id="innovation_partners" options={innovation_partners} value={selectedItem20} onChange={onFormChange} optionLabel="name" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Key Scaling Partners</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect filter id="scaling_partners" options={scaling_partners} value={selectedItem21} onChange={onFormChange} optionLabel="name" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-start margin-bottom-20">
                    <div className="p-col-12 p-sm-12 p-lg-2 form-heading-layout">
                        <label>Key Demand Partners</label>
                    </div>
                    <div className="p-col-12 p-sm-12 p-lg-6">
                        <MultiSelect filter id="demand_partners" options={demand_partners} value={selectedItem22} onChange={onFormChange} optionLabel="name" className="input-size"/>
                    </div>
                </div>
                <div className="p-grid p-justify-between margin-top-40">
                    {/*<Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={showStepSeven}></Button>*/}

                </div>
            </>
        );
    }

    return(
        <>
            {formResults?forms:console.log()}
        </>
    );

}

export default StepsForms
