import React, {useEffect, useState} from "react";
import {Steps} from "primereact/steps";
import {Card} from "primereact/card";
import {StepsForms, Forms} from "./components";
import {Button} from "primereact/button";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reducer/actions";
import InnovationService from '../../services/httpService/innovation'

const AddInnovation = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const csrfToken = useSelector((state) => state.csrfToken)

    const step = useSelector((state) => state.step)
    const setStep = (payload) => dispatch({ type: Actions.SetStep, payload });

    const results = useSelector((state) => state.results)
    const setResults = (payload) => dispatch({ type: Actions.SetResults, payload });

    const userData = useSelector((state) => state.userData)

    const myInnovationsUrl = "/innovations";

    const viewing = useSelector((state) => state.viewing)

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

        fetch(`${process.env.REACT_APP_RELAY_URL}/rtb-refactored/api/clarisaResults`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "xsrf-token": csrfToken,
            },
            credentials: "include",
            mode: 'cors'
        })
            .then(async res => {
                const result = await res.text()
                console.log(result)
                setResults((JSON).parse(result))
            })
            .catch(err => console.log(err))

    },[csrfToken]);

    useEffect(
        () => {
            setStep(0)
            if (viewing) setStep(8)
        }, []
    )

    const items = [
        {label: 'Description'},
        {label: 'Benefit/Impact'},
        {label: 'Context'},
        {label: 'Evidence'},
        {label: 'Intellectual Property'},
        {label: 'Interventions'},
        {label: 'Investment'},
        {label: 'Stakeholders'},
    ];

    const sreItems = [
        {label: 'Description'},
        {label: 'Benefit/Impact'},
        {label: 'Context'},
        {label: 'Evidence'},
        {label: 'Intellectual Property'},
        {label: 'Interventions'},
        {label: 'Investment'},
        {label: 'Stakeholders'},
        {label: 'Readiness'}
    ]

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
        let status
        const allFields = [...benefitImpactValues, ...contextValues, ...descriptionValues, ...evidenceValues, ...intellectualPropertyValues, ...interventionsValues, ...investmentValues, ...readinessValues, ...stakeholdersValues]
        const mandatoryFields = allFields.filter(item => item.mandatory === true)
        const invalidFields = mandatoryFields.filter(item => item.valid === false)
        if ((descriptionValues.length === 0) || (benefitImpactValues.length === 0) || (contextValues.length === 0)  || (stakeholdersValues.length === 0)) {
            status = "DRAFT"
        } else {
            if (invalidFields.length === 0 ) {
                status = 'READY'
            } else {
                status = 'DRAFT'
            }
        }
        InnovationService.insertInnovation(userData.user.userId, allFields,status)
            .then(() => {
                resetInnovation()
                navigate(myInnovationsUrl)
            })
    }

    const editInnovation = () => {

        const innovation = innovations.find(item => ((item.innovId === editingInnovation.id) && (item.status === editingInnovation.status)))

        let status
        const allFields = [...benefitImpactValues, ...contextValues, ...descriptionValues, ...evidenceValues, ...intellectualPropertyValues, ...interventionsValues, ...investmentValues, ...readinessValues, ...stakeholdersValues]
        const mandatoryFields = allFields.filter(item => item.mandatory === true)
        const invalidFields = mandatoryFields.filter(item => item.valid === false)
        if ((descriptionValues.length === 0) || (benefitImpactValues.length === 0) || (contextValues.length === 0) || (stakeholdersValues.length === 0)) {
            status = "DRAFT"
        } else {
            if (invalidFields.length === 0 ) {
                status = 'READY'
            } else {
                status = 'DRAFT'
            }
        }
        console.log(innovation.status)
        if (innovation.status === 'UNDER_REVIEW' || innovation.status === 'UNDER_SR_ASSESSMENT' || innovation.status === "REVISIONS_REQUESTED") {
            status = innovation.status
        }
        console.log(status)
        InnovationService.editInnovation(allFields,innovation.innovId ,status, userData.user.userId)
            .then(() => {
                resetInnovation()
                setEditingInnovation({})
                navigate(myInnovationsUrl)
            })
    }

    const renderPage = () => {

        return(
            <div>
                <div className="peach-background-container">
                    <h3>Add innovation</h3>
                </div>
                <div className="steps-container">
                    <Card className="steps-padding step-card">
                        <Steps model={viewing? sreItems : items} activeIndex={step} onSelect={(e) => setStep(e.index)} readOnly={false} />
                    </Card>
                </div>
                <div className="step-1 steps-forms-container">
                    <Card className="forms-card steps-card">
                        <Forms />
                    </Card>
                    <Card className="margin-bottom-80 buttons-card-steps steps-card">
                        <div className="p-grid p-justify-around">
                            <Button icon="fad fa-chevron-left fa-lg" label="Previous" iconPos="left" className="next-step-button" onClick={buttonPrevHandler}></Button>
                            {step < items.length -1 ? <Button icon="fad fa-chevron-right fa-lg" label="Next" iconPos="right" className="next-step-button" onClick={buttonNextHandler}></Button>:console.log()}
                            {viewing ?
                                (
                                    step === 8 ?
                                    (
                                        editingInnovation? <Button icon="fad fa-plus fa-lg" label="Edit Innovation" iconPos="right" className="next-step-button" onClick={editInnovation}/>:
                                            <Button icon="fad fa-plus fa-lg" label="Add Innovation" iconPos="right" className="next-step-button" onClick={addInnovation}/>
                                    ) : <></>
                                ) : (
                                    step === 7 ?
                                        (
                                            editingInnovation? <Button icon="fad fa-plus fa-lg" label="Edit Innovation" iconPos="right" className="next-step-button" onClick={editInnovation}/>:
                                                <Button icon="fad fa-plus fa-lg" label="Add Innovation" iconPos="right" className="next-step-button" onClick={addInnovation}/>
                                        ) : <></>
                                )

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
