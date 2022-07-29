import React, {useEffect, useState} from 'react'
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import { AutoComplete } from 'primereact/autocomplete';
import AdministratorService from "../../../../services/httpService/admin";
import InnovationService from "../../../../services/httpService/innovation";
import {useDispatch, useSelector} from "react-redux";
import {AssignAction,DeleteAction,RejectedActions,FinalAction} from './components'
import {useNavigate} from "react-router-dom";
import {Actions} from "../../../../reducer/actions";
import {InputTextarea} from "primereact/inputtextarea";

const ManageUserInnovations = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userData)

    const setPreviewedInnovation = (payload) => dispatch({ type: Actions.SetPreviewedInnovation, payload });

    const [innovations, setInnovations] = useState()
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [assignDialog, setAssignDialog] = useState(false)
    const [rejectedDialog, setRejectedDialog] = useState(false)
    const [assignSreDialog, setAssignSreDialog] = useState(false)
    const [publishDialog, setPublishDialog] = useState(false)
    const [rejectDialog, setRejectDialog] = useState(false)
    const [rejectedTimestamp ,setRejectedTimestamp] = useState('')
    const [selectedInnovationId, setSelectedInnovationId] = useState('')
    const [resfreshTrigger, setRefreshTrigger] = useState(0)
    const [reviewers, setReviewers] = useState([])
    const [filteredReviewers, setFilteredReviewers] = useState([])
    const [reviewer, setReviewer] = useState('')
    const [scalingReadinessExpert, setScalinReadinessExpert] = useState('')
    const [scalingReadinessExperts, setScalinReadinessExperts] = useState([])
    const [filteredScalingReadinessExperts, setFilteredScalinReadinessExperts] = useState([])
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState('')
    const [viewCommentsDialog, setViewCommentsDialog] = useState(false)

    useEffect(() => {
        loadLazyData();
    },[resfreshTrigger])

    const loadLazyData = () => {
        setLoading(true);

        AdministratorService.getAllInnovations(userData.user.userId)
            .then(res => {
                setInnovations(res.innovations)
                setLoading(false);
            })
    }

    const rejectInnovation = () => {
        InnovationService.rejectInnovation(userData.user.userId,selectedInnovationId)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setRejectDialog(false)
    }

    const rejectDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setRejectDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={rejectInnovation} />
        </>
    );

    const rejectInnovationDialog = (id) => {
        setSelectedInnovationId(id)
        setRejectDialog(true);
    }

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

    const assignSre = () => {
        AdministratorService.assignSre(userData.user.userId,selectedInnovationId, scalingReadinessExpert.userId)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setAssignSreDialog(false)
    }

    const assignSreDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setAssignSreDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={assignSre} />
        </>
    );

    const assignSreInnovationDialog = (id) => {
        setScalinReadinessExpert('')
        AdministratorService.getAllScalingReadinessExperts(userData.user.userId)
            .then(res => {
                setScalinReadinessExperts(res.reviewers)
            })
        setSelectedInnovationId(id)
        setAssignSreDialog(true);
    }

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
        const reviewer_ids = reviewer.map(item => {
            return item.userId
        })
        AdministratorService.assignReviewers(userData.user.userId,selectedInnovationId, reviewer_ids)
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

    const assignInnovationDialog = (id) => {
        setReviewer('')
        AdministratorService.getAllReviewers(userData.user.userId)
            .then(res => {
                setReviewers(res.reviewers)
            })
        setSelectedInnovationId(id)
        setAssignDialog(true)
    }

    const viewInnovation = (data) => {
        console.log(data)
        window.localStorage.setItem('previewedInnovation', JSON.stringify(data))
        setPreviewedInnovation(data)
        navigate('/preview')
    }

    const titleBody = (data) => {

        return (
            <p id='innovation-title' onClick={() => viewInnovation(data)} >{data.formData.find(item => item.id === "1.1")?.value}</p>
        )
    }

    const reviewersTemplate = (data) => {
        return data.reviewers.map(item => {
            return(
                <p>{item.fullName}</p>
            )
        })
    }

    const actionsTemplate = (data) =>{
        switch (data.status) {
            case "REVIEWER_ASSIGNMENT": return <AssignAction data={data} deleteInnovationDialog={deleteInnovationDialog} assignInnovationDialog={assignInnovationDialog}/>
            case "UNDER_REVIEW": return
            case "PUBLISHED": return
            case "TAKE_FINAL_DECISION": return <FinalAction data={data} assignSreInnovationDialog={assignSreInnovationDialog} publishInnovationDialog={publishInnovationDialog} rejectInnovationDialog={rejectInnovationDialog}/>
            case "REJECTED": return <RejectedActions data={data} deleteRejectedDialog={deleteRejectedDialog}/>
            case "READY": return <DeleteAction data={data} deleteInnovationDialog={deleteInnovationDialog}/>
            case "DRAFT": return <DeleteAction data={data} deleteInnovationDialog={deleteInnovationDialog}/>
            default: return
        }
    }

    const statusTemplate = (data) => {
        switch (data.status) {
            case "DRAFT": return <p>Draft</p>
            case "READY": return <p>Ready</p>
            case "REVIEWER_ASSIGNMENT": return <p>Reviewer Assignment</p>
            case "UNDER_REVIEW": return <p>Under Review</p>
            case "TAKE_FINAL_DECISION": return <p>Take Final Decision</p>
            case "ACCEPTED": return <p>Accepted</p>
            case "REJECTED": return <p>Rejected</p>
            case "UNDER_SR_ASSESSMENT": return <p>Under SR Assessment</p>
            case "REVISIONS_REQUESTED": return <p>Revisions Requested</p>
            case "PUBLISHED": return <p>Published</p>
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

    const searchReviewer = (event) => {
        let _filteredReviewers;
        if (!event.query.trim().length) {
            _filteredReviewers = [...reviewers];
        }
        else {
            _filteredReviewers = reviewers.filter((reviewer) => {
                return reviewer.fullName.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
        setFilteredReviewers(_filteredReviewers);
    }

    const searchScalingReadinessExpert = (event) => {
        let _filteredScalingReadinessExperts;
        if (!event.query.trim().length) {
            _filteredScalingReadinessExperts = [...scalingReadinessExperts];
        }
        else {
            _filteredScalingReadinessExperts = scalingReadinessExperts.filter((sre) => {
                return sre.fullName.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
        setFilteredScalinReadinessExperts(_filteredScalingReadinessExperts);
    }

    const viewCommentsFooter = (
        <>
            <Button label="OK"  className="p-button-text" onClick={() => setViewCommentsDialog(false)} />
        </>
    );

    const commentsBody = (data) => {
        if (data.comments) {
            return (
                <p id='innovation-title' onClick={() => {
                    setComments(data.comments)
                    setViewCommentsDialog(true)
                }} >View Comments</p>
            )
        }
        return (
            <p id='innovation-title-disabled' onClick={() => {
                setComments(data.comments)
            }} >View Comments</p>
        )

    }

    return (
        <div className='my-innovations-table'>
            <div className="peach-background-container">
                <h3>Manage/Assign Innovations</h3>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations} paginator rows={10} rowsPerPageOptions={[10,20]} loading={loading}>
                    <Column field='title' body={(data) => (titleBody(data))}  sortable header="Title"/>
                    <Column field="status" body={statusTemplate} sortable header="Status"/>
                    <Column field="version" sortable header="Version"/>
                    <Column field="comments" body={(data) => (commentsBody(data))}  header="Reviewer's Comments"/>
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
                <AutoComplete value={reviewer} suggestions={filteredReviewers} completeMethod={searchReviewer} multiple  field="fullName" onChange={(e) => setReviewer(e.value)} />
            </Dialog>
            <Dialog visible={assignSreDialog} style={{ width: '450px' }} header="Confirm" modal footer={assignSreDialogFooter} onHide={() => setAssignSreDialog(false)}>
                <span className='manage-users-dialog-info'>Choose a Scaling Readiness Expert to assign the Innovation</span>
                <AutoComplete value={scalingReadinessExpert} suggestions={filteredScalingReadinessExperts} completeMethod={searchScalingReadinessExpert}  field="fullName" onChange={(e) =>  setScalinReadinessExpert(e.value)} />
            </Dialog>
            <Dialog visible={publishDialog} style={{ width: '450px' }} header="Confirm" modal footer={publishDialogFooter} onHide={() => setPublishDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to publish the <b>Innovation</b>?</span>}
                </div>
            </Dialog>
            <Dialog visible={rejectDialog} style={{ width: '450px' }} header="Confirm" modal footer={rejectDialogFooter} onHide={() => setRejectDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to reject the <b>Innovation</b>?</span>}
                </div>
            </Dialog>
            <Dialog visible={rejectedDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRejectedDialogFooter} onHide={() => setRejectedDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to delete <b>Innovation</b>?</span>}
                </div>
            </Dialog>
            <Dialog visible={viewCommentsDialog} style={{ width: '450px' }} header="Comments" modal footer={viewCommentsFooter} onHide={() => setViewCommentsDialog(false)}>
                <div className="confirmation-content">
                    <InputTextarea disabled value={comments} autoResize style={{width:'100%', maxWidth: '100%'}}/>
                </div>
            </Dialog>
        </div>
    )
}

export default ManageUserInnovations
