import React, {useState,useEffect} from 'react'
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";
import { InputTextarea } from 'primereact/inputtextarea';
import ReviewerService from "../../../../services/httpService/reviewer";
import InnovationService from '../../../../services/httpService/innovation'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../reducer/actions";
import {useNavigate} from "react-router-dom";


const AssignedInnovations = () => {

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

    const setViewing = (payload) => dispatch({ type: Actions.SetViewing, payload });

    const setPreviewedInnovation = (payload) => dispatch({ type: Actions.SetPreviewedInnovation, payload });

    const innovations = useSelector((state) => state.innovations)
    const setInnovations = (payload) => dispatch({ type: Actions.SetInnovations, payload });

    const [resfreshTrigger, setRefreshTrigger] = useState(0)
    const [selectedInnovationId, setSelectedInnovationId] = useState('')
    const [comments, setComments] = useState('')

    const [requestRevisionDialog, setRequestRevisionDialog] = useState(false)
    const [approveDialog, setApproveDialog] = useState(false)
    const [viewCommentsDialog, setViewCommentsDialog] = useState(false)

    useEffect(
        () => {
            ReviewerService.getAssignedInnovations(userData.user.userId)
                .then(res => {
                    setInnovations(res.innovations)
                })
        },[resfreshTrigger]
    )

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
        setViewing(false)

        navigate('/add-innovation')
    }

    const requestRevisionInnovation = () => {
        InnovationService.requestRevision(userData.user.userId,selectedInnovationId,comments)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setRequestRevisionDialog(false)
    }

    const addComments = () => {
        InnovationService.addComment(userData.user.userId,selectedInnovationId,comments)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setRequestRevisionDialog(false)
    }

    const revisionDialogFooter = (
        <>
            <Button label="Save Comments"  className="p-button-text" onClick={addComments} />
            <Button label="Request Revision"  className="p-button-text" onClick={requestRevisionInnovation} />
        </>
    );

    const revisionDialog = (data) => {
        if (!data.comments) {
            setComments('')
        } else {
            setComments(data.comments)
        }
        setSelectedInnovationId(data.innovId)
        setRequestRevisionDialog(true)
    }

    const viewCommentsFooter = (
        <>
            <Button label="OK"  className="p-button-text" onClick={() => setViewCommentsDialog(false)} />
        </>
    );

    const approveInnovation = () => {
        InnovationService.approveInnovation(userData.user.userId,selectedInnovationId)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setApproveDialog(false)
    }

    const approveDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setApproveDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={approveInnovation} />
        </>
    );

    const approveInnovationDialog = (data) => {
        setSelectedInnovationId(data.innovId)
        setApproveDialog(true)
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
                <Tooltip target=".button-review"  position="right"/>
                <span className="button-review" data-pr-tooltip="Request Revision">
                    <Button icon="fa-solid fa-plus fa-lg" className="button-review-table margin-right" onClick={() =>  revisionDialog(data)}/>
                </span>
                <Tooltip target=".button-edit"  position="right"/>
                <span className="button-edit" data-pr-tooltip="Edit">
                    <Button icon="fad fa-pencil fa-lg" className="button-edit-table margin-right" onClick={(e) => editInnovation(data.innovId)}/>
                </span>
                <Tooltip target=".button-approve"  position="right"/>
                <span className="button-approve" data-pr-tooltip="Approve">
                    <Button icon="fa-solid fa-check fa-lg" className="button-approve-table margin-right" onClick={() =>  approveInnovationDialog(data)}/>
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

    const commentsBody = (data) => {
        return (
            <p id='innovation-title' onClick={() => {
                setComments(data.comments || comments || '')
                setViewCommentsDialog(true)
            }} >View Comments</p>
        )
    }

    return (
        <div className='my-innovations-table'>
            <div className="peach-background-container">
                <h3>My Review Assignments</h3>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations} paginator rows={10} rowsPerPageOptions={[10,20]}>
                    <Column field='title' body={(data) => (titleBody(data))}  sortable header="Title"/>
                    <Column field="comments" body={(data) => (commentsBody(data))}  header="Comments"/>
                    <Column field="updatedΑt" body={updatedAtTemplate} sortable header="Last Updated"/>
                    <Column field="actions" header="Actions" body={actionsTemplate} style={{width: "250px"}}/>
                </DataTable>
            </div>
            <Dialog visible={requestRevisionDialog} style={{ width: '450px' }} header="Confirm" modal footer={revisionDialogFooter} onHide={() => setRequestRevisionDialog(false)}>
                <div className="confirmation-content">
                    <span className='manage-users-dialog-info'>Write your comments and request a revision of the Innovation or save your comments as draft</span>
                    <InputTextarea autoResize value={comments} onChange={(e) => setComments(e.target.value)} style={{width:'100%', maxWidth: '100%'}}/>
                </div>
            </Dialog>
            <Dialog visible={viewCommentsDialog} style={{ width: '450px' }} header="Comments" modal footer={viewCommentsFooter} onHide={() => setViewCommentsDialog(false)}>
                <div className="confirmation-content">
                    <InputTextarea disabled value={comments} autoResize style={{width:'100%', maxWidth: '100%'}}/>
                </div>
            </Dialog>
            <Dialog visible={approveDialog} style={{ width: '450px' }} header="Confirm" modal footer={approveDialogFooter} onHide={() => setApproveDialog(false)}>
                <div className="confirmation-content">
                    <span className='manage-users-dialog-info'>Are you sure you want to approve the <b>Innovation</b>?</span>
                </div>
            </Dialog>
        </div>
    )
}

export default AssignedInnovations
