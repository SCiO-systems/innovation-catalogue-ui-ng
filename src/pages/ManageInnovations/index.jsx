import React,{useState} from 'react'
import {MyInnovations} from './components'
import { TabView, TabPanel } from 'primereact/tabview';
import {useSelector} from "react-redux";
import './styles.css'
import {Dialog} from "primereact/dialog";
import {ProgressBar} from "primereact/progressbar";

const ManageInnovations = () => {

    const userData = useSelector((state) => state.userData)

    const [loading, setLoading] = useState(false)

    const onHide = () => {
        setLoading(false)
    }

    if (userData.user) {
        return (
            <TabView>
                <TabPanel header="My Innovations">
                    <MyInnovations/>
                </TabPanel>
                {userData.user.permissions.find(item => item === 'Reviewer') ?      <TabPanel header="Under Review"> </TabPanel> : <></>}
                {userData.user.permissions.find(item => item === 'Administrator') ?      <TabPanel header="Manage Innovations"> </TabPanel> : <></>}
                {userData.user.permissions.find(item => item === 'Administrator') ?      <TabPanel header="Manage Users"> </TabPanel> : <></>}
            </TabView>
        )
    }
    return (
        <Dialog header="Loading Data ..." visible={!userData.user} position={"top"} modal style={{ width: '50vw' }}
                onHide={onHide}
                draggable={false} resizable={false}
                closable = {false}
        >
            <ProgressBar mode="indeterminate" />
        </Dialog>
    )
}

export default ManageInnovations
