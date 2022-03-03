import React from 'react'
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";

const AcceptedActions = (props) => {

    const {data,updateVersion} = props

    return (
        <div>
            <Tooltip target=".button-edit"  position="left"/>
            <span className="button-edit" data-pr-tooltip="Edit">
                <Button id={data.innovId} icon="fad fa-pencil fa-lg" className="button-edit-table margin-right" onClick={() => updateVersion(data)}/>
            </span>
        </div>
    )

}

export default AcceptedActions
