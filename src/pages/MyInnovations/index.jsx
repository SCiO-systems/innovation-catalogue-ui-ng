import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import TestMyInnovationsService from "../../services/TestMyInnovationsService";
import {Button} from "primereact/button";
import {Tooltip} from "primereact/tooltip";
import {Dialog} from "primereact/dialog";
import {Link} from "react-router-dom";

const MyInnovations = () => {
    const [innovations, setInnovations] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const descriptorsUrl = '/descriptors/';

    const innovationsService = new TestMyInnovationsService();

    useEffect(() => {
        innovationsService.getInnovations().then(data => setInnovations(data));

    }, []);

    const confirmDelete = (innovations) => {
        setDeleteDialog(true);
    }

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }

    const delDialog = () => {
        setDeleteDialog(false);
    }

    const deleteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={delDialog} />
        </>
    );

    const bodyTemplate = (data) =>{

        return(
            <div>
                <div>
                    <Tooltip target=".button-edit"  position="left"/>
                    <span className="button-edit" data-pr-tooltip="Edit">
                        <Button icon="fad fa-pencil fa-lg" className="button-edit-table margin-right"></Button>
                    </span>
                    <Tooltip target=".button-clock"  position="right"/>
                    <span className="button-clock" data-pr-tooltip="Descriptors Time Tracking">
                        <Link to={descriptorsUrl}>
                            <Button icon="fad fa-clock fa-lg" className="button-clock-table margin-right"></Button>
                        </Link>
                    </span>
                    <Tooltip target=".button-trash"  position="right"/>
                    <span className="button-trash" data-pr-tooltip="Delete">
                        <Button icon="fad fa-trash fa-lg" className="button-trash-table margin-right" onClick={() =>  confirmDelete(data)}></Button>
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="peach-background-container">
                <h3>My innovations</h3>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations} paginator rows={10} rowsPerPageOptions={[10,20]}>
                    <Column field="title"  sortable header="Title"></Column>
                    <Column field="date-subm" sortable header="Date Submitted"></Column>
                    <Column field="date-upd" sortable header="Date Updated"></Column>
                    <Column field="quantity"  body={bodyTemplate} style={{width: "250px"}}></Column>
                </DataTable>
            </div>
            <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to delete <b>Innovation</b>?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default MyInnovations
