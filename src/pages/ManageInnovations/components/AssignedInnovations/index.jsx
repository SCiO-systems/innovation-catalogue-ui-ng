import React, {useState,useEffect} from 'react'
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";
import { InputTextarea } from 'primereact/inputtextarea';
import UserService from "../../../../services/httpService/user";
import InnovationService from '../../../../services/httpService/innovation'
import {useSelector} from "react-redux";


const AssignedInnovations = () => {

    const userData = useSelector((state) => state.userData)

    const [innovations, setInnovations] = useState([])
    const [resfreshTrigger, setRefreshTrigger] = useState(0)
    const [selectedInnovationId, setSelectedInnovationId] = useState('')
    const [comments, setComments] = useState('')

    const [rejectDialog, setRejectDialog] = useState(false)
    const [publichDialog, setPublishDialog] = useState(false)


    useEffect(
        () => {
            UserService.getAssignedInnovations(userData.user.userId)
                .then(res => {
                    console.log(res)
                    setInnovations(res.innovations)
                })
        },[resfreshTrigger]
    )

    const rejectInnovation = () => {
        InnovationService.rejectInnovation(userData.user.userId,selectedInnovationId,comments)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setRejectDialog(false)
    }

    const addComments = () => {
        InnovationService.addComment(userData.user.userId,selectedInnovationId,comments)
            .then(() => {
                setRefreshTrigger(resfreshTrigger + 1)
            })
        setRejectDialog(false)
    }

    const rejectDialogFooter = (
        <>
            <Button label="Save Comments"  className="p-button-text" onClick={addComments} />
            <Button label="Reject Innovation"  className="p-button-text" onClick={rejectInnovation} />
        </>
    );

    const rejectInnovationDialog = (data) => {
        if (!data.comments) {
            setComments('')
        } else {
            setComments(data.comments)
        }
        setSelectedInnovationId(data.innovId)
        setRejectDialog(true)
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

    const publishInnovationDialog = (data) => {
        setSelectedInnovationId(data.innovId)
        setPublishDialog(true)
    }

    const titleBody = (data) => {

        return (
            <span>{data.formData.find(item => item.id === "1.1").value}</span>
        )
    }

    const actionsTemplate = (data) =>{

        return(
            <div>
                <Tooltip target=".button-publish"  position="right"/>
                <span className="button-publish" data-pr-tooltip="Publish">
                    <Button icon="fa-solid fa-check fa-lg" className="button-publish-table margin-right" onClick={() =>  publishInnovationDialog(data)}/>
                </span>
                <Tooltip target=".button-reject"  position="right"/>
                <span className="button-reject" data-pr-tooltip="Reject">
                    <Button icon="fa-solid fa-x fa-lg" className="button-reject-table margin-right" onClick={() =>  rejectInnovationDialog(data)}/>
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

    return (
        <div className='my-innovations-table'>
            <div className="peach-background-container">
                <h3>My Review Assignments</h3>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations} paginator rows={10} rowsPerPageOptions={[10,20]}>
                    <Column field='title' body={(data) => (titleBody(data))}  sortable header="Title"/>
                    <Column field="comments" sortable header="Comments"/>
                    <Column field="updatedΑt" body={updatedAtTemplate} sortable header="Last Updated"/>
                    <Column field="actions" header="Actions" body={actionsTemplate} style={{width: "250px"}}/>
                </DataTable>
            </div>
            <Dialog visible={rejectDialog} style={{ width: '450px' }} header="Confirm" modal footer={rejectDialogFooter} onHide={() => setRejectDialog(false)}>
                <div className="confirmation-content">
                    <span className='manage-users-dialog-info'>Write your comments and reject the Innovation or save your comments as draft</span>
                    <InputTextarea value={comments} onChange={(e) => setComments(e.target.value)} style={{width:'100%', maxWidth: '100%'}}/>
                </div>
            </Dialog>
            <Dialog visible={publichDialog} style={{ width: '450px' }} header="Confirm" modal footer={publishDialogFooter} onHide={() => setPublishDialog(false)}>
                <div className="confirmation-content">
                    <span className='manage-users-dialog-info'>Are you sure you want to publish the <b>Innovation</b>?</span>
                </div>
            </Dialog>
        </div>
    )
}

export default AssignedInnovations
