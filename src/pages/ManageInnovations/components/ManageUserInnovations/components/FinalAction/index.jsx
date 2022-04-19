import React from 'react'
import {Tooltip} from "primereact/tooltip";
import {Button} from "primereact/button";

const FinalAction = (props) => {

    const {data,assignSreInnovationDialog,publishInnovationDialog,rejectInnovationDialog} = props

    return (
        <div>
            <Tooltip target=".button-assignSre"  position="right"/>
            <span className="button-assignSre" data-pr-tooltip="Assign SRE">
                <Button icon="fa-solid fa-arrow-up-right fa-lg" className="button-assignSre-table margin-right" onClick={() => assignSreInnovationDialog(data.innovId)}/>
            </span>
            <Tooltip target=".button-publish"  position="right"/>
            <span className="button-publish" data-pr-tooltip="Publish">
                    <Button icon="fa-solid fa-check fa-lg" className="button-publish-table margin-right" onClick={() => publishInnovationDialog(data.innovId)}/>
            </span>
            <Tooltip target=".button-reject"  position="right"/>
            <span className="button-reject" data-pr-tooltip="Reject">
                <Button icon="fa-solid fa-x fa-lg" className="button-reject-table margin-right" onClick={() => rejectInnovationDialog(data.innovId)}/>
            </span>
        </div>
    )
}

export default FinalAction
