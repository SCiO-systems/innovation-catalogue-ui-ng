import React, {useState} from 'react'
import {Dialog} from "primereact/dialog";
import {ProgressBar} from "primereact/progressbar";

const Loading = (props) => {

    const {visible} = props

    const [loading, setLoading] = useState(false)

    const onHide = () => {
        setLoading(false)
    }

    return (
        <Dialog header="Loading Data ..." visible={visible} position={"top"} modal style={{ width: '50vw' }}
                onHide={onHide}
                draggable={false} resizable={false}
                closable = {false}
        >
            <ProgressBar mode="indeterminate" />
        </Dialog>
    )
}

export default Loading
