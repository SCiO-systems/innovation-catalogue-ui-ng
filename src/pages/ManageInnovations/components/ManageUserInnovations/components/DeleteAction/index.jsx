import React from 'react'
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";

const DeleteAction = (props) => {

    const {data,deleteInnovationDialog} = props

    return (
        <div>
            <Tooltip target=".button-trash"  position="right"/>
            <span className="button-trash" data-pr-tooltip="Delete">
                <Button id={data.innovId} icon="fad fa-trash fa-lg" className="button-trash-table margin-right" onClick={(e) =>  deleteInnovationDialog(e.target.id)}/>
            </span>
        </div>
    )
}

export default DeleteAction
