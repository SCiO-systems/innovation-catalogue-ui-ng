import React from 'react'
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";

const DraftActions = (props) => {

    const {data,editInnovation,deleteInnovationDialog} = props

    return (
        <div>
            <Tooltip target=".button-edit"  position="left"/>
            <span className="button-edit" data-pr-tooltip="Edit">
                <Button icon="fad fa-pencil fa-lg" className="button-edit-table margin-right" onClick={() => editInnovation(data.innovId,data.status)}/>
            </span>
            <Tooltip target=".button-trash"  position="right"/>
            <span className="button-trash" data-pr-tooltip="Delete">
                <Button id={data.innovId} icon="fad fa-trash fa-lg" className="button-trash-table margin-right" onClick={(e) =>  deleteInnovationDialog(e.target.id)}/>
            </span>
        </div>
    )
}

export default DraftActions
