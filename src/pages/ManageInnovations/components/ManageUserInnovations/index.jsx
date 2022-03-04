import React, {useEffect, useState} from 'react'
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import AdministratorService from "../../../../services/httpService/admin";
import InnovationService from "../../../../services/httpService/innovation";
import {useSelector} from "react-redux";
import {AssignAction,DeleteAction,RejectedActions} from './components'

const ManageUserInnovations = () => {

    const userData = useSelector((state) => state.userData)

    const [innovations, setInnovations] = useState()
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [assignDialog, setAssignDialog] = useState(false)
    const [rejectedDialog, setRejectedDialog] = useState(false)
    const [rejectedTimestamp ,setRejectedTimestamp] = useState('')
    const [selectedInnovationId, setSelectedInnovationId] = useState('')
    const [resfreshTrigger, setRefreshTrigger] = useState(0)
    const [reviewers, setReviewers] = useState([])
    const [reviewer, setReviewer] = useState('')

    useEffect(
        () => {
            AdministratorService.getAllInnovations(userData.user.userId)
                .then(res => {
                    console.log(res)
                    setInnovations(res.innovations)
                })
        },[resfreshTrigger]
    )

    const deleteInnovation = () => {
        InnovationService.deleteInnovation(userData.user.userId,selectedInnovationId)
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
        setSelectedInnovationId(id)
        setDeleteDialog(true);
    }

    const deleteRejectedInnovation = () => {

        InnovationService.deleteRejectedInnovation(userData.user.userId,selectedInnovationId,rejectedTimestamp)
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
        setRejectedTimestamp(data.createdAt)
        setSelectedInnovationId(data.innovId)
        setRejectedDialog(true);
    }

    const assignInnovation = () => {

        AdministratorService.assignReviewer(userData.user.userId,selectedInnovationId, reviewer.userId)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setAssignDialog(false)
    }

    const assignDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setAssignDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={assignInnovation} />
        </>
    );

    const reviewerSelection = (e) => {
        setReviewer(e.value)
    }

    const assignInnovationDialog = (id) => {
        setReviewer('')
        AdministratorService.getAllReviewers(userData.user.userId)
            .then(res => {
                console.log(res)
                setReviewers(res.reviewers)
            })
        setSelectedInnovationId(id)
        setAssignDialog(true)
    }

    const titleBody = (data) => {

        return (
            <span>{data.formData.find(item => item.id === "1.1")?.value}</span>
        )
    }

    const reviewersTemplate = (data) => {

        return data.reviewerIds.map(item => {
            return(
                <p>{item}</p>
            )
        })
    }

    const actionsTemplate = (data) =>{
        switch (data.status) {
            case "SUBMITTED": return <AssignAction data={data} deleteInnovationDialog={deleteInnovationDialog} assignInnovationDialog={assignInnovationDialog}/>
            case "UNDER_REVIEW": return
            case "ACCEPTED": return
            case "REJECTED": return <RejectedActions data={data} deleteRejectedDialog={deleteRejectedDialog}/>
            default: return <DeleteAction data={data} deleteInnovationDialog={deleteInnovationDialog}/>
        }
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

    const createdAtTemplate = (data) => {
        const date = new Date(data.createdAt)
        return (
            <div>
                <p>{date.toLocaleDateString()}</p>
                <p>{date.toLocaleTimeString()}</p>
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

    return (
        <div className='my-innovations-table'>
            <div className="peach-background-container">
                <h3>Manage/Assign Innovations</h3>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations} paginator rows={10} rowsPerPageOptions={[10,20]}>
                    <Column field='title' body={(data) => (titleBody(data))}  sortable header="Title"/>
                    <Column field="status" body={statusTemplate} sortable header="Status"/>
                    <Column field="version" sortable header="Version"/>
                    <Column field="reviewers" body={reviewersTemplate} sortable header="Reviewer"/>
                    <Column field="createdΑt" body={createdAtTemplate} sortable header="Date Created"/>
                    <Column field="updatedΑt" body={updatedAtTemplate} sortable header="Last Updated"/>
                    <Column field="actions" header="Actions" body={actionsTemplate} style={{width: "250px"}}/>
                </DataTable>
            </div>
            <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={() => setDeleteDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    <span>Are you sure you want to delete <b>Innovation</b>?</span>
                </div>
            </Dialog>
            <Dialog visible={assignDialog} style={{ width: '450px' }} header="Confirm" modal footer={assignDialogFooter} onHide={() => setAssignDialog(false)}>
                <span className='manage-users-dialog-info'>Choose a Reviewer to assign the Innovation</span>
                <Dropdown value={reviewer} options={reviewers} onChange={e => reviewerSelection(e)} optionLabel="userId" placeholder="Select a Reviewer" style={{width:'100%'}}/>
            </Dialog>
            <Dialog visible={rejectedDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRejectedDialogFooter} onHide={() => setRejectedDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to delete <b>Innovation</b>?</span>}
                </div>
            </Dialog>
        </div>
    )
}

export default ManageUserInnovations
