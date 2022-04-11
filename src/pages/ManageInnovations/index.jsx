import React from 'react'
import {MyInnovations, ManageUsers,ManageUserInnovations,AssignedInnovations} from './components'
import { TabView, TabPanel } from 'primereact/tabview';
import {useSelector} from "react-redux";
import './styles.css'
import Loading from '../../components/Loading'

const ManageInnovations = () => {

    const userData = useSelector((state) => state.userData)

    const innovationManagement = useSelector((state) => state.innovationManagement)

    if (userData.user) {
        switch (innovationManagement) {
            case 'my innovations': return <MyInnovations/>
            case 'my assignments': return <AssignedInnovations/>
            case 'manage innovations': return <ManageUserInnovations/>
            case 'manage users': return <ManageUsers/>
            default: return <MyInnovations/>
        }
    }
    return (
        <Loading visible={!userData.user} />
    )
}

export default ManageInnovations
