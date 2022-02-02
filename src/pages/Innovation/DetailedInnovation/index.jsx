import React, {useEffect, useRef, useState} from "react";
import {Card} from "primereact/card";
import InnovationService from "../../../services/InnovationService";
import {MapChart, DivBuilder} from '../components'
import {Button} from "primereact/components/button/Button";
import {TabPanel, TabView} from "primereact/tabview";
import {Link, useLocation} from "react-router-dom";
import {Tooltip} from "primereact/tooltip";
import {DataView} from "primereact/dataview";
import {Divider} from "primereact/divider";
import {Galleria} from "primereact/galleria";
import {Panel} from "primereact/panel";
import ResultsService from "../../../services/ResultsService";
import ReactHtmlParser from "react-html-parser";
import html2pdf from "html2pdf.js/src";
import {ProgressBar} from "primereact/progressbar";
import {Dialog} from "primereact/dialog";

const DetailedInnovation = () => {

    const [detailedPage, setDetailedPage] = useState(null);
    const [innovation, setInnovation] = useState(null);
    const [sliderValue, setSliderValue] = useState(null);
    const [dateValue, setDateValue] = useState([]);
    const [sliderValueInterventions, setSliderValueInterventions] = useState(null);
    const [budgetValue, setBudgetValue]  = useState([]);
    const [sliderValueStakeholders, setSliderValueStakeholders] = useState(20);
    const [innovationPartnersValue, setInnovationPartnersValue]  = useState([]);
    const [scalingPartnersValue, setScalingPartnersValue]  = useState([]);
    const [demandPartnersValue, setDemandPartnersValue]  = useState([]);
    const [codesImplementation, setCodesImplementation] = useState(null);
    const [codesAmpliedEvidence, setCodesAmpliedEvidence] = useState(null);
    const [codesExperimentalEvidence, setCodesExperimentalEvidence] = useState(null);
    const [codesImpact, setCodesImpact] = useState(null);
    const [downloadPDF,setDownloadPDF] = useState(false)
    const [galleriaIndex, setGalleriaIndex] = useState(0)
    const op = useRef(null);
    let innovationUrl = "/innovation/";

    const resultService = new ResultsService();
    const innovationService = new InnovationService()
    let location = useLocation();

    useEffect(() =>{
        const innovation_id = location.pathname.split("/")[2];
        resultService.getInnovation(innovation_id).then(data =>{
            resultService.getInnovationByTitle(data.data.response.related_innovations).then(
                (result)=>{

                    Promise.all(result).then(
                        (values)=>{
                            data.data.response.connected_innovations = values.filter((x) => {
                                return x !== undefined
                            });

                            let codesAmpliedEvidence = [...data.data.response.locations_of_applied_evidence].map(obj => {return {id: obj.code,value: obj.freq}});
                            setCodesAmpliedEvidence(codesAmpliedEvidence);

                            let codesImplementation = [...data.data.response.locations_of_implementation].map(obj => {return {id: obj.code,value: obj.freq}});
                            setCodesImplementation(codesImplementation);

                            let codesExperimentalEvidence = [...data.data.response.locations_of_experimental_evidence].map(obj => {return {id: obj.code,value: obj.freq}});
                            setCodesExperimentalEvidence(codesExperimentalEvidence);

                            let codesImpact = [...data.data.response.locations_of_impact].map(obj => {return {id: obj.code,value: obj.freq}});
                            setCodesImpact(codesImpact);

                            setSliderValue("2021");
                            setDateValue(data.data.response.governance_type[0]);
                            setSliderValueInterventions("2021");
                            setBudgetValue(data.data.response.total_budget_of_interventions);
                            setSliderValueStakeholders("2021");
                            setInnovationPartnersValue(data.data.response.key_innovation_partners);
                            setScalingPartnersValue(data.data.response.key_scaling_partners);
                            setDemandPartnersValue(data.data.response.key_demand_partners);
                            setInnovation(data.data.response);

                        }
                    )
                }
            )
        });

    },[])


    const exportToExcel = (e) =>{

        let arr = [innovation];

        let keys = [];
        let values = [];
        function getKeys(data, k = '') {
            for (let i in data) {
                let rest = k.length ? '_' + i : i
                if (typeof data[i] == 'object') {
                    if (!Array.isArray(data[i])) {
                        getKeys(data[i], k + rest)
                    }
                } else keys.push( k+ rest)
            }
        }
        function getValues(data, k = '') {
            for (let i in data) {
                let rest = k.length ? '' + i : i
                if (typeof data[i] == 'object') {
                    if (!Array.isArray(data[i])) {
                        getValues(data[i], k + rest)
                    }
                }
                else values.push(data[rest])
            }
        }

        getKeys(arr[0])
        let value="";
        arr.forEach(x=>{
            values=[];
            getValues(x);
            value+=values.join(";")+"\r\n";
        })

        let result = keys.join(";")+"\r\n"+value;
        let blob = new Blob([result], {
            type: "csv",
            name: 'data.csv'
        });

        const a = document.createElement('a')
        a.download = innovation.MEL_innovation_id+".csv"
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const renderListItem = (data) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item margin-top-20 margin-bottom-20">
                    <h3>{data.title}</h3>
                    <div className="product-list-detail">
                        <div className="margin-bottom-20" style={{display: "flex"}}>
                            <div className="margin-right">
                                <p> <i className="fad fa-user fa-lg" style={{color: "#aa671d"}}></i> {data.submitter.submitter_first_name} {data.submitter.submitter_last_name}</p>
                            </div>
                            <div className="margin-right">
                                <p> <i className="fad fa-envelope fa-lg" style={{color: "#aa671d"}}></i> {data.submitter.submitter_email}</p>
                            </div>
                            <div className="margin-right">
                                <p><i className="fad fa-calendar-edit fa-lg" style={{color: "#aa671d"}}></i> {data.last_updated}</p>
                            </div>
                        </div>
                        <p className="text-align-justify">{data.summary}</p>
                    </div>
                    <div className="product-list-action p-grid p-justify-end">
                        <Link to={innovationUrl + data.innovation_id}>
                            <Button  label="View" className="button-view-results"></Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product, layout) => {
        if(product){
            if (layout === 'list'){
                return renderListItem(product);
            }
        }else{
            return <></>
        }
    }

    const itemTemplate2 = (item) => {
        return <img src={item} alt={item.alt} className="img-width" style={{display: 'block' }} />;
    }

    const exportPDF = () =>{
        setDownloadPDF(true);
        let element = document.getElementById('detailed_innovation');
        html2pdf().set(
            {
                mode: 'css',
                filename:innovation.MEL_innovation_id

            }
        ).from(element).save().then(
            ()=>{
                setDownloadPDF(false);
            }
        );
    }

    const exportJson = () =>{

        const blob = new Blob([JSON.stringify(innovation,null,4)], { type: 'text/json' })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = innovation.MEL_innovation_id+".json"
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    const onHide = () => {
        setDownloadPDF(false)
    }


    const onItemChange = (e) => {
        setGalleriaIndex(e.index)
    }


    const renderPage = () => {

        let step;
        return(
            <>
                <div className="p-grid p-dir-rev innovation-container">
                    <div className="p-col innovation-col-width">
                        <Card className="margin-bottom-40">
                            <h4 className="innovation-title">{innovation.title}</h4>
                            <div className="innovation-title-button">
                                {
                                    innovation.innovation_URL.startsWith("http")?
                                        <a href={innovation.innovation_URL} target="_target"><Button className="innovation-button" label="Access Innovation"></Button></a>:
                                        <a href={"https://"+innovation.innovation_URL} target="_target"><Button className="innovation-button" label="Access Innovation"></Button></a>
                                }

                            </div>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Summary</h2>
                            <div>{innovation.summary}</div>
                        </Card>
                        <Card className="margin-bottom-40">
                            <TabView>
                                <TabPanel header="Benefit/Impact">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Description of the problem the innovation provides a solution:</p>
                                        <div>{innovation.problem_the_innovation_provides_solution}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Environmental Benefits:</p>
                                        <DivBuilder type="environmental-benefits" data={innovation.environmental_benefits}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block mini-headings-innovation">SDG Target Addressed:</p>
                                        <DivBuilder type="sdg-target" data={innovation.SDG_target}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block mini-headings-innovation">CGIAR Impact Target:</p>
                                        <DivBuilder type="impact-target" data={innovation.CGIAR_impact_target}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block mini-headings-innovation">Initiative/Project outcome addressed:</p>
                                        <div>{ReactHtmlParser(innovation.initative_defined_outcome)}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Value added of the innovation:</p>
                                        <div>{innovation.value_added_of_the_innovation}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Main Advantages:</p>
                                        <div>{ReactHtmlParser(innovation.main_advantages)}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Main Disadvantages:</p>
                                        <div>{ReactHtmlParser(innovation.main_disadvantages)}</div>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Context">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Start Date:</p>
                                        <div>{innovation.start_date}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">End Date:</p>
                                        <div>{innovation.end_date}</div>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Evidence">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Reference Materials:</p>
                                        <DivBuilder type="reference-materials" data={innovation.innovation_reference_materials}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Technology Appraisal:</p>
                                        <div>{innovation.technology_appraisal}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Technology Appraisal Image:</p>
                                        <div><img src={innovation.technology_appraisal_image} width={400}/></div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Documentation available upon request to potential investors:</p>
                                        {
                                            innovation.documentation_to_pottential_investors.map(
                                                (item)=>{
                                                    return <div className="p-mb-2">{ReactHtmlParser(item)}</div>
                                                }
                                            )
                                        }

                                    </div>
                                </TabPanel>
                                <TabPanel header="Intellectual Property">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Type of Patent Number:</p>
                                        <div>{innovation.type_of_patent_number}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Patent Number:</p>
                                        {
                                            innovation.patent_number === 0?
                                                <div></div>:<div>{innovation.patent_number}</div>

                                        }
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Patent Office:</p>
                                        <div>{innovation.patent_office}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Patent Know-How Information:</p>
                                        {
                                            innovation.patent_knowhow_info?
                                                <div><a src={innovation.patent_knowhow_info} target="_blank">Information URL</a></div>:console.log()
                                        }

                                    </div>
                                </TabPanel>
                                <TabPanel header="Interventions">
                                    <div>
                                        <DivBuilder type="intervention-name" data={innovation.intervention_name}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block  mini-headings-innovation">Total budget of Intervention(s):</p>
                                        {
                                            budgetValue === 0?<div></div>:<div className="margin-right-7 margin-bottom-10 margin-left-5"> {budgetValue}</div>
                                        }
                                    </div>
                                    <div className="margin-top-20">
                                        <Divider></Divider>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Challenge Statement:</p>
                                        <Panel toggleable>
                                            <p>{innovation.challenge_statement}</p>
                                        </Panel>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Objective Statement: </p>
                                        {
                                            innovation.objective_statement.map(
                                                (item)=>{
                                                    return <div className="p-mb-2">{ReactHtmlParser(item)}</div>
                                                }
                                            )
                                        }
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Description: </p>
                                        <Panel toggleable>
                                            {
                                                innovation.long_intervention_description.map(
                                                    (item)=>{
                                                        return <div className="p-mb-2" style={{textAlign:"justify"}}>{ReactHtmlParser(item)}</div>
                                                    }
                                                )
                                            }
                                        </Panel>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Team Members: </p>
                                        <DivBuilder type="team-members" data={innovation.intervention_team_members}></DivBuilder>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Investment">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Investment Sought: </p>
                                        <div>{innovation.investment_sought}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Type of Investment Sought:  </p>
                                        <DivBuilder type="type-sought" data={innovation.type_of_investment_sought}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Estimated Amount Sought in USD:  </p>

                                        {
                                            innovation.estimated_amount_sought === 0?<div></div>:<div> {innovation.estimated_amount_sought}</div>
                                        }

                                    </div>
                                </TabPanel>
                                <TabPanel header="Readiness">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Technology Development Stage:  </p>
                                            {
                                                innovation.technology_development_stage !=="" ?
                                                    <div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation">
                                                        {innovation.technology_development_stage}
                                                    </div>:console.log()
                                            }
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Technology Development Project Summary:  </p>
                                        <div>{innovation.technology_development_project_summary}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Innovation Readiness levels of the components:  </p>
                                        <DivBuilder type="beneficiaries-innovation" data={innovation.innovation_readiness_levels_of_the_components}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Innovation Use levels of the components:  </p>
                                        {
                                            innovation.innovation_use_levels_of_the_components === 0?
                                                <div></div>:<DivBuilder type="beneficiaries-innovation" data={innovation.innovation_use_levels_of_the_components}></DivBuilder>

                                        }
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Scaling Readiness Level:  </p>
                                        {
                                            innovation.scaling_readiness_level === 0?
                                                <div></div>:<div>{innovation.scaling_readiness_level}</div>
                                        }
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Scaling Readiness Score:  </p>
                                        {
                                            innovation.scaling_readiness_level === 0?
                                                <div></div>:<div>{innovation.scaling_readiness_score}</div>
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel header="Stakeholders">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Users of the Innovation:</p>
                                        <DivBuilder type="users-innovation" data={innovation.users_of_the_innovation}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Beneficiaries of the Innovation:</p>
                                        <DivBuilder type="beneficiaries-innovation" data={innovation.beneficiaries_of_the_innovation}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Sponsors of the Innovation:</p>
                                        <DivBuilder type="beneficiaries-innovation" data={innovation.sponsors_of_the_innovation}></DivBuilder>
                                    </div>
                                    <div className="margin-top-35">
                                        <Divider></Divider>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Innovation Partners:</p>
                                        <DivBuilder type="key-innovation-partners" data={innovationPartnersValue}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Scaling Partners:</p>
                                        <DivBuilder type="key-scaling-partners" data={scalingPartnersValue}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Demand Partners:</p>
                                        <DivBuilder type="key-demand-partners" data={demandPartnersValue}></DivBuilder>
                                    </div>
                                </TabPanel>
                            </TabView>
                        </Card>
                        <Card className="margin-bottom-40 ">
                            <h2 className="innovation-heading">Image of the Innovation</h2>
                            <center>
                                <img src={innovation.image_of_the_innovation} className="img-width"/>
                            </center>

                        </Card>
                        {
                            innovation.image_of_the_innovation_component.length>0?

                                <Card className="margin-bottom-40"  >
                                    <h2 className="innovation-heading">Image of the Innovation Components</h2>
                                    <Galleria
                                        activeIndex={galleriaIndex}
                                        value={innovation.image_of_the_innovation_component}
                                        numVisible={5} circular
                                        showIndicators
                                        onItemChange={(e)=>onItemChange(e)}
                                        showItemNavigators showThumbnails={false} item={itemTemplate2}/>
                                </Card>:console.log()
                        }
                        {
                            innovation.connected_innovations?
                                <Card>
                                    <h2 className="innovation-heading">Related Innovation(s)</h2>
                                    <DataView style={{padding: "10px"}} value={innovation.connected_innovations} layout="list"
                                              itemTemplate={itemTemplate}/>
                                </Card>:console.log()
                        }
                    </div>

                    <div className="p-col-fixed sidebar-container">
                        <div className="margin-bottom-40">
                            <div className="innovation-submitter-background">
                                <div style={{paddingLeft:"25px",paddingTop:"15px"}}>
                                    <h2 className="innovation-heading" style={{color:"white"}}>Innovation Submitter</h2>
                                    <div className="margin-top-20">
                                        <i className="fad fa-user fa-lg margin-right-7 white-icons-innovation" />
                                        <strong>
                                        <a href={innovation.innovation_submitter.website} target="_blank" style={{color:"#56323d"}}>
                                            {innovation.innovation_submitter.first_name} {innovation.innovation_submitter.last_name}
                                        </a>
                                        </strong>
                                    </div>
                                    <div className="margin-top-20"><i className="fad fa-envelope fa-lg margin-right-7 white-icons-innovation" />
                                        <strong><span style={{color:"#56323d"}}>{innovation.innovation_submitter.email}</span>
                                        </strong>
                                    </div>
                                    <div className="margin-top-20 company-submitter-innovation">
                                        <div className="display-inline"><i className="margin-right-7" /><img src={innovation.innovation_submitter.organizational_logo} width={70}/> </div>
                                        <div className="company-name-submitter-innovation margin-left-20 display-inline ">
                                            <strong><span style={{color:"#56323d"}}>{innovation.innovation_submitter.company}</span></strong>
                                        </div>
                                    </div>
                                    <div className="margin-top-20"><i className="fad fa-globe fa-lg margin-right-7 white-icons-innovation" />
                                        <strong>
                                            <span style={{color:"#56323d"}}>{innovation.innovation_submitter.country}</span></strong>
                                        </div>

                                </div>
                            </div>

                        </div>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">CGIAR Action Areas</h2>
                            <DivBuilder type="action-areas" data={innovation.CGIAR_action_areas}></DivBuilder>
                        </Card>
                        <Card className="margin-bottom-40">
                            <div>
                                <p className="mini-headings-innovation margin-bottom-0">Keywords:</p>
                                <DivBuilder type="keywords" data={innovation.keywords}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Business Category:</p>
                                <DivBuilder type="business-category" data={innovation.business_category}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Technical Field:</p>
                                <DivBuilder type="technical-field" data={innovation.technical_field}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Type of Innovation (Initially Reported):</p>
                                <DivBuilder type="type-of-innovation-old" data={innovation.type_of_innovation_old}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Type of Innovation:</p>
                                <DivBuilder type="type-of-innovation-new" data={innovation.type_of_innovation_new}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Administrative Scale:</p>
                                <DivBuilder type="administrative-scale" data={innovation.administrative_scale_of_the_innovations}></DivBuilder>
                            </div>
                            <div className="margin-top-35">
                                <Divider></Divider>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Governance Type:
                                    <span className="selected-words-innovation">{innovation.governance_type}</span></p>
                                <DivBuilder type="governance-type" data={dateValue}></DivBuilder>
                            </div>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Locations of Applied Evidence</h2>
                            <MapChart mapData={codesAmpliedEvidence} mapId="map1-innovation"></MapChart>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Locations of Implementation</h2>
                            <MapChart mapData={codesImplementation} mapId="map2-innovation"></MapChart>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Locations of Experimental Evidence</h2>
                            <MapChart mapData={codesExperimentalEvidence} mapId="map3-innovation"></MapChart>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Locations of Impact/Profit Evidence</h2>
                            <MapChart mapData={codesImpact} mapId="map4-innovation"></MapChart>
                        </Card>
                    </div>
                </div>
                <div className="p-grid p-dir-col">
                    <div className="export-buttons-container">
                        <div className="p-col">
                            <Tooltip target=".excel-button" position="left" />
                            <Button type="button" icon="fad fa-file-excel fa-lg" className="p-button-success p-mr-2 excel-button" data-pr-tooltip="Export XLS" onClick={(e) => exportToExcel(e)} aria-haspopup aria-controls="overlay_panel"/>
                        </div>
                        <div className="p-col">
                            <Tooltip target=".json-button" position="left" />
                            <Button type="button"
                                    icon="fad fa-code fa-lg"
                                    className="json-button p-mr-2"
                                    data-pr-tooltip="Export JSON"
                                    onClick={()=>exportJson()}
                            />
                        </div>
                    </div>
                </div>
            </>

        );
    }

    return(

        <>

            <Dialog header="Compiling PDF ..." visible={downloadPDF}
                    position={"top"} modal style={{ width: '50vw' }}
                    onHide={() => onHide('displayPosition')}
                    draggable={false} resizable={false}
                    closable = {false}
            >
                <ProgressBar mode="indeterminate" />
            </Dialog>

            <div  id="detailed_innovation">
                {innovation?renderPage():console.log()}
            </div>
        </>


    );
}

export default DetailedInnovation
