import React from 'react'
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";

const AssignAction = (props) => {

    const {data,deleteInnovationDialog,assignInnovationDialog} = props

    return (
        <div>
            <Tooltip target=".button-assign"  position="right"/>
            <span className="button-assign" data-pr-tooltip="Assign">
                <Button id={data.innovId} icon="fa-solid fa-user fa-lg" className="button-assign-table margin-right" onClick={(e) => assignInnovationDialog(e.target.id)}/>
            </span>
            <Tooltip target=".button-trash"  position="right"/>
            <span className="button-trash" data-pr-tooltip="Delete">
                <Button id={data.innovId} icon="fad fa-trash fa-lg" className="button-trash-table margin-right" onClick={(e) =>  deleteInnovationDialog(e.target.id)}/>
            </span>
        </div>
    )
}

export default AssignAction
