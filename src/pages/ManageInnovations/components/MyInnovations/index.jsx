import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import TestMyInnovationsService from "../../../../services/TestMyInnovationsService";
import {Button} from "primereact/button";
import {Tooltip} from "primereact/tooltip";
import {Dialog} from "primereact/dialog";
import {Link, useNavigate} from "react-router-dom";
import './styles.css'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../reducer/actions";
import {getAllUserInnovations} from '../../../../services/httpService/user'

const MyInnovations = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const csrfToken = useSelector((state) => state.csrfToken)

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

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteInnovationId, setDeleteInnovationId] = useState('')

    const descriptorsUrl = '/descriptors/';

    useEffect(
        () => {
            getAllUserInnovations(csrfToken, userData.user.userId)
                .then(async res => {
                    const temp = await res.json()
                    setInnovations(temp.innovations)
                })
        },[]
    )

    const deleteInnovationDialog = (id) => {
        setDeleteInnovationId(id)
        setDeleteDialog(true);
    }

    const deleteInnovation = () => {

        const _innovations = innovations.filter(item => item.id !== deleteInnovationId)
        setInnovations(_innovations)
        setDeleteDialog(false);
    }

    const deleteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteInnovation} />
        </>
    );

    const editInnovation = (id) => {

        console.log(innovations)

        const innovation = innovations.find(item => item.innovId === id)


        console.log(innovation)

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

    const actionsTemplate = (data) =>{

        return(
            <div>
                <Tooltip target=".button-edit"  position="left"/>
                <span className="button-edit" data-pr-tooltip="Edit">
                    <Button id={data.innovId} icon="fad fa-pencil fa-lg" className="button-edit-table margin-right" onClick={(e) => editInnovation(e.target.id)}/>
                </span>
                <Tooltip target=".button-clock"  position="right"/>
                <span className="button-clock" data-pr-tooltip="Descriptors Time Tracking">
                    <Link to={descriptorsUrl}>
                        <Button icon="fad fa-clock fa-lg" className="button-clock-table margin-right"/>
                    </Link>
                </span>
                <Tooltip target=".button-trash"  position="right"/>
                <span className="button-trash" data-pr-tooltip="Delete">
                    <Button id={data.innovId} icon="fad fa-trash fa-lg" className="button-trash-table margin-right" onClick={(e) =>  deleteInnovationDialog(e.target.id)}/>
                </span>
            </div>
        );
    }

    return (
        <div className='my-innovations-table'>
            <div className="peach-background-container">
                <h3>My innovations</h3>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations} paginator rows={10} rowsPerPageOptions={[10,20]}>
                    <Column field="title"  sortable header="Title"/>
                    <Column field="editing-rights"  sortable header="Editing Rights"/>
                    <Column field="status"  sortable header="Status"/>
                    <Column field="comments"  sortable header="Reviewer's Comments"/>
                    <Column field="dateSubmitted" sortable header="Date Submitted"/>
                    <Column field="dateUpdated" sortable header="Date Updated"/>
                    <Column field="actions" header="Actions" body={actionsTemplate} style={{width: "250px"}}/>
                </DataTable>
            </div>
            <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={() => setDeleteDialog(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to delete <b>Innovation</b>?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default MyInnovations
