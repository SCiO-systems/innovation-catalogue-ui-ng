import React from 'react'
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";

const RevisionActions = (props) => {

    const {data,editInnovation,approveInnovationDialog} = props

    return (
        <div>
            <Tooltip target=".button-edit"  position="left"/>
            <span className="button-edit" data-pr-tooltip="Edit">
                <Button icon="fad fa-pencil fa-lg" className="button-edit-table margin-right" onClick={() => editInnovation(data.innovId,data.status)}/>
            </span>
            <Tooltip target=".button-approve"  position="right"/>
            <span className="button-approve" data-pr-tooltip="Approve">
                <Button icon="fa-solid fa-check fa-lg" className="button-approve-table margin-right" onClick={() =>  approveInnovationDialog(data.innovId)}/>
            </span>
        </div>
    )
}

export default RevisionActions
