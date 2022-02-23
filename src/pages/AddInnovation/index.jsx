import React, {useEffect, useState} from "react";
import {Steps} from "primereact/steps";
import {Card} from "primereact/card";
import {StepsForms, Forms} from "./components";
import ResultsService from "../../services/ResultsService";
import {Button} from "primereact/button";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reducer/actions";
import {insertInnovation,editInnovation} from '../../services/httpService/innovation'

const AddInnovation = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const csrfToken = useSelector((state) => state.csrfToken)

    const step = useSelector((state) => state.step)
    const setStep = (payload) => dispatch({ type: Actions.SetStep, payload });

    const results = useSelector((state) => state.results)
    const setResults = (payload) => dispatch({ type: Actions.SetResults, payload });

    const setAccordionData = (payload) => dispatch({ type: Actions.SetAccordionData, payload });

    const userData = useSelector((state) => state.userData)

    const resultService = new ResultsService();
    const myInnovationsUrl = "/innovations";

    const benefitImpactValues = useSelector((state) => state.benefitImpactValues)
    const setBenefitImpactValues = (payload) => dispatch({ type: Actions.SetBenefitImpactValues, payload });

    const contextValues = useSelector((state) => state.contextValues)
    const setContextValues = (payload) => dispatch({ type: Actions.SetContextValues, payload });

    const descriptionValues = useSelector((state) => state.descriptionValues)
    const setDescriptionValues = (payload) => dispatch({ type: Actions.SetDescriptionValues, payload });

    const evidenceValues = useSelector((state) => state.evidenceValues)
    const setEvidenceValues = (payload) => dispatch({ type: Actions.SetEvidenceValues, payload });

    const intellectualPropertyValues = useSelector((state) => state.intellectualPropertyValues)
    const setIntellectualPropertyValues = (payload) => dispatch({ type: Actions.SetIntellectualPropertyValues, payload });

    const interventionsValues = useSelector((state) => state.interventionsValues)
    const setInterventionsValues = (payload) => dispatch({ type: Actions.SetInterventionsValues, payload });

    const investmentValues = useSelector((state) => state.investmentValues)
    const setInvestmentValues = (payload) => dispatch({ type: Actions.SetInvestmentValues, payload });

    const readinessValues = useSelector((state) => state.readinessValues)
    const setReadinessValues = (payload) => dispatch({ type: Actions.SetReadinessValues, payload });

    const stakeholdersValues = useSelector((state) => state.stakeholdersValues)
    const setStakeholdersValues = (payload) => dispatch({ type: Actions.SetStakeholdersValues, payload });

    const innovations = useSelector((state) => state.innovations)
    const setInnovations = (payload) => dispatch({ type: Actions.SetInnovations, payload });

    const editingInnovation = useSelector((state) => state.editingInnovation)
    const setEditingInnovation = (payload) => dispatch({ type: Actions.SetEditingInnovation, payload });

    const resetInnovation = () => {

        setDescriptionValues([])
        setBenefitImpactValues([])
        setContextValues([])
        setEvidenceValues([])
        setIntellectualPropertyValues([])
        setInterventionsValues([])
        setInvestmentValues([])
        setReadinessValues([])
        setStakeholdersValues([])

        window.localStorage.removeItem('descriptionValues')
        window.localStorage.removeItem('benefitImpactValues')
        window.localStorage.removeItem('contextValues')
        window.localStorage.removeItem('evidenceValues')
        window.localStorage.removeItem('intellectualPropertyValues')
        window.localStorage.removeItem('interventionsValues')
        window.localStorage.removeItem('investmentValues')
        window.localStorage.removeItem('readinessValues')
        window.localStorage.removeItem('stakeholdersValues')
    }

    useEffect(() => {

        // let storage = window.localStorage.getItem('descriptionValues')
        // if (storage) setDescriptionValues(JSON.parse(storage))
        // storage = window.localStorage.getItem('benefitImpactValues')
        // if (storage) setBenefitImpactValues(JSON.parse(storage))
        // storage = window.localStorage.getItem('contextValues')
        // if (storage) setContextValues(JSON.parse(storage))
        // storage = window.localStorage.getItem('evidenceValues')
        // if (storage) setEvidenceValues(JSON.parse(storage))
        // storage = window.localStorage.getItem('intellectualPropertyValues')
        // if (storage) setIntellectualPropertyValues(JSON.parse(storage))
        // storage = window.localStorage.getItem('interventionsValues')
        // if (storage) setInterventionsValues(JSON.parse(storage))
        // storage = window.localStorage.getItem('investmentValues')
        // if (storage) setInvestmentValues(JSON.parse(storage))
        // storage = window.localStorage.getItem('readinessValues')
        // if (storage) setReadinessValues(JSON.parse(storage))
        // storage = window.localStorage.getItem('stakeholdersValues')
        // if (storage) setStakeholdersValues(JSON.parse(storage))

        resultService.getResults()
            .then(data => setResults(data));

        resultService.getSteps()
            .then(data => setAccordionData(data));
    },[]);

    // useEffect(
    //     () => {
    //         if(editingInnovation === '') {
    //             resetInnovation()
    //         }
    //     }, [editingInnovation]
    // )

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

    const addInnovation = () => {
        const allFields = [...benefitImpactValues, ...contextValues, ...descriptionValues, ...evidenceValues, ...intellectualPropertyValues, ...interventionsValues, ...investmentValues, ...readinessValues, ...stakeholdersValues]
        const mandatoryFields = allFields.filter(item => item.mandatory === true)
        const invalidFields = mandatoryFields.filter(item => item.valid === false)
        let status
        if (invalidFields.length === 0 ) {
            status = 'READY'
        } else {
            status = 'DRAFT'
        }

        insertInnovation(csrfToken, userData.user.userId, allFields,status)

        resetInnovation()

        navigate(myInnovationsUrl)
    }

    const editInnovation = () => {

        const innovation = innovations.find(item => item.innovId === editingInnovation)

        const allFields = [...benefitImpactValues, ...contextValues, ...descriptionValues, ...evidenceValues, ...intellectualPropertyValues, ...interventionsValues, ...investmentValues, ...readinessValues, ...stakeholdersValues]
        const mandatoryFields = allFields.filter(item => item.mandatory === true)
        const invalidFields = mandatoryFields.filter(item => item.valid === false)
        let status
        if (invalidFields.length === 0 ) {
            status = 'READY'
        } else {
            status = 'DRAFT'
        }

        const body = {
            form_data: JSON.stringify(allFields),
            innovation_id: innovation.innovId,
            status: status,
            user_id: userData.user.userId
        }

        fetch(`${process.env.REACT_APP_DOMAIN_URL}/rtb-refactored/api/innovation/edit`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfToken,
            },
            body: JSON.stringify(body),
            credentials: "include",
            mode: "cors"
        })

        // editInnovation(csrfToken, allFields,innovation.innovId ,status, userData.user.userId)

        resetInnovation()

        setEditingInnovation('')

        navigate(myInnovationsUrl)
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
                                (
                                    editingInnovation? <Button icon="fad fa-plus fa-lg" label="Edit Innovation" iconPos="right" className="next-step-button" onClick={editInnovation}/>:
                                    <Button icon="fad fa-plus fa-lg" label="Add Innovation" iconPos="right" className="next-step-button" onClick={addInnovation}/>
                                ) : <></>
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
