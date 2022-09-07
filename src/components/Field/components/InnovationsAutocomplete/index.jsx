import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {Button} from "primereact/button";
import AutocompleteService from "../../../../services/httpService/autocomplete";
import {AutoComplete} from "primereact/autocomplete";
import {Tooltip} from "primereact/tooltip";
import {Dialog} from "primereact/dialog";
import ReactHtmlParser from "react-html-parser";

const InnovationsAutocomplete = (props) => {

	const {configuration, presetValue, stepValues, stepSetValues, keyName} = props

	const viewing = useSelector((state) => state.viewing)

	const [displayDialog, setDisplayDialog] = useState(false)
	const [filteredKeywords, setFilteredKeywords] = useState([]);
	const [selectedKeyword, setSelectedKeyword] = useState(presetValue);
	const [options, setOptions] = useState([])

	useEffect(
		() => {
			AutocompleteService.getAllPublishedInnovations()
				.then(res => {
					setOptions(res.innovations)
				})
		},[]
	)

	useEffect(
		() => {
			setSelectedKeyword(presetValue)
		}, [presetValue]
	)

	useEffect(
		() => {
			if (stepValues.length === 0) return
			const _values = stepValues
			const index = _values.indexOf(_values.find(item => item.id === configuration.id))
			const validValue = stepValues.find(item => item.id === configuration.id).valid
			_values.splice(index, 1)
			_values.push({
				id: configuration.id,
				value: selectedKeyword,
				mandatory: configuration.mandatory,
				valid: validValue,
			})
			stepSetValues(_values)
			window.localStorage.setItem(keyName, JSON.stringify(_values))
		}, [selectedKeyword]
	)

	const renderQuesitonFooter = () => {
		return (
			<div>
				<Button label="Ok" icon="pi pi-check" onClick={() => setDisplayDialog(false)} autoFocus />
			</div>
		);
	}

	const searchKeyword = (event) => {
		if (!event.query.trim().length) {
			setFilteredKeywords([]);
		}
		else {
			const filteredInnovations = options.filter((country) => {
				return country.name.toLowerCase().startsWith(event.query.toLowerCase());
			});
			setFilteredKeywords(filteredInnovations)
		}
	}

	return (
		<div className="field" id='organizations'>
			<Tooltip target=".status"  position="top"/>
			<div className="p-inputgroup">
                    <span className="p-float-label">
                        <AutoComplete
	                        value={selectedKeyword}
	                        suggestions={filteredKeywords}
	                        completeMethod={searchKeyword}
	                        onChange={(e) => setSelectedKeyword(e.target.value)}
	                        autoHighlight
	                        multiple={configuration.multiple}
	                        disabled={configuration.disabled || viewing}
	                        field="name"
                        />
                    </span>
				<span className="p-inputgroup-addon" id='question' onClick={() => setDisplayDialog(true)}><i
					className="fad fa-question"/></span>
			</div>
			<Dialog header={configuration.label} visible={displayDialog} style={{ width: '50vw' }} footer={renderQuesitonFooter('displayBasic')} onHide={() => setDisplayDialog(false)} >
				{ReactHtmlParser(configuration.fieldInformation)}
			</Dialog>
		</div>
	)
}

export default InnovationsAutocomplete
