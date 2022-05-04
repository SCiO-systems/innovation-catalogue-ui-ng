import React, {useState,useEffect} from 'react'
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";
import { InputTextarea } from 'primereact/inputtextarea';
import ScalingReadinessExpertService from "../../../../services/httpService/scalingReadinessExpert";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../reducer/actions";
import {useNavigate} from "react-router-dom";
import InnovationService from "../../../../services/httpService/innovation";


const SRAssignments = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userData)

    const setBenefitImpactValues = (payload) => dispatch({ type: Actions.SetBenefitImpactValues, payload });
    const setContextValues = (payload) => dispatch({ type: Actions.SetContextValues, payload });
    const setDescriptionValues = (payload) => dispatch({ type: Actions.SetDescriptionValues, payload });
    const setEvidenceValues = (payload) => dispatch({ type: Actions.SetEvidenceValues, payload });
    const setIntellectualPropertyValues = (payload) => dispatch({ type: Actions.SetIntellectualPropertyValues, payload });
    const setInterventionsValues = (payload) => dispatch({ type: Actions.SetInterventionsValues, payload });
    const setInvestmentValues = (payload) => dispatch({ type: Actions.SetInvestmentValues, payload });
    const setReadinessValues = (payload) => dispatch({ type: Actions.SetReadinessValues, payload });
    const setStakeholdersValues = (payload) => dispatch({ type: Actions.SetStakeholdersValues, payload });
    const setEditingInnovation = (payload) => dispatch({ type: Actions.SetEditingInnovation, payload });

    const innovations = useSelector((state) => state.innovations)
    const setInnovations = (payload) => dispatch({ type: Actions.SetInnovations, payload });

    const setViewing = (payload) => dispatch({ type: Actions.SetViewing, payload });

    const setPreviewedInnovation = (payload) => dispatch({ type: Actions.SetPreviewedInnovation, payload });

    const [resfreshTrigger, setRefreshTrigger] = useState(0)
    const [selectedInnovationId, setSelectedInnovationId] = useState('')
    const [publishDialog, setPublishDialog] = useState(false)

    useEffect(
        () => {
            ScalingReadinessExpertService.getAssignedInnovations(userData.user.userId)
                .then(res => {
                    setInnovations(res.innovations)
                })
        },[resfreshTrigger]
    )

    const publishInnovation = () => {
        InnovationService.publishInnovation(userData.user.userId,selectedInnovationId)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setPublishDialog(false)
    }

    const publishDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setPublishDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={publishInnovation} />
        </>
    );

    const publishInnovationDialog = (id) => {
        setSelectedInnovationId(id)
        setPublishDialog(true);
    }

    const editInnovation = (id) => {

        const innovation = innovations.find(item => item.innovId === id)

        window.localStorage.setItem('descriptionValues', JSON.stringify(innovation.formData.filter(item => item.id[0] === '1')))
        window.localStorage.setItem('benefitImpactValues',JSON.stringify(innovation.formData.filter(item => item.id[0] === '2')))
        window.localStorage.setItem('contextValues',JSON.stringify(innovation.formData.filter(item => item.id[0] === '3')))
        window.localStorage.setItem('evidenceValues',JSON.stringify(innovation.formData.filter(item => item.id[0] === '4')))
        window.localStorage.setItem('intellectualPropertyValues',JSON.stringify(innovation.formData.filter(item => item.id[0] === '5')))
        window.localStorage.setItem('interventionsValues',JSON.stringify(innovation.formData.filter(item => item.id[0] === '6')))
        window.localStorage.setItem('investmentValues',JSON.stringify(innovation.formData.filter(item => item.id[0] === '7')))
        window.localStorage.setItem('readinessValues',JSON.stringify(innovation.formData.filter(item => item.id[0] === '8')))
        window.localStorage.setItem('stakeholdersValues',JSON.stringify(innovation.formData.filter(item => item.id[0] === '9')))

        setDescriptionValues(innovation.formData.filter(item => item.id[0] === '1'))
        setBenefitImpactValues(innovation.formData.filter(item => item.id[0] === '2'))
        setContextValues(innovation.formData.filter(item => item.id[0] === '3'))
        setEvidenceValues(innovation.formData.filter(item => item.id[0] === '4'))
        setIntellectualPropertyValues(innovation.formData.filter(item => item.id[0] === '5'))
        setInterventionsValues(innovation.formData.filter(item => item.id[0] === '6'))
        setInvestmentValues(innovation.formData.filter(item => item.id[0] === '7'))
        setReadinessValues(innovation.formData.filter(item => item.id[0] === '8'))
        setStakeholdersValues(innovation.formData.filter(item => item.id[0] === '9'))

        setEditingInnovation({id,status: innovation.status})
        setViewing(true)

        navigate('/add-innovation')
    }


    const viewInnovation = (data) => {
        window.localStorage.setItem('previewedInnovation', JSON.stringify(data))
        setPreviewedInnovation(data)
        navigate('/preview')
    }

    const titleBody = (data) => {

        return (
            <p id='innovation-title' onClick={() => viewInnovation(data)} >{data.formData.find(item => item.id === "1.1")?.value}</p>
        )
    }

    const actionsTemplate = (data) =>{

        return(
            <div>
                <Tooltip target=".button-edit"  position="right"/>
                <span className="button-edit" data-pr-tooltip="Edit">
                    <Button icon="fad fa-pencil fa-lg" className="button-edit-table margin-right" onClick={(e) => editInnovation(data.innovId)}/>
                </span>
                <Tooltip target=".button-publish"  position="right"/>
                <span className="button-publish" data-pr-tooltip="Publish">
                    <Button icon="fa-solid fa-check fa-lg" className="button-publish-table margin-right" onClick={() =>  publishInnovationDialog(data.innovId)}/>
                </span>
            </div>
        )
    }

    const updatedAtTemplate = (data) => {
        const date = new Date(data.updatedAt)
        return (
            <div>
                <p>{date.toLocaleDateString()}</p>
                <p>{date.toLocaleTimeString()}</p>
            </div>
        )
    }

    const statusTemplate = (data) => {

        switch (data.status) {
            case "UNDER_SR_ASSESSMENT": return <p>SR Assessment Pending</p>
            default: return <p>{data.status}</p>
        }
    }

    return (
        <div className='my-innovations-table'>
            <div className="peach-background-container">
                <h3>My SR Assignments</h3>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations} paginator rows={10} rowsPerPageOptions={[10,20]}>
                    <Column field='title' body={(data) => (titleBody(data))}  sortable header="Title"/>
                    <Column field="status" body={statusTemplate} sortable header="Status"/>
                    <Column field="updatedΑt" body={updatedAtTemplate} sortable header="Date Assigned"/>
                    <Column field="actions" header="Actions" body={actionsTemplate} style={{width: "250px"}}/>
                </DataTable>
            </div>
            <Dialog visible={publishDialog} style={{ width: '450px' }} header="Confirm" modal footer={publishDialogFooter} onHide={() => setPublishDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to publish the <b>Innovation</b>?</span>}
                </div>
            </Dialog>
        </div>
    )
}

export default SRAssignments
