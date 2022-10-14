import React, {useEffect, useState, useRef} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import {useNavigate} from "react-router-dom";
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../reducer/actions";
import {DraftActions, ReadyActions,RejectedActions,AcceptedActions,RevisionActions} from './components'
import UserService from '../../../../services/httpService/user'
import InnovationService from '../../../../services/httpService/innovation'
import {InputTextarea} from "primereact/inputtextarea";

const MyInnovations = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userData)

    const innovations = useSelector((state) => state.innovations)
    const setInnovations = (payload) => dispatch({ type: Actions.SetInnovations, payload });

    const setPreviewedInnovation = (payload) => dispatch({ type: Actions.SetPreviewedInnovation, payload });

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

    const [selectedInnovationId, setSelectedInnovationId] = useState('')
    const [resfreshTrigger, setRefreshTrigger] = useState(0)
    const [rejectedTimestamp ,setRejectedTimestamp] = useState('')
    const [comments, setComments] = useState('')
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [rejectedDialog, setRejectedDialog] = useState(false)
    const [approveDialog, setApproveDialog] = useState(false)
    const [viewCommentsDialog, setViewCommentsDialog] = useState(false)

    const toast = useRef(null);

    useEffect(() => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        });
        setGlobalFilterValue('');
    }, []);

    useEffect(
        () => {
            UserService.getAllUserInnovations(userData.user.userId)
                .then(res => {
                    const temp = res.innovations?.map(item => {
                        const title = item.formData.find(item => item.id === "1.1")?.value || '';
                        return {...item, title: title}
                    })
                    setInnovations(temp)
                })
        },[resfreshTrigger]
    )

    const onGlobalFilterChange = (e) => {
        const { value } = e.target;
        // eslint-disable-next-line no-underscore-dangle
        const _filters1 = { ...filters };
        _filters1.global.value = value;

        setFilters(_filters1);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => (
        <div className="p-d-flex p-jc-between">
            <span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
			</span>
        </div>
    );

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

    const editInnovation = (id,status) => {

        const innovation = innovations.find(item => ((item.innovId === id) && (item.status === status)))

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

        setEditingInnovation({id,status})
        setViewing(false)

        navigate('/add-innovation')
    }

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

    const approveInnovationDialog = (id) => {
        setSelectedInnovationId(id)
        setApproveDialog(true)
    }

    const viewCommentsFooter = (
        <>
            <Button label="OK"  className="p-button-text" onClick={() => setViewCommentsDialog(false)} />
        </>
    );

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
                            editInnovation(data.innovId,data.status)
                        })
                }
            })
    }

    const submitInnovation = (id) => {

        InnovationService.submitInnovation(userData.user.userId,id)
            .then(() => {
                toast.current.show({severity:'success', summary: 'Success', detail:'Innovation Submitted', life: 3000});
                setRefreshTrigger(resfreshTrigger + 1)
            })
    }

    const actionsTemplate = (data) => {

        switch (data.status) {
            case "DRAFT": return <DraftActions data={data} editInnovation={editInnovation} deleteInnovationDialog={deleteInnovationDialog}/>
            case "READY": return <ReadyActions data={data} editInnovation={editInnovation} deleteInnovationDialog={deleteInnovationDialog} submitInnovation={submitInnovation}/>
            case "REJECTED": return <RejectedActions data={data} deleteRejectedDialog={deleteRejectedDialog}/>
            case "PUBLISHED": return <AcceptedActions data={data} updateVersion={updateVersion}/>
            case "REVISIONS_REQUESTED": return <RevisionActions data={data} editInnovation={editInnovation} approveInnovationDialog={approveInnovationDialog}/>
            default: return <></>
        }
    }

    const viewInnovation = (data) => {
        window.localStorage.setItem('previewedInnovation', JSON.stringify(data))
        setPreviewedInnovation(data)
        navigate('/preview')
    }

    const titleBody = (data) => {

        return (
            <p id='innovation-title' onClick={() => viewInnovation(data)} >{data.formData.find(item => item.id === "1.1")?.value || 'No Name'}</p>
        )
    }

    const statusTemplate = (data) => {

        switch (data.status) {
            case "DRAFT": return <p>Draft</p>
            case "READY": return <p>Ready</p>
            case "REVIEWER_ASSIGNMENT": return <p>Reviewer Assignment</p>
            case "UNDER_REVIEW": return <p>Under Review</p>
            case "ACCEPTED": return <p>Accepted</p>
            case "REJECTED": return <p>Rejected</p>
            case "REVISIONS_REQUESTED": return <p>Revisions Requested</p>
            case "PUBLISHED": return <p>Published</p>
            case "UNDER_SR_ASSESSMENT": return <p>Under SR Assessment</p>
            case "TAKE_FINAL_DECISION": return <p>Take Final Decision</p>
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

    const sortByDate = (data) => {
        console.log(data)
    }

    return (
        <div className='my-innovations-table'>
            <Toast ref={toast} />
            <div className="peach-background-container">
                <h3>My innovations</h3>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations} paginator rows={10} rowsPerPageOptions={[10,20]} globalFilterFields={['title','status', 'version']} filters={filters} header={renderHeader}>
                    <Column field='title' body={(data) => (titleBody(data))}  sortable header="Title"/>
                    {/*<Column field="editing-rights"  sortable header="Editing Rights"/>*/}
                    <Column field="status" body={statusTemplate} sortable header="Status"/>
                    <Column field="version" sortable header="Version"/>
                    <Column field="comments" body={(data) => (commentsBody(data))}  header="Reviewer's Comments"/>
                    <Column field="createdΑt" body={createdAtTemplate} header="Date Created" />
                    <Column field="updatedΑt" body={updatedAtTemplate} header="Last Updated"/>
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
            <Dialog visible={approveDialog} style={{ width: '450px' }} header="Confirm" modal footer={approveDialogFooter} onHide={() => setApproveDialog(false)}>
                <div className="confirmation-content">
                    <p className='manage-users-dialog-info'>Are you sure you want to approve the <> Innovation</>?</p>
                </div>
            </Dialog>
            <Dialog visible={viewCommentsDialog} style={{ width: '450px' }} header="Comments" modal footer={viewCommentsFooter} onHide={() => setViewCommentsDialog(false)}>
                <div className="confirmation-content">
                    <InputTextarea disabled value={comments} autoResize style={{width:'100%', maxWidth: '100%', opacity: 1}}/>
                </div>
            </Dialog>
        </div>
    );
}

export default MyInnovations
