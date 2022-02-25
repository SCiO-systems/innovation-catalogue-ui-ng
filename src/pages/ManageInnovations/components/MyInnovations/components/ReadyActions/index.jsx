import React from 'react'
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";

const ReadyActions = (props) => {

    const {data,editInnovation,deleteInnovationDialog,submitInnovation} = props

    return (
        <div>
            <Tooltip target=".button-edit"  position="left"/>
            <span className="button-edit" data-pr-tooltip="Edit">
                <Button id={data.innovId} icon="fad fa-pencil fa-lg" className="button-edit-table margin-right" onClick={(e) => editInnovation(e.target.id)}/>
            </span>
            <Tooltip target=".button-submit"  position="right"/>
            <span className="button-submit" data-pr-tooltip="Submit">
                <Button id={data.innovId} icon="fad fa-upload fa-lg" className="button-submit-table margin-right" onClick={(e) => submitInnovation(e.target.id)}/>
            </span>
            <Tooltip target=".button-trash"  position="right"/>
            <span className="button-trash" data-pr-tooltip="Delete">
                <Button id={data.innovId} icon="fad fa-trash fa-lg" className="button-trash-table margin-right" onClick={(e) =>  deleteInnovationDialog(e.target.id)}/>
            </span>
        </div>
    )
}

export default ReadyActions
