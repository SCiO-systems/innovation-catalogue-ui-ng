import React from 'react'
import {MyInnovations, ManageUsers,ManageUserInnovations,AssignedInnovations} from './components'
import { TabView, TabPanel } from 'primereact/tabview';
import {useSelector} from "react-redux";
import './styles.css'
import Loading from '../../components/Loading'

const ManageInnovations = () => {

    const userData = useSelector((state) => state.userData)

    if (userData.user) {
        return (
            <TabView>
                <TabPanel header="My Innovations"><MyInnovations/></TabPanel>
                {userData.user.permissions.find(item => item === 'Reviewer') ?      <TabPanel header="My Assignments"><AssignedInnovations/></TabPanel> : <></>}
                {userData.user.permissions.find(item => item === 'Administrator') ?      <TabPanel header="Manage Innovations"><ManageUserInnovations/></TabPanel> : <></>}
                {userData.user.permissions.find(item => item === 'Administrator') ?      <TabPanel header="Manage Users"><ManageUsers/></TabPanel> : <></>}
            </TabView>
        )
    }
    return (
        <Loading visible={!userData.user} />
    )
}

export default ManageInnovations
