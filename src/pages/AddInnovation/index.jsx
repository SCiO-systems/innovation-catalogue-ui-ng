import React, {useEffect, useState} from "react";
import {Steps} from "primereact/steps";
import {Card} from "primereact/card";
import {StepsForms, Forms} from "./components";
import ResultsService from "../../services/ResultsService";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reducer/actions";

const AddInnovation = () => {

    const dispatch = useDispatch();

    const step = useSelector((state) => state.step)
    const setStep = (payload) => dispatch({ type: Actions.SetStep, payload });

    const results = useSelector((state) => state.results)
    const setResults = (payload) => dispatch({ type: Actions.SetResults, payload });

    const setAccordionData = (payload) => dispatch({ type: Actions.SetAccordionData, payload });

    const resultService = new ResultsService();
    const myInnovationsUrl = "/innovations";

    const benefitImpactValues = useSelector((state) => state.benefitImpactValues)

    const contextValues = useSelector((state) => state.contextValues)

    const descriptionValues = useSelector((state) => state.descriptionValues)

    const evidenceValues = useSelector((state) => state.evidenceValues)

    const intellectualPropertyValues = useSelector((state) => state.intellectualPropertyValues)

    const interventionsValues = useSelector((state) => state.interventionsValues)

    const investmentValues = useSelector((state) => state.investmentValues)

    const readinessValues = useSelector((state) => state.readinessValues)

    const stakeholdersValues = useSelector((state) => state.stakeholdersValues)

    useEffect(() => {

        resultService.getResults()
            .then(data => setResults(data));

        resultService.getSteps()
            .then(data => setAccordionData(data));
    },[]);

    const items = [
        {label: 'Description'},
        {label: 'Benefit/Impact'},
        {label: 'Context'},
        {label: 'Evidence'},
        {label: 'Intellectual Property'},
        {label: 'Interventions'},
        {label: 'Investment'},
        {label: 'Readiness'},
        {label: 'Stakeholders'}
    ];

    const buttonNextHandler = () => {
        if(step < items.length -1){
            setStep(step + 1)
        }
    }

    const buttonPrevHandler = () => {
        if(step > 0){
            setStep(step - 1)
        }
    }

    const renderPage = () => {

        return(
            <div>
                <div className="peach-background-container">
                    <h3>Add innovation</h3>
                </div>
                <div className="steps-container">
                    <Card className="steps-padding step-card">
                        <Steps model={items} activeIndex={step} onSelect={(e) => setStep(e.index)} readOnly={false} />
                    </Card>
                </div>
                <div className="step-1 steps-forms-container">
                    <Card className="forms-card steps-card">
                        <StepsForms activeIndex={step} results={results.summaries}/>
                        <Forms />
                    </Card>
                    <Card className="margin-bottom-80 buttons-card-steps steps-card">
                        <div className="p-grid p-justify-around">
                            <Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={buttonPrevHandler}></Button>
                            {step < items.length -1 ? <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button" onClick={buttonNextHandler}></Button>:console.log()}
                            {
                                step === 8 ?
                                <Link to={myInnovationsUrl}>
                                    <Button icon="fad fa-plus fa-lg" label="Add Innovation" iconPos="right" className="next-step-button"></Button>
                                </Link>:console.log()
                            }
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return(
       <>
           {results?renderPage():console.log()}
       </>
    );
}

export default AddInnovation
