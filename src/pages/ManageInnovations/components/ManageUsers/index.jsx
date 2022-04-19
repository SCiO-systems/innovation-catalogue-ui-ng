import React, {useEffect, useState} from 'react'
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import { Chips } from 'primereact/chips';
import { Chip } from 'primereact/chip';
import { Ripple } from 'primereact/ripple';
import AdministratorService from '../../../../services/httpService/admin'
import {useSelector} from "react-redux";
import './styles.css'
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";

const ManageUsers = () => {

    const userData = useSelector((state) => state.userData)

    const [users,setUsers] = useState ([])
    const [permissionsDialog, setPermissionsDialog] = useState(false)
    const [selectedUser, setSelectedUser] = useState('')
    const [resfreshTrigger, setRefreshTrigger] = useState(0)
    const [permissions, setPermissions] = useState([])
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
    });

    useEffect(() => {
        loadLazyData();
    },[lazyParams,resfreshTrigger])

    const loadLazyData = () => {
        setLoading(true);

        AdministratorService.getUsersWithPagination(userData.user.userId,lazyParams.first, lazyParams.first + lazyParams.rows -1)
            .then(res => {
                    setTotalRecords(res.total_users);
                    setUsers(res.users);
                    setLoading(false);
                }
            );
    }

    const onPage = (event) => {
        setLazyParams(event);
    }

    const editPermissions = () => {

        AdministratorService.updateUserPermissions(userData.user.userId,permissions,selectedUser)
            .then((res) => {
                setRefreshTrigger(resfreshTrigger + 1)
                setPermissionsDialog(false);
            })
    }

    const permissionsFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setPermissionsDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={editPermissions} />
        </>
    );

    const editPermissionsDialog = (data) => {
        setPermissions(data.permissions)
        setSelectedUser(data.user_id)
        setPermissionsDialog(true);
    }

    const permissionsTemplate = (data) => {
        return <Chips className='manage-users' value={data.permissions}  />
    }

    const actionsTemplate = (data) =>{
        return(
            <div>
                <Tooltip target=".button-permissions"  position="right"/>
                <span className="button-permissions" data-pr-tooltip="Permissions">
                    <Button icon="fad fa-gear fa-lg" className="button-permissions-table margin-right" onClick={() => editPermissionsDialog(data)}/>
                </span>
            </div>
        )
    }

    const renderChips = () => {

        const updatePermission = (permission) => {
            if (permissions.find(item => item === permission)) {
                setPermissions(permissions.filter(item => item !== permission))
            } else {
                setPermissions([...permissions,permission])
            }
          return
        }

        return (
            <div className='p-grid'>
                {permissions.find(item => item === 'Administrator')? <Chip label="Administrator" className="mr-2 mb-2" /> : <></>}
                <div className="p-ripple" onClick={() => updatePermission("User")}>
                    <Chip label="Simple User" className="mr-2 mb-2" style={permissions.find(item => item === 'User') ? {opacity: '1'} : {opacity: '0.4'}} />
                    <Ripple />
                </div>
                <div className="p-ripple" onClick={() => updatePermission("Reviewer")}>
                    <Chip label="Reviewer" className="mr-2 mb-2" style={permissions.find(item => item === 'Reviewer') ? {opacity: '1'} : {opacity: '0.4'}} />
                    <Ripple />
                </div>
                <div className="p-ripple" onClick={() => updatePermission("Scaling Readiness Expert")}>
                    <Chip label="Scaling Readiness Expert" className="mr-2 mb-2" style={permissions.find(item => item === 'Scaling Readiness Expert') ? {opacity: '1'} : {opacity: '0.4'}} />
                    <Ripple />
                </div>
            </div>
        )
    }

    return (
        <div className='my-innovations-table'>
            <div className="peach-background-container">
                <h3>Manage Users</h3>
            </div>
            <div className="card table-margin">
                <DataTable
                    value={users}
                    paginator
                    rows={10}
                    lazy
                    first={lazyParams.first}
                    onPage={onPage}
                    loading={loading}
                    rowsPerPageOptions={[10,20]}
                    totalRecords={totalRecords}
                >
                    <Column field="name"  sortable header="Name"/>
                    <Column field="permissions" body={permissionsTemplate} sortable header="Privileges"/>
                    <Column field="actions" header="Actions" body={actionsTemplate} style={{width: "250px"}}/>
                </DataTable>
            </div>
            <Dialog visible={permissionsDialog} style={{ width: '450px' }} header="Confirm" modal footer={permissionsFooter} onHide={() => setPermissionsDialog(false)}>
                <span className='manage-users-dialog-info'>Click to enable or disable permissions</span>
                {renderChips()}
            </Dialog>
        </div>
    )
}

export default ManageUsers
