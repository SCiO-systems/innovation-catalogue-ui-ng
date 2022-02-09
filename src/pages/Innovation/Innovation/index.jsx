import React, {useEffect, useState} from "react";
import InnovationService from "../../../services/InnovationService";
import {Card} from "primereact/card";
import {MapChart, DivBuilder} from '../components'
import { Button } from 'primereact/button';
import {Link, useLocation, useParams,useNavigate} from "react-router-dom";
import {Galleria} from "primereact/galleria";
import {Panel} from "primereact/panel";
import ResultsService from "../../../services/ResultsService";
import ReactHtmlParser from 'react-html-parser';


const Innovation = () => {

    const [innovation, setInnovation] = useState(null);
    const [governanceValues, setGovernanceValues] = useState([]);
    const [budgetValues, setBudgetValues] = useState([]);
    const [innPartnersValues, setInnPartnersValues] = useState([]);
    const [scalingPartnersValues, setScalingPartnersValues] = useState([]);
    const [demandPartnersValues, setDemandPartnersValues] = useState([]);
    const [quickViewPages, setQuickViewPages] = useState(null);
    const innovationService = new InnovationService()
    const detailedViewUrl = "/detailed-innovation/"
    let codesImplementation;
    const resultService = new ResultsService();

    const  id   = useParams();
    // const history = useHistory();
    const navigate = useNavigate()
    let location = useLocation();

    useEffect(() => {

        if(innovation) {
            let selectedRole = localStorage.getItem("selectedRole");
            if (selectedRole) {
                if (selectedRole === "donor") {
                    setQuickViewPages(donorInnovation);
                }
                if (selectedRole === "project_manager") {
                    setQuickViewPages(projectManagerInnovation);
                }
                if (selectedRole === "evaluator") {
                    setQuickViewPages(evaluatorInnovation);
                }
                if (selectedRole === "km_officer") {
                    setQuickViewPages(kmOfficerInnovation);
                }
                if(selectedRole === "monitoring_officer") {
                    setQuickViewPages(monitoringOfficerInnovation);
                }
                if(selectedRole === "impact_officer") {
                    setQuickViewPages(impactOfficerInnovation);
                }
                if(selectedRole === "user") {
                    setQuickViewPages(userInnovation);
                }

            }

            setGovernanceValues(innovation.governance_type);
            setBudgetValues(innovation.total_budget_of_interventions);
            setInnPartnersValues(innovation.key_innovation_partners);
            setScalingPartnersValues(innovation.key_scaling_partners);
            setDemandPartnersValues(innovation.key_demand_partners);

            codesImplementation = [...innovation.locations_of_implementation].map(obj => {return {id: obj.code,value: obj.freq}});

        }else{

            const innovation_id = location.pathname.split("/")[2];
            resultService.getInnovation(innovation_id).then(data =>{
                setInnovation(data.data.response);
            } );
        }

    }, [innovation, governanceValues, budgetValues, innPartnersValues, scalingPartnersValues, demandPartnersValues]);

    const itemTemplate2 = (item) => {
        return <img src={item} alt={item.alt} style={{display: 'block' }} className="img-width"/>;
    }

    const moveToDetailedView = () =>{
        // history.push(detailedViewUrl+innovation.MEL_innovation_id)
        navigate(detailedViewUrl+innovation.MEL_innovation_id)
    }

    //...Donor Innovation Displaying Function...

    const donorInnovation = () => {

        return(
            <div className="p-grid innovation-container">
                <div className="p-col-fixed sidebar-container">
                    <div className="detail-button-container margin-bottom-20">
                        <Button className="detail-button" label="Detailed View" onClick={moveToDetailedView}></Button>
                    </div>
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
                        <h2 className="innovation-heading">Locations of Implementation</h2>
                        <MapChart mapData={codesImplementation} mapId="map2-innovation"></MapChart>
                    </Card>
                    <Card className="margin-bottom-40">
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Business Category:</p>
                            <DivBuilder type="business-category" data={innovation.business_category}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Technical Field:</p>
                            <DivBuilder type="technical-field" data={innovation.technical_field}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Type of Innovation:</p>
                            <DivBuilder type="type-of-innovation-new" data={innovation.type_of_innovation_new}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Governance Type:</p>
                            <DivBuilder type="governance-type" data={governanceValues}></DivBuilder>
                        </div>
                    </Card>
                </div>
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
                        <h2 className="innovation-heading">Benefit/Impact</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Description of the problem the innovation provides a solution:</p>
                            <div>{innovation.problem_the_innovation_provides_solution}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Environmental Benefits:</p>
                            <DivBuilder type="environmental-benefits" data={innovation.environmental_benefits}></DivBuilder>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Context</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Start Date:</p>
                            <div>{innovation.start_date}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">End Date:</p>
                            <div>{innovation.end_date}</div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Interventions working on the Innovation</h2>
                        <div>
                            <DivBuilder type="intervention-name" data={innovation.intervention_name}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Total budget of Intervention:</p>
                            {
                                budgetValues === 0?<div></div>:<div className="margin-right-7 margin-bottom-10 margin-left-5"> {budgetValues}</div>
                            }
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Challenge Statement:</p>
                            <Panel toggleable>
                                <p>{innovation.challenge_statement}</p>
                            </Panel>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Objective Statement: </p>
                            <div>{ReactHtmlParser(innovation.objective_statement)}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Description: </p>
                            <Panel toggleable>
                                {
                                    innovation.long_intervention_description.map(
                                        (item)=>{
                                            return <div className="p-mb-2">{ReactHtmlParser(item)}</div>
                                        }
                                    )
                                }
                            </Panel>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Team Members: </p>
                            <DivBuilder type="team-members" data={innovation.intervention_team_members}></DivBuilder>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Evidence</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Reference Materials:</p>
                            <DivBuilder type="reference-materials" data={innovation.innovation_reference_materials}></DivBuilder>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Stakeholders</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Innovation Partners:</p>
                            <DivBuilder type="key-innovation-partners" data={innPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Scaling Partners:</p>
                            <DivBuilder type="key-scaling-partners" data={scalingPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Demand Partners:</p>
                            <DivBuilder type="key-demand-partners" data={demandPartnersValues}></DivBuilder>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    //...Project Manager Innovation Displaying Function...

    const projectManagerInnovation = () => {

        return(
            <div className="p-grid innovation-container">
                <div className="p-col-fixed sidebar-container">
                    <div className="detail-button-container margin-bottom-20">
                        <Button className="detail-button" label="Detailed View" onClick={moveToDetailedView}></Button>
                    </div>
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
                        <h2 className="innovation-heading">Locations of Implementation</h2>
                        <MapChart mapData={codesImplementation} mapId="map2-innovation"></MapChart>
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
                            <p className="mini-headings-innovation margin-bottom-0">Type of Innovation:</p>
                            <DivBuilder type="type-of-innovation-new" data={innovation.type_of_innovation_new}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Governance Type:</p>
                            <DivBuilder type="governance-type" data={governanceValues}></DivBuilder>
                        </div>
                    </Card>
                </div>
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
                        <h2 className="innovation-heading">Benefit/Impact</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Description of the problem the innovation provides a solution:</p>
                            <div>{innovation.problem_the_innovation_provides_solution}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Environmental Benefits:</p>
                            <DivBuilder type="environmental-benefits" data={innovation.environmental_benefits}></DivBuilder>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Context</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Start Date:</p>
                            <div>{innovation.start_date}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">End Date:</p>
                            <div>{innovation.end_date}</div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Interventions working on the Innovation</h2>
                        <div>
                            <DivBuilder type="intervention-name" data={innovation.intervention_name}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Total budget of Intervention:</p>
                            {
                                budgetValues === 0?<div></div>:<div className="margin-right-7 margin-bottom-10 margin-left-5"> {budgetValues}</div>
                            }
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Challenge Statement:</p>
                            <Panel toggleable>
                                <p>{innovation.challenge_statement}</p>
                            </Panel>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Objective Statement: </p>
                            <div>{ReactHtmlParser(innovation.objective_statement)}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Description: </p>
                            <Panel toggleable>
                                {
                                    innovation.long_intervention_description.map(
                                        (item)=>{
                                            return <div className="p-mb-2">{ReactHtmlParser(item)}</div>
                                        }
                                    )
                                }
                            </Panel>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Team Members: </p>
                            <DivBuilder type="team-members" data={innovation.intervention_team_members}></DivBuilder>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Stakeholders</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Innovation Partners:</p>
                            <DivBuilder type="key-innovation-partners" data={innPartnersValues}></DivBuilder>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    //...Evaluator Innovation Displaying Function...

    const evaluatorInnovation = () => {

        return(
            <div className="p-grid innovation-container">
                <div className="p-col-fixed sidebar-container">
                    <div className="detail-button-container margin-bottom-20">
                        <Button className="detail-button" label="Detailed View" onClick={moveToDetailedView}></Button>
                    </div>
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
                        <h2 className="innovation-heading">Locations of Implementation</h2>
                        <MapChart mapData={codesImplementation} mapId="map2-innovation"></MapChart>
                    </Card>
                    <Card className="margin-bottom-40">
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Technical Field:</p>
                            <DivBuilder type="technical-field" data={innovation.technical_field}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Type of Innovation:</p>
                            <DivBuilder type="type-of-innovation-new" data={innovation.type_of_innovation_new}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Governance Type:</p>
                            <DivBuilder type="governance-type" data={governanceValues}></DivBuilder>
                        </div>
                    </Card>
                </div>
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
                        <h2 className="innovation-heading">Benefit/Impact</h2>
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
                            <div>
                                {
                                    innovation.initiative_defined_outcome.map(
                                        (item)=>{
                                            return ReactHtmlParser(item)
                                        }
                                    )

                                }
                            </div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Context</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Start Date:</p>
                            <div>{innovation.start_date}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">End Date:</p>
                            <div>{innovation.end_date}</div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Interventions working on the Innovation</h2>
                        <div>
                            <DivBuilder type="intervention-name" data={innovation.intervention_name}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Total budget of Intervention:</p>
                            {
                                budgetValues === 0?<div></div>:<div className="margin-right-7 margin-bottom-10 margin-left-5"> {budgetValues}</div>
                            }
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Challenge Statement:</p>
                            <Panel toggleable>
                                <p>{innovation.challenge_statement}</p>
                            </Panel>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Objective Statement: </p>
                            <div>{ReactHtmlParser(innovation.objective_statement)}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Description: </p>
                            <Panel toggleable>
                                {
                                    innovation.long_intervention_description.map(
                                        (item)=>{
                                            return <div className="p-mb-2">{ReactHtmlParser(item)}</div>
                                        }
                                    )
                                }
                            </Panel>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Team Members: </p>
                            <DivBuilder type="team-members" data={innovation.intervention_team_members}></DivBuilder>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Stakeholders</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Innovation Partners:</p>
                            <DivBuilder type="key-innovation-partners" data={innPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Scaling Partners:</p>
                            <DivBuilder type="key-scaling-partners" data={scalingPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Demand Partners:</p>
                            <DivBuilder type="key-demand-partners" data={demandPartnersValues}></DivBuilder>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Image of the Innovation</h2>
                        <center>
                            <img src={innovation.image_of_the_innovation} className="img-width"/>
                        </center>
                    </Card>
                </div>
            </div>
        );
    }

    //...Km Officer Innovation Displaying Function...

    const kmOfficerInnovation = () => {

        return(
            <div className="p-grid innovation-container">
                <div className="p-col-fixed sidebar-container">
                    <div className="detail-button-container margin-bottom-20">
                        <Button className="detail-button" label="Detailed View" onClick={moveToDetailedView}></Button>
                    </div>
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
                        <h2 className="innovation-heading">Locations of Implementation</h2>
                        <MapChart mapData={codesImplementation} mapId="map2-innovation"></MapChart>
                    </Card>
                </div>
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
                        <h2 className="innovation-heading">Benefit/Impact</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Description of the problem the innovation provides a solution:</p>
                            <div>{innovation.problem_the_innovation_provides_solution}</div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Context</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Start Date:</p>
                            <div>{innovation.start_date}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">End Date:</p>
                            <div>{innovation.end_date}</div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Interventions working on the Innovation</h2>
                        <div>
                            <DivBuilder type="intervention-name-long" data={innovation.intervention_name}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Total budget of Intervention:</p>
                            {
                                budgetValues === 0?<div></div>:<div className="margin-right-7 margin-bottom-10 margin-left-5"> {budgetValues}</div>
                            }
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Description: </p>
                            <Panel toggleable>
                                {
                                    innovation.long_intervention_description.map(
                                        (item)=>{
                                            return <div className="p-mb-2">{ReactHtmlParser(item)}</div>
                                        }
                                    )
                                }
                            </Panel>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Stakeholders</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Innovation Partners:</p>
                            <DivBuilder type="key-innovation-partners" data={innPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Scaling Partners:</p>
                            <DivBuilder type="key-scaling-partners" data={scalingPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Demand Partners:</p>
                            <DivBuilder type="key-demand-partners" data={demandPartnersValues}></DivBuilder>
                        </div>
                    </Card>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Image of the Innovation</h2>
                            <center>
                                <img src={innovation.image_of_the_innovation} className="img-width"/>
                            </center>
                        </Card>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        {
                            innovation.image_of_the_innovation_component.length>0?

                                <Card className="margin-bottom-40"  >
                                    <h2 className="innovation-heading">Image of the Innovation Components</h2>
                                    <Galleria
                                        value={innovation.image_of_the_innovation_component}
                                        numVisible={5} circular
                                        showIndicators
                                        showItemNavigators showThumbnails={false} item={itemTemplate2}/>
                                </Card>:console.log()
                        }
                    </div>
                </div>
            </div>
        );

    }

    //...Monitoring Officer Innovation Displaying Function...

    const monitoringOfficerInnovation = () => {

        return(
            <div className="p-grid innovation-container">
                <div className="p-col-fixed sidebar-container">
                    <div className="detail-button-container margin-bottom-20">
                        <Button className="detail-button" label="Detailed View" onClick={moveToDetailedView}></Button>
                    </div>
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
                        <h2 className="innovation-heading">Locations of Implementation</h2>
                        <MapChart mapData={codesImplementation} mapId="map2-innovation"></MapChart>
                    </Card>
                    <Card className="margin-bottom-40">
                        <div>
                            <p className="mini-headings-innovation margin-bottom-0">Keywords:</p>
                            <DivBuilder type="keywords" data={innovation.keywords}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Type of Innovation:</p>
                            <DivBuilder type="type-of-innovation-new" data={innovation.type_of_innovation_new}></DivBuilder>
                        </div>
                    </Card>
                </div>
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
                        <h2 className="innovation-heading">Benefit/Impact</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Description of the problem the innovation provides a solution:</p>
                            <div>{innovation.problem_the_innovation_provides_solution}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">SDG Target Addressed:</p>
                            <DivBuilder type="sdg-target" data={innovation.SDG_target}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block mini-headings-innovation">CGIAR Impact Target:</p>
                            <DivBuilder type="impact-target" data={innovation.CGIAR_impact_target}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block mini-headings-innovation">Initiative/Project outcome addressed:</p>
                            <div>
                                {
                                    innovation.initiative_defined_outcome.map(
                                        (item)=>{
                                            return ReactHtmlParser(item)
                                        }
                                    )

                                }
                            </div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Interventions working on the Innovation</h2>
                        <div>
                            <DivBuilder type="intervention-name-long" data={innovation.intervention_name}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Total budget of Intervention:</p>
                            {
                                budgetValues === 0?<div></div>:<div className="margin-right-7 margin-bottom-10 margin-left-5"> {budgetValues}</div>
                            }
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Challenge Statement:</p>
                            <Panel toggleable>
                                <p>{innovation.challenge_statement}</p>
                            </Panel>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Objective Statement: </p>
                            <div>{ReactHtmlParser(innovation.objective_statement)}</div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Stakeholders</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Innovation Partners:</p>
                            <DivBuilder type="key-innovation-partners" data={innPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Scaling Partners:</p>
                            <DivBuilder type="key-scaling-partners" data={scalingPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Demand Partners:</p>
                            <DivBuilder type="key-demand-partners" data={demandPartnersValues}></DivBuilder>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    //...Impact Officer Innovation Displaying Function...

    const impactOfficerInnovation = () => {

        return(
            <div className="p-grid innovation-container">
                <div className="p-col-fixed sidebar-container">
                    <div className="detail-button-container margin-bottom-20">
                        <Button className="detail-button" label="Detailed View" onClick={moveToDetailedView}></Button>
                    </div>
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
                        <h2 className="innovation-heading">Locations of Implementation</h2>
                        <MapChart mapData={codesImplementation} mapId="map2-innovation"></MapChart>
                    </Card>
                    <Card className="margin-bottom-40">
                        <div>
                            <p className="mini-headings-innovation margin-bottom-0">Keywords:</p>
                            <DivBuilder type="keywords" data={innovation.keywords}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Technical Field:</p>
                            <DivBuilder type="technical-field" data={innovation.technical_field}></DivBuilder>
                        </div>
                    </Card>
                </div>
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
                        <h2 className="innovation-heading">Benefit/Impact</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Description of the problem the innovation provides a solution:</p>
                            <div>{innovation.problem_the_innovation_provides_solution}</div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Context</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Start Date:</p>
                            <div>{innovation.start_date}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">End Date:</p>
                            <div>{innovation.end_date}</div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    //...User Innovation Displaying Function...

    const userInnovation = () => {

        return(
            <div className="p-grid innovation-container">
                <div className="p-col-fixed sidebar-container">
                    <div className="detail-button-container margin-bottom-20">
                        <Button className="detail-button" label="Detailed View" onClick={moveToDetailedView}></Button>
                    </div>
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
                        <h2 className="innovation-heading">Locations of Implementation</h2>
                        <MapChart mapData={codesImplementation} mapId="map2-innovation"></MapChart>
                    </Card>
                    <Card className="margin-bottom-40">
                        <div>
                            <p className="mini-headings-innovation margin-bottom-0">Keywords:</p>
                            <DivBuilder type="keywords" data={innovation.keywords}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Technical Field:</p>
                            <DivBuilder type="technical-field" data={innovation.technical_field}></DivBuilder>
                        </div>
                        <div className="margin-top-20">
                            <p className="mini-headings-innovation margin-bottom-0">Type of Innovation:</p>
                            <DivBuilder type="type-of-innovation-new" data={innovation.type_of_innovation_new}></DivBuilder>
                        </div>
                    </Card>
                </div>
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
                        <h2 className="innovation-heading">Benefit/Impact</h2>
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
                            <div>
                                {
                                    innovation.initiative_defined_outcome.map(
                                        (item)=>{
                                            return ReactHtmlParser(item)
                                        }
                                    )

                                }
                            </div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Context</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Start Date:</p>
                            <div>{innovation.start_date}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">End Date:</p>
                            <div>{innovation.end_date}</div>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Interventions working on the Innovation</h2>
                        <div>
                            <DivBuilder type="intervention-name" data={innovation.intervention_name}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Total budget of Intervention:</p>
                            {
                                budgetValues === 0?<div></div>:<div className="margin-right-7 margin-bottom-10 margin-left-5"> {budgetValues}</div>
                            }
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Challenge Statement:</p>
                            <div>{innovation.challenge_statement}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Objective Statement: </p>
                            <div>{ReactHtmlParser(innovation.objective_statement)}</div>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Team Members: </p>
                            <DivBuilder type="team-members" data={innovation.intervention_team_members}></DivBuilder>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Stakeholders</h2>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Innovation Partners:</p>
                            <DivBuilder type="key-innovation-partners" data={innPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Scaling Partners:</p>
                            <DivBuilder type="key-scaling-partners" data={scalingPartnersValues}></DivBuilder>
                        </div>
                        <div>
                            <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Demand Partners:</p>
                            <DivBuilder type="key-demand-partners" data={demandPartnersValues}></DivBuilder>
                        </div>
                    </Card>
                    <Card className="margin-bottom-40">
                        <h2 className="innovation-heading">Image of the Innovation</h2>
                        <center>
                            <img src={innovation.image_of_the_innovation} className="img-width"/>
                        </center>
                    </Card>
                </div>
            </div>
        );
    }

    return(
        <>
            {quickViewPages}
        </>
    );
}

export default Innovation
