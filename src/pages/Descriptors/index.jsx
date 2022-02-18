import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import TestMyInnovationsService from "../../services/TestMyInnovationsService";
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {Dialog} from "primereact/dialog";

const Descriptors = () => {
    const [innovations, setInnovations] = useState(null);
    const [editTracking, setEditTracking] = useState(false);
    const [addTracking, setAddTracking] = useState(false);
    const [innovationsPartners, setInnovationsPartners] = useState(null);
    const [scalingPartners, setScalingPartners] = useState(null);
    const [demandPartners, setDemandPartners] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const innovationsService = new TestMyInnovationsService();
    const [disableBtn, setDisableBtn] = useState(false);

    useEffect(() => {

        innovationsService.getInnovations().then(data => setInnovations(data));


    }, []);

    const innovations_partners = [
        {name: "Wageningen University and Research Centre"},
        {name: "Mikocheni Agricultural Research Institute"},
        {name: "Institut National de Recherche Agricole du Benin"},
        {name: "Georg-August-Universität Göttingen"}
    ];

    const scaling_partners = [
        {name: "International Rice Research Institute"},
        {name: "National Agricultural Research Organisation (Uganda)"},
        {name: "Mbeya Agricultural Research and Training Institute"},
        {name: "Institut Senegalais de Recherche Agricole"}
    ];

    const demand_partners = [
        {name: "Office du Niger"},
        {name: "University of Nebraska"},
        {name: "Ethiopian Biodiversity Institute"},
        {name: "National Agricultural Research Institute of Papua New Guinea"}
    ];

    const selectInnovationsPartners = (e) => {
        setInnovationsPartners(e.value);
    }

    const selectScalingPartners = (e) => {
        setScalingPartners(e.value);
    }

    const selectDemandPartners = (e) => {
        setDemandPartners(e.value);
    }

    const confirmDelete = (innovations) => {
        setDeleteDialog(true);
    }

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }

    const delDialog = () => {
        setDeleteDialog(false);
    }

    const hideDialog = () => {
        setEditTracking(false);
        setAddTracking(false);
    }

    const editTrackingFooter = (
        <div className="p-grid p-justify-center">
            <Button label="Save" icon="fad fa-check fa-lg" className="p-button-text button-dialog" onClick={hideDialog}/>
        </div>
    );

    const addTrackingFooter = (
        <div className="p-grid p-justify-center">
            <Button label="Add" icon="fad fa-plus fa-lg" className="p-button-text button-dialog" onClick={hideDialog}/>
        </div>
    );

    const editProduct = () => {
        setEditTracking(true);
    }

    const addProduct = (product) => {
        setAddTracking(true);
    }

    const deleteDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={delDialog} />
        </>
    );

    const disableFirstTrashIcon = () => {
        let el = document.querySelector("#trashIcon");
        console.log(el)
        return "false"
        // return el[0].setAttribute("disabled", "disable");
    };

    const bodyTemplate = (data) =>{

        return(
            <div>
                <div>
                    <Tooltip target=".button-edit"  position="left"/>
                    <span className="button-edit" data-pr-tooltip="Edit">
                        <Button icon="fad fa-pencil fa-lg" className="button-edit-table margin-right" onClick={() => editProduct(data)}></Button>
                    </span>
                    <Tooltip target=".button-trash"  position="right"/>
                    <span className="button-trash" data-pr-tooltip="Delete">
                       <Button id="trashIcon" icon="fad fa-trash fa-lg" className="button-trash-table margin-right" onClick={() => confirmDelete(data)}></Button>
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="peach-background-container">
                <h3>Descriptors Time Tracking</h3>
            </div>
            <div className="p-grid p-justify-end add-button-descriptors">
                <Button label="Add" icon="fad fa-plus fa-lg" onClick={() => addProduct(innovations)}></Button>
            </div>
            <div className="card table-margin">
                <DataTable value={innovations}  paginator rows={10} rowsPerPageOptions={[10,20]}>
                    <Column field="governance"  sortable header="Governance Type"></Column>
                    <Column field="budget" sortable header="Total Budget of Interventions"></Column>
                    <Column field="innov_partners" sortable header="Key Innovation Partners"></Column>
                    <Column field="scale_partners"  sortable header="Key Scaling Partners"></Column>
                    <Column field="demand_partners" sortable header="Key Demand Partners"></Column>
                    <Column field="year" sortable header="Year"></Column>
                    <Column field="quantity" body={bodyTemplate} style={{width: "220px"}}></Column>
                </DataTable>
            </div>
            <Dialog visible={editTracking} style={{ width: '450px', color: "#f9b403"}} header="Edit Time Tracking" modal className="p-fluid" footer={editTrackingFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="year">Year</label>
                    <InputText id="year"/>
                </div>
                <div className="p-field">
                    <label htmlFor="governance">Governance Type</label>
                    <InputText id="governance"/>
                </div>
                <div className="p-field">
                    <label htmlFor="budget">Total Budget of Interventions</label>
                    <InputNumber id="budget"/>
                </div>
                <div className="p-field">
                    <label>Key Innovation Partners</label>
                    <Dropdown value={innovationsPartners} options={innovations_partners} onChange={selectInnovationsPartners} optionLabel="name" placeholder="Select a Partner"/>
                </div>
                <div className="p-field">
                    <label>Key Scaling Partners</label>
                    <Dropdown value={scalingPartners} options={scaling_partners} onChange={selectScalingPartners}  optionLabel="name" placeholder="Select a Partner"/>
                </div>
                <div className="p-field">
                    <label>Key Demand Partners</label>
                    <Dropdown value={demandPartners} options={demand_partners} onChange={selectDemandPartners}  optionLabel="name" placeholder="Select a Partner"/>
                </div>
            </Dialog>
            <Dialog visible={addTracking} style={{ width: '450px', color: "#f9b403"}} header="Add Time Tracking" modal className="p-fluid" footer={addTrackingFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="year">Year</label>
                    <InputText id="year"/>
                </div>
                <div className="p-field">
                    <label htmlFor="governance">Governance Type</label>
                    <InputText id="governance"/>
                </div>
                <div className="p-field">
                    <label htmlFor="budget">Total Budget of Interventions</label>
                    <InputNumber id="budget"/>
                </div>
                <div className="p-field">
                    <label>Key Innovation Partners</label>
                    <Dropdown value={innovationsPartners} options={innovations_partners} onChange={selectInnovationsPartners} optionLabel="name" placeholder="Select a Partner"/>
                </div>
                <div className="p-field">
                    <label>Key Scaling Partners</label>
                    <Dropdown value={scalingPartners} options={scaling_partners} onChange={selectScalingPartners}  optionLabel="name" placeholder="Select a Partner"/>
                </div>
                <div className="p-field">
                    <label>Key Demand Partners</label>
                    <Dropdown value={demandPartners} options={demand_partners} onChange={selectDemandPartners}  optionLabel="name" placeholder="Select a Partner"/>
                </div>
            </Dialog>
            <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to delete <b>Time Tracking</b>?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Descriptors
