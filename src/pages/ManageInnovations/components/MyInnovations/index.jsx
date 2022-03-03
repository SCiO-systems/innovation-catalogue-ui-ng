import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {useNavigate} from "react-router-dom";
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../reducer/actions";
import {DraftActions, ReadyActions,RejectedActions,AcceptedActions} from './components'
import UserService from '../../../../services/httpService2/user'
import InnovationService from '../../../../services/httpService2/innovation'

const MyInnovations = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userData)

    const innovations = useSelector((state) => state.innovations)
    const setInnovations = (payload) => dispatch({ type: Actions.SetInnovations, payload });

    const setBenefitImpactValues = (payload) => dispatch({ type: Actions.SetBenefitImpactValues, payload });

    const setContextValues = (payload) => dispatch({ type: Actions.SetContextValues, payload });

    const setDescriptionValues = (payload) => dispatch({ type: Actions.SetDescriptionValues, payload });

    const setEvidenceValues = (payload) => dispatch({ type: Actions.SetEvidenceValues, payload });

    const setIntellectualPropertyValues = (payload) => dispatch({ type: Actions.SetIntellectualPropertyValues, payload });

    const setInterventionsValues = (payload) => dispatch({ type: Actions.SetInterventionsValues, payload });

    const setInvestmentValues = (payload) => dispatch({ type: Actions.SetInvestmentValues, payload });

    const setReadinessValues = (payload) => dispatch({ type: Actions.SetReadinessValues, payload });

    const setStakeholdersValues = (payload) => dispatch({ type: Actions.SetStakeholdersValues, payload });

    const editingInnovation = useSelector((state) => state.editingInnovation)
    const setEditingInnovation = (payload) => dispatch({ type: Actions.SetEditingInnovation, payload });

    const [deleteInnovationId, setDeleteInnovationId] = useState('')
    const [resfreshTrigger, setRefreshTrigger] = useState(0)
    const [rejectedTimestamp ,setRejectedTimestamp] = useState('')

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [rejectedDialog, setRejectedDialog] = useState(false)

    const descriptorsUrl = '/descriptors/';

    useEffect(
        () => {
            UserService.getAllUserInnovations(userData.user.userId)
                .then(res => {
                    setInnovations(res.innovations)
                })
        },[resfreshTrigger]
    )

    const deleteInnovation = () => {

        InnovationService.deleteInnovation(userData.user.userId,deleteInnovationId)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setDeleteDialog(false);
    }

    const deleteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteInnovation} />
        </>
    );

    const deleteInnovationDialog = (id) => {
        setDeleteInnovationId(id)
        setDeleteDialog(true);
    }

    const deleteRejectedInnovation = () => {

        InnovationService.deleteRejectedInnovation(userData.user.userId,deleteInnovationId,rejectedTimestamp)
            .then((res) => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setRejectedDialog(false);
    }

    const deleteRejectedDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setRejectedDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteRejectedInnovation} />
        </>
    );

    const deleteRejectedDialog = (data) => {
        setRejectedTimestamp(data.timestamp)
        setDeleteInnovationId(data.innovId)
        setRejectedDialog(true);
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

        setEditingInnovation(id)

        navigate('/add-innovation')
    }

    const updateVersion = (data) => {

        InnovationService.updateVersionInnovation(userData.user.userId,data.innovId,"DRAFT",data.formData,data.version)
            .then((res) => {
                if (res.errorMessage === 'New version of innovation already existing in Draft or Ready status') {
                    return
                } else {
                    UserService.getAllUserInnovations(userData.user.userId)
                        .then(res => {
                            setInnovations(res.innovations)
                        })
                        .then(() => {
                            editInnovation(data.innovId)
                        })
                }
            })
    }

    const submitInnovation = (id) => {

        InnovationService.submitInnovation(userData.user.userId,id)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
    }

    const actionsTemplate = (data) => {

        switch (data.status) {
            case "DRAFT": return <DraftActions data={data} editInnovation={editInnovation} deleteInnovationDialog={deleteInnovationDialog}/>
            case "READY": return <ReadyActions data={data} editInnovation={editInnovation} deleteInnovationDialog={deleteInnovationDialog} submitInnovation={submitInnovation}/>
            case "REJECTED": return <RejectedActions data={data} deleteRejectedDialog={deleteRejectedDialog}/>
            case "ACCEPTED": return <AcceptedActions data={data} updateVersion={updateVersion}/>
            default: return <></>
        }

    }

    const titleBody = (data) => {

        return (
            <span>{data.formData.find(item => item.id === "1.1").value}</span>
        )
    }

    const statusTemplate = (data) => {

        switch (data.status) {
            case "DRAFT": return <p>Draft</p>
            case "READY": return <p>Ready</p>
            case "SUBMITTED": return <p>Submitted</p>
            case "UNDER_REVIEW": return <p>Under Review</p>
            case "ACCEPTED": return <p>Accepted</p>
            case "REJECTED": return <p>Rejected</p>
            default: return <p>{data.status}</p>
        }
    }

    return (
        <div className='my-innovations-table'>
            <div className="peach-background-container">
                <h3>My innovations</h3>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations} paginator rows={10} rowsPerPageOptions={[10,20]}>
                    <Column field='title' body={(data) => (titleBody(data))}  sortable header="Title"/>
                    {/*<Column field="editing-rights"  sortable header="Editing Rights"/>*/}
                    <Column field="status" body={statusTemplate} sortable header="Status"/>
                    <Column field="version" sortable header="Version"/>
                    <Column field="comments"  sortable header="Reviewer's Comments"/>
                    <Column field="created_at" sortable header="Date Submitted"/>
                    <Column field="updated_at" sortable header="Last Updated"/>
                    <Column field="actions" header="Actions" body={actionsTemplate} style={{width: "250px"}}/>
                </DataTable>
            </div>
            <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={() => setDeleteDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to delete <b>Innovation</b>?</span>}
                </div>
            </Dialog>
            <Dialog visible={rejectedDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRejectedDialogFooter} onHide={() => setRejectedDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to delete <b>Innovation</b>?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default MyInnovations
