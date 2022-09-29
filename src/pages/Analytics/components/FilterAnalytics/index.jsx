import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
// import { Button } from 'primereact/button';
import {MultiSelect} from "primereact/multiselect";
import goal1 from "../../../../assets/sdg/E-WEB-Goal-01.png";
import goal2 from "../../../../assets/sdg/E-WEB-Goal-02.png";
import goal3 from "../../../../assets/sdg/E-WEB-Goal-03.png";
import goal4 from "../../../../assets/sdg/E-WEB-Goal-04.png";
import goal5 from "../../../../assets/sdg/E-WEB-Goal-05.png";
import goal6 from "../../../../assets/sdg/E-WEB-Goal-06.png";
import goal7 from "../../../../assets/sdg/E-WEB-Goal-07.png";
import goal8 from "../../../../assets/sdg/E-WEB-Goal-08.png";
import goal9 from "../../../../assets/sdg/E-WEB-Goal-09.png";
import goal10 from "../../../../assets/sdg/E-WEB-Goal-10.png";
import goal11 from "../../../../assets/sdg/E-WEB-Goal-11.png";
import goal12 from "../../../../assets/sdg/E-WEB-Goal-12.png";
import goal13 from "../../../../assets/sdg/E-WEB-Goal-13.png";
import goal14 from "../../../../assets/sdg/E-WEB-Goal-14.png";
import goal15 from "../../../../assets/sdg/E-WEB-Goal-15.png";
import goal16 from "../../../../assets/sdg/E-WEB-Goal-16.png";
import goal17 from "../../../../assets/sdg/E-WEB-Goal-17.png";
import cgiar1 from "../../../../assets/cgiar/ICONS CGIAR-01.png";
import cgiar2 from "../../../../assets/cgiar/ICONS CGIAR-02.png";
import cgiar3 from "../../../../assets/cgiar/ICONS CGIAR-03.png";
import cgiar4 from "../../../../assets/cgiar/ICONS CGIAR-09.png";
import cgiar5 from "../../../../assets/cgiar/ICONS CGIAR-05.png";
import cgiar6 from "../../../../assets/cgiar/ICONS CGIAR-06.png";
import cgiar7 from "../../../../assets/cgiar/ICONS CGIAR-07.png";
import cgiar8 from "../../../../assets/cgiar/ICONS CGIAR-08.png";

const FilterAnalytics = (props) => {

    const [filterResults, setFilterResults] = useState(null);
    const [selectedItem1, setSelectedItem1] = useState(null);
    const [selectedItem2, setSelectedItem2] = useState(null);
    const [filterSelection, setFilterSelection] = useState([]);
    const [checkboxes, setCheckboxes] = useState([]);
    const [filters, setFilters] = useState(null);
    const [regionsOfImplementationItem, setRegionsOfImplementationItem] = useState(null);
    const [countriesOfImplementationItem, setCountriesOfImplementationItem] = useState(null);
    const [environmentalBenefitsItem, setEnvironmentalBenefitsItem] = useState(null);
    const [typeOfInnovationItem, setTypeOfInnovationItem] = useState(null);
    const [businessCategoryItem, setBusinessCategoryItem] = useState(null);
    const [technicalFieldItem, setTechnicalFieldItem] = useState(null);
    const [governanceTypeItem, setGovernanceTypeItem] = useState(null);
    const [opacity1Button, setOpacity1Button] = useState("1");
    const [opacity2Button, setOpacity2Button] = useState("1");
    const [opacity3Button, setOpacity3Button] = useState("1");
    const [opacity4Button, setOpacity4Button] = useState("1");
    const [opacity5Button, setOpacity5Button] = useState("1");
    const [opacity6Button, setOpacity6Button] = useState("1");
    const [opacity7Button, setOpacity7Button] = useState("1");
    const [opacity8Button, setOpacity8Button] = useState("1");
    const [opacity9Button, setOpacity9Button] = useState("1");
    const [opacity10Button, setOpacity10Button] = useState("1");
    const [opacity11Button, setOpacity11Button] = useState("1");
    const [opacity12Button, setOpacity12Button] = useState("1");
    const [opacity13Button, setOpacity13Button] = useState("1");
    const [opacity14Button, setOpacity14Button] = useState("1");
    const [opacity15Button, setOpacity15Button] = useState("1");
    const [opacity16Button, setOpacity16Button] = useState("1");
    const [opacity17Button, setOpacity17Button] = useState("1");
    const [opacity18Button, setOpacity18Button] = useState("1");
    const [opacity19Button, setOpacity19Button] = useState("1");
    const [opacity20Button, setOpacity20Button] = useState("1");
    const [opacity21Button, setOpacity21Button] = useState("1");
    const [opacity22Button, setOpacity22Button] = useState("1");
    const [opacity23Button, setOpacity23Button] = useState("1");
    const [opacity24Button, setOpacity24Button] = useState("1");
    const [opacity25Button, setOpacity25Button] = useState("1");

    const [selectedFilters, setSelectedFilters] = useState([]);
    const filterNameToDropdownMapping = [
        {
            filter: "regions_of_implementation",
            value: regionsOfImplementationItem
        },
        {
            filter: "countries_of_implementation",
            value: countriesOfImplementationItem
        },
        {
            filter: "environmental_benefits",
            value: environmentalBenefitsItem
        },
        {
            filter: "type_of_innovation",
            value: typeOfInnovationItem
        },
        {
            filter: "business_category",
            value: businessCategoryItem
        },
        {
            filter: "technical_field",
            value: technicalFieldItem
        },
        {
            filter: "governance_type",
            value: governanceTypeItem
        }
    ];

    // let history = useHistory();

    useEffect(() => {
        if(props.filter){
            setFilterResults(props.filter)
        }

        if(filterResults){
            let selectedRole = localStorage.getItem("selectedRole");
            if(selectedRole){
                if(selectedRole === "donor" || selectedRole === "project_manager"){
                    setFilters(donorAndProjectManagerFilterAnalytics);
                }else if(selectedRole === "evaluator" || selectedRole === "km_officer") {
                    setFilters(evaluatorAndKmFilterAnalytics);
                }else if(selectedRole === "monitoring_officer") {
                    setFilters(monitoringOfficerFilterAnalytics);
                }else if(selectedRole === "impact_officer") {
                    setFilters(impactOfficerFilterAnalytics);
                }else if(selectedRole === "user") {
                    setFilters(userFilterAnalytics);
                }
            }
            setFilterResults(filterResults)
        }
    }, [props.filter,filterResults, filterSelection, checkboxes, opacity1Button, opacity2Button, opacity3Button, opacity4Button, opacity5Button, opacity6Button, opacity7Button, opacity8Button, opacity9Button, opacity10Button, opacity11Button, opacity12Button, opacity13Button, opacity14Button, opacity15Button, opacity16Button, opacity17Button, opacity18Button, opacity19Button,opacity20Button, opacity21Button, opacity22Button, opacity23Button, opacity24Button, opacity25Button]);


    useEffect(()=>{



        let governanceTypeField = props.filter.Gοvernance_type

        if((governanceTypeItem)&&(governanceTypeField)){
            let updatedFilters = [];
            governanceTypeItem.forEach(
                (x)=>{
                    governanceTypeField.forEach(
                        (result)=>{
                            let temp = x.substring(0,x.indexOf("(")-1)
                            let tempResult = result.value
                            if(temp === tempResult){
                                updatedFilters.push(tempResult+" ("+result.freq+")");
                            }
                        }
                    )
                }
            )
            setGovernanceTypeItem(updatedFilters);
        }


        let typeOfInnovationField = props.filter.Type_of_innovation

        if((typeOfInnovationItem)&&(typeOfInnovationField)){
            let updatedFilters = [];
            typeOfInnovationItem.forEach(
                (x)=>{
                    typeOfInnovationField.forEach(
                        (result)=>{
                            let temp = x.substring(0,x.indexOf("(")-1)
                            let tempResult = result.value
                            if(temp === tempResult){
                                updatedFilters.push(tempResult+" ("+result.freq+")");
                            }
                        }
                    )
                }
            )
            setTypeOfInnovationItem(updatedFilters);
        }



        let environmentalBenefitsField = props.filter.Environmental_benefits

        if((environmentalBenefitsItem)&&(environmentalBenefitsField)){
            let updatedFilters = [];
            environmentalBenefitsItem.forEach(
                (x)=>{
                    environmentalBenefitsField.forEach(
                        (result)=>{
                            let temp = x.substring(0,x.indexOf("(")-1)
                            let tempResult = result.value
                            if(temp === tempResult){
                                updatedFilters.push(tempResult+" ("+result.freq+")");
                            }
                        }
                    )
                }
            )
            setEnvironmentalBenefitsItem(updatedFilters);
        }


        let countriesOfImplementationField = props.filter.Countries

        if((countriesOfImplementationItem)&&(countriesOfImplementationField)){
            let updatedFilters = [];
            countriesOfImplementationItem.forEach(
                (x)=>{
                    countriesOfImplementationField.forEach(
                        (result)=>{
                            let temp = x.substring(0,x.indexOf("(")-1)
                            let tempResult = result.value
                            if(temp === tempResult){
                                updatedFilters.push(tempResult+" ("+result.freq+")");
                            }
                        }
                    )
                }
            )
            setCountriesOfImplementationItem(updatedFilters);
        }



        let technicalField = props.filter.Technical_field

        if((technicalFieldItem)&&(technicalField)){
            let updatedFilters = [];
            technicalFieldItem.forEach(
                (x)=>{
                    technicalField.forEach(
                        (result)=>{
                            let temp = x.substring(0,x.indexOf("(")-1)
                            let tempResult = result.value
                            if(temp === tempResult){
                                updatedFilters.push(tempResult+" ("+result.freq+")");
                            }
                        }
                    )
                }
            )
            setTechnicalFieldItem(updatedFilters);
        }

        let regionsField = props.filter.Regions

        if((regionsOfImplementationItem)&&(regionsField)){
            let updatedFilters = [];
            regionsOfImplementationItem.forEach(
                (x)=>{
                    regionsField.forEach(
                        (result)=>{
                            let temp = x.substring(0,x.indexOf("(")-1)
                            let tempResult = result.value
                            if(temp === tempResult){
                                updatedFilters.push(tempResult+" ("+result.freq+")");
                            }
                        }
                    )
                }
            )
            setRegionsOfImplementationItem(updatedFilters);
        }



        }
        ,[filterResults])


    const onFilterChange = (e) => {

        if(e.target.id === "regions_of_implementation"){
            setRegionsOfImplementationItem(e.value);
        }
        if(e.target.id === "countries_of_implementation"){
            setCountriesOfImplementationItem(e.value);
        }

        checkDropdownElement(e)
    }

    const filterRegionsValues = (filterArray) => {
        let sortedArray = filterArray.sort((a,b) => (a.value > b.value)? -1 : 1);
        sortedArray.reverse()
        return sortedArray.map(e => {
            let entry = e.value +  " (" + e.freq + ")";
            entry = entry.charAt(0).toUpperCase() + entry.slice(1)
            return  {value: entry, label: entry};
        });
    }


    //...Checking Multiselect Dropdown Elements...

    const checkDropdownElement = (e) => {
        let obj = {id: e.target.id, value: e.value};
        let newFilterSelection = [];
        if(filterSelection.filter(a => a.id === obj.id)){
            newFilterSelection.push(obj);
            setFilterSelection(newFilterSelection);
        }
    }

    const updateSelectedFilters = (filter,value,mode) => {
        let _selectedFilters = selectedFilters;
        let _filter = _selectedFilters.find(
            (item)=> item.filter === filter
        )
        if(_filter){
            if(mode === "add"){
                _filter.value.push(value);
            }else if(mode === "remove"){
                let filterValueIndex = _filter.value.findIndex((item)=> item === value);
                _filter.value.splice(filterValueIndex, 1);
                if(_filter.value.length === 0){
                    let filterValueIndex = _selectedFilters.findIndex((item)=> item.filter === filter);
                    _selectedFilters.splice(filterValueIndex,1);
                }
            }
        }else{
            _filter =
                {
                    filter: filter,
                    value: [value]

                };
            _selectedFilters.push(_filter);
        }
        setSelectedFilters([..._selectedFilters]);
    }


    const selectButtonIcon = (e) => {
        if(e.target.id === "system-transformation") {
            if (opacity1Button === "1") {
                updateSelectedFilters("action_areas","system-transformation","add");
                setOpacity1Button("0.5")
            }else {
                updateSelectedFilters("action_areas","system-transformation","remove");
                setOpacity1Button("1")
            }
        }
        if(e.target.id === "resilient-agrifood") {
            if (opacity2Button === "1") {
                updateSelectedFilters("action_areas","resilient-agrifood","add");
                setOpacity2Button("0.5")
            }else {
                updateSelectedFilters("action_areas","resilient-agrifood","remove");
                setOpacity2Button("1")
            }
        }
        if(e.target.id === "genetic-innovation") {
            if (opacity3Button === "1") {
                updateSelectedFilters("action_areas","genetic-innovation","add");
                setOpacity3Button("0.5")
            }else {
                updateSelectedFilters("action_areas","genetic-innovation","remove");
                setOpacity3Button("1")
            }
        }
        if(e.target.id === "nutrition") {
            if (opacity4Button === "1") {
                updateSelectedFilters("impact_areas","nutrition","add");
                setOpacity4Button("0.5")
            }else {
                updateSelectedFilters("impact_areas","nutrition","remove");
                setOpacity4Button("1")
            }
        }
        if(e.target.id === "poverty_reduction") {
            if (opacity5Button === "1") {
                updateSelectedFilters("impact_areas","poverty_reduction","add");
                setOpacity5Button("0.5")
            }else {
                updateSelectedFilters("impact_areas","poverty_reduction","remove");
                setOpacity5Button("1")
            }
        }
        if(e.target.id === "gender_equality") {
            if (opacity6Button === "1") {
                updateSelectedFilters("impact_areas","gender_equality","add");
                setOpacity6Button("0.5")
            }else {
                updateSelectedFilters("impact_areas","gender_equality","remove");
                setOpacity6Button("1")
            }
        }
        if(e.target.id === "climate_adaptation") {
            if (opacity7Button === "1") {
                updateSelectedFilters("impact_areas","climate_adaptation","add");
                setOpacity7Button("0.5")
            }else {
                updateSelectedFilters("impact_areas","climate_adaptation","remove");
                setOpacity7Button("1")
            }
        }
        if(e.target.id === "environmental_health") {
            if (opacity8Button === "1") {
                updateSelectedFilters("impact_areas","environmental_health","add");
                setOpacity8Button("0.5")
            }else {
                updateSelectedFilters("impact_areas","environmental_health","remove");
                setOpacity8Button("1")
            }
        }
        if(e.target.id === "goal1") {
            if (opacity9Button === "1") {
                updateSelectedFilters("sdg","goal1","add");
                setOpacity9Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal1","remove");
                setOpacity9Button("1")
            }
        }
        if(e.target.id === "goal2") {
            if (opacity10Button === "1") {
                updateSelectedFilters("sdg","goal2","add");
                setOpacity10Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal2","remove");
                setOpacity10Button("1")
            }
        }
        if(e.target.id === "goal3") {
            if (opacity11Button === "1") {
                updateSelectedFilters("sdg","goal3","add");
                setOpacity11Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal3","remove");
                setOpacity11Button("1")
            }
        }
        if(e.target.id === "goal4") {
            if (opacity12Button === "1") {
                updateSelectedFilters("sdg","goal4","add");
                setOpacity12Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal4","remove");
                setOpacity12Button("1")
            }
        }
        if(e.target.id === "goal5") {
            if (opacity13Button === "1") {
                updateSelectedFilters("sdg","goal5","add");
                setOpacity13Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal5","remove");
                setOpacity13Button("1")
            }
        }
        if(e.target.id === "goal6") {
            if (opacity14Button === "1") {
                updateSelectedFilters("sdg","goal6","add");
                setOpacity14Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal6","remove");
                setOpacity14Button("1")
            }
        }
        if(e.target.id === "goal7") {
            if (opacity15Button === "1") {
                updateSelectedFilters("sdg","goal7","add");
                setOpacity15Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal7","remove");
                setOpacity15Button("1")
            }
        }
        if(e.target.id === "goal8") {
            if (opacity16Button === "1") {
                updateSelectedFilters("sdg","goal8","add");
                setOpacity16Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal8","remove");
                setOpacity16Button("1")
            }
        }
        if(e.target.id === "goal9") {
            if (opacity17Button === "1") {
                updateSelectedFilters("sdg","goal9","add");
                setOpacity17Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal9","remove");
                setOpacity17Button("1")
            }
        }
        if(e.target.id === "goal10") {
            if (opacity18Button === "1") {
                updateSelectedFilters("sdg","goal10","add");
                setOpacity18Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal10","remove");
                setOpacity18Button("1")
            }
        }
        if(e.target.id === "goal11") {
            if (opacity19Button === "1") {
                updateSelectedFilters("sdg","goal11","add");
                setOpacity19Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal11","remove");
                setOpacity19Button("1")
            }
        }
        if(e.target.id === "goal12") {
            if (opacity20Button === "1") {
                updateSelectedFilters("sdg","goal12","add");
                setOpacity20Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal12","remove");
                setOpacity20Button("1")
            }
        }
        if(e.target.id === "goal13") {
            if (opacity21Button === "1") {
                updateSelectedFilters("sdg","goal13","add");
                setOpacity21Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal13","remove");
                setOpacity21Button("1")
            }
        }
        if(e.target.id === "goal14") {
            if (opacity22Button === "1") {
                updateSelectedFilters("sdg","goal14","add");
                setOpacity22Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal14","remove");
                setOpacity22Button("1")
            }
        }
        if(e.target.id === "goal15") {
            if (opacity23Button === "1") {
                updateSelectedFilters("sdg","goal15","add");
                setOpacity23Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal15","remove");
                setOpacity23Button("1")
            }
        }
        if(e.target.id === "goal16") {
            if (opacity24Button === "1") {
                updateSelectedFilters("sdg","goal16","add");
                setOpacity24Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal16","remove");
                setOpacity24Button("1")
            }
        }
        if(e.target.id === "goal17") {
            if (opacity25Button === "1") {
                updateSelectedFilters("sdg","goal17","add");
                setOpacity25Button("0.5")
            }else {
                updateSelectedFilters("sdg","goal17","remove");
                setOpacity25Button("1")
            }
        }

    }

    const handleFilterButton = () => {
        let _otherFilters = filterNameToDropdownMapping.filter(
            (item)=>{
                if(item.value){
                    item.value = item.value.map(element => element.split(" ").slice(0, -1).join(" "));
                    return item;
                }
            }
        )
        const allFilters = _otherFilters.concat(selectedFilters);
        let newQuery = {...props.queryJson};
        newQuery.filters = allFilters;
        props.callback(newQuery);
    }

    const clearFiltersButton = () => {

        // props.callback(props.queryJson);

        setRegionsOfImplementationItem(null);
        setCountriesOfImplementationItem(null);
        setEnvironmentalBenefitsItem(null);
        setTypeOfInnovationItem(null);
        setBusinessCategoryItem(null);
        setTechnicalFieldItem(null);
        setOpacity1Button("1");
        setOpacity2Button("1");
        setOpacity3Button("1");
        setOpacity4Button("1");
        setOpacity5Button("1");
        setOpacity6Button("1");
        setOpacity7Button("1");
        setOpacity8Button("1");
        setOpacity9Button("1");
        setOpacity10Button("1");
        setOpacity11Button("1");
        setOpacity12Button("1");
        setOpacity13Button("1");
        setOpacity14Button("1");
        setOpacity15Button("1");
        setOpacity16Button("1");
        setOpacity17Button("1");
        setOpacity18Button("1");
        setOpacity19Button("1");
        setOpacity20Button("1");
        setOpacity21Button("1");
        setOpacity22Button("1");
        setOpacity23Button("1");
        setOpacity24Button("1");
        setOpacity25Button("1");

        props.callback({keywords: [], filters:[]});
    }

    //...Donor and Project Manager Filter Displaying Function...

    const donorAndProjectManagerFilterAnalytics = () => {

        return (
            <Card className="filter-container">
                <div className="p-grid p-justify-between">
                    <div className="p-col-8 p-offset-2 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by CGIAR Action Areas</p>
                        <div className="p-col-12">
                            <Button id="system-transformation"  style={{opacity: opacity1Button}} className="filter-icons-button margin-right-7 cgiar6" onClick={selectButtonIcon}><img src={cgiar6} width={70}/></Button>
                            <Button id="resilient-agrifood" style={{opacity: opacity2Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar7} width={70}/></Button>
                            <Button id="genetic-innovation" style={{opacity: opacity3Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar8} width={70}/></Button>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Regions of Implementation</p>
                        <MultiSelect filter id="regions_of_implementation" optionLabel="value" value={regionsOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Regions)} className="filter-dropdown-analytics" />
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Countries of Implementation</p>
                        <MultiSelect filter id="countries_of_implementation" optionLabel="value" value={countriesOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Countries)} className="filter-dropdown-analytics" />
                    </div>
                </div>
                <div className="p-grid p-justify-center margin-top-40 margin-bottom-20">
                    <Button icon="fad fa-filter fa-lg" label="Filter" className="button-filter" onClick={handleFilterButton}></Button>
                    <Button icon="fad fa-times fa-lg" label="Clear" className="button-filter-clear" onClick={clearFiltersButton}></Button>
                </div>
            </Card>

        );
    }

    //...Evaluator and Km Officer Filter Displaying Function...

    const evaluatorAndKmFilterAnalytics = () => {

        return (
            <Card className="filter-container">
                <div className="p-grid p-justify-between">
                    <div className="p-col-8 p-offset-2 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by CGIAR Action Areas</p>
                        <div className="p-col-12">
                            <Button id="system-transformation"  style={{opacity: opacity1Button}} className="filter-icons-button margin-right-7 cgiar6" onClick={selectButtonIcon}><img src={cgiar6} width={70}/></Button>
                            <Button id="resilient-agrifood" style={{opacity: opacity2Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar7} width={70}/></Button>
                            <Button id="genetic-innovation" style={{opacity: opacity3Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar8} width={70}/></Button>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by CGIAR Impact Areas</p>
                        <div className="p-col-12">
                            <Button id="nutrition" style={{opacity: opacity4Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar1} width={70}/></Button>
                            <Button id="poverty_reduction" style={{opacity: opacity5Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar2} width={70}/></Button>
                            <Button id="gender_equality" style={{opacity: opacity6Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar3} width={70}/></Button>
                        </div>
                        <div className="p-col-12">
                            <Button id="climate_adaptation" style={{opacity: opacity7Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar4} width={70}/></Button>
                            <Button id="environmental_health" style={{opacity: opacity8Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar5} width={70}/></Button>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Sustainable Development Goals</p>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal1" style={{opacity: opacity9Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal1} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal2" style={{opacity: opacity10Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal2} width={70}/></Button>
                            </div>
                            <div className="display-inline" >
                                <Button id="goal3" style={{opacity: opacity11Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal3} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal4" style={{opacity: opacity12Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal4} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal5" style={{opacity: opacity13Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal5} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal6" style={{opacity: opacity14Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal6} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal7" style={{opacity: opacity15Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal7} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal8" style={{opacity: opacity16Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal8} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal9" style={{opacity: opacity17Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal9} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal10" style={{opacity: opacity18Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal10} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal11" style={{opacity: opacity19Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal11} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal12" style={{opacity: opacity20Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal12} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal13" style={{opacity: opacity21Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal13} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal14" style={{opacity: opacity22Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal14} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal15" style={{opacity: opacity23Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal15} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal16" style={{opacity: opacity24Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal16} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal17" style={{opacity: opacity25Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal17} width={70}/></Button>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Regions of Implementation</p>
                        <MultiSelect filter id="regions_of_implementation" optionLabel="value" value={regionsOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Regions)} className="filter-dropdown-analytics" />
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Countries of Implementation</p>
                        <MultiSelect filter id="countries_of_implementation" optionLabel="value" value={countriesOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Countries)} className="filter-dropdown-analytics" />
                    </div>
                </div>
                <div className="p-grid p-justify-center margin-top-40 margin-bottom-20">
                    <Button icon="fad fa-filter fa-lg" label="Filter" className="button-filter" onClick={handleFilterButton}></Button>
                    <Button icon="fad fa-times fa-lg" label="Clear" className="button-filter-clear" onClick={clearFiltersButton}></Button>
                </div>
            </Card>
        );
    }

    //...Monitoring Officer Filter Displaying Function...

    const monitoringOfficerFilterAnalytics = () => {

        return (
            <Card className="filter-container">
                <div className="p-grid p-justify-between">
                    <div className="p-col-8 p-offset-2 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by CGIAR Action Areas</p>
                        <div className="p-col-12">
                            <Button id="system-transformation"  style={{opacity: opacity1Button}} className="filter-icons-button margin-right-7 cgiar6" onClick={selectButtonIcon}><img src={cgiar6} width={70}/></Button>
                            <Button id="resilient-agrifood" style={{opacity: opacity2Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar7} width={70}/></Button>
                            <Button id="genetic-innovation" style={{opacity: opacity3Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar8} width={70}/></Button>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by CGIAR Impact Areas</p>
                        <div className="p-col-12">
                            <Button id="nutrition" style={{opacity: opacity4Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar1} width={70}/></Button>
                            <Button id="poverty_reduction" style={{opacity: opacity5Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar2} width={70}/></Button>
                            <Button id="gender_equality" style={{opacity: opacity6Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar3} width={70}/></Button>
                        </div>
                        <div className="p-col-12">
                            <Button id="climate_adaptation" style={{opacity: opacity7Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar4} width={70}/></Button>
                            <Button id="environmental_health" style={{opacity: opacity8Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar5} width={70}/></Button>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Sustainable Development Goals</p>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal1" style={{opacity: opacity9Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal1} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal2" style={{opacity: opacity10Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal2} width={70}/></Button>
                            </div>
                            <div className="display-inline" >
                                <Button id="goal3" style={{opacity: opacity11Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal3} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal4" style={{opacity: opacity12Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal4} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal5" style={{opacity: opacity13Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal5} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal6" style={{opacity: opacity14Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal6} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal7" style={{opacity: opacity15Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal7} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal8" style={{opacity: opacity16Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal8} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal9" style={{opacity: opacity17Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal9} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal10" style={{opacity: opacity18Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal10} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal11" style={{opacity: opacity19Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal11} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal12" style={{opacity: opacity20Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal12} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal13" style={{opacity: opacity21Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal13} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal14" style={{opacity: opacity22Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal14} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal15" style={{opacity: opacity23Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal15} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal16" style={{opacity: opacity24Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal16} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal17" style={{opacity: opacity25Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal17} width={70}/></Button>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Regions of Implementation</p>
                        <MultiSelect filter id="regions_of_implementation" optionLabel="value" value={regionsOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Regions)} className="filter-dropdown-analytics" />
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Countries of Implementation</p>
                        <MultiSelect filter id="countries_of_implementation" optionLabel="value" value={countriesOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Countries)} className="filter-dropdown-analytics" />
                    </div>
                </div>
                <div className="p-grid p-justify-center margin-top-40 margin-bottom-20">
                    <Button icon="fad fa-filter fa-lg" label="Filter" className="button-filter" onClick={handleFilterButton}></Button>
                    <Button icon="fad fa-times fa-lg" label="Clear" className="button-filter-clear" onClick={clearFiltersButton}></Button>
                </div>
            </Card>
        );
    }

    //...Impact Officer Filter Displaying Function...

    const impactOfficerFilterAnalytics = () => {

        return(
            <Card className="filter-container">
                <div className="p-grid p-justify-between">
                    <div className="p-col-8 p-offset-2 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by CGIAR Action Areas</p>
                        <div className="p-col-12">
                            <Button id="system-transformation"  style={{opacity: opacity1Button}} className="filter-icons-button margin-right-7 cgiar6" onClick={selectButtonIcon}><img src={cgiar6} width={70}/></Button>
                            <Button id="resilient-agrifood" style={{opacity: opacity2Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar7} width={70}/></Button>
                            <Button id="genetic-innovation" style={{opacity: opacity3Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar8} width={70}/></Button>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by CGIAR Impact Areas</p>
                        <div className="p-col-12">
                            <Button id="nutrition" style={{opacity: opacity4Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar1} width={70}/></Button>
                            <Button id="poverty_reduction" style={{opacity: opacity5Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar2} width={70}/></Button>
                            <Button id="gender_equality" style={{opacity: opacity6Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar3} width={70}/></Button>
                        </div>
                        <div className="p-col-12">
                            <Button id="climate_adaptation" style={{opacity: opacity7Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar4} width={70}/></Button>
                            <Button id="environmental_health" style={{opacity: opacity8Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar5} width={70}/></Button>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Sustainable Development Goals</p>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal1" style={{opacity: opacity9Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal1} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal2" style={{opacity: opacity10Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal2} width={70}/></Button>
                            </div>
                            <div className="display-inline" >
                                <Button id="goal3" style={{opacity: opacity11Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal3} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal4" style={{opacity: opacity12Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal4} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal5" style={{opacity: opacity13Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal5} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal6" style={{opacity: opacity14Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal6} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal7" style={{opacity: opacity15Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal7} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal8" style={{opacity: opacity16Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal8} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal9" style={{opacity: opacity17Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal9} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal10" style={{opacity: opacity18Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal10} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal11" style={{opacity: opacity19Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal11} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal12" style={{opacity: opacity20Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal12} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal13" style={{opacity: opacity21Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal13} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal14" style={{opacity: opacity22Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal14} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal15" style={{opacity: opacity23Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal15} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal16" style={{opacity: opacity24Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal16} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal17" style={{opacity: opacity25Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal17} width={70}/></Button>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Regions of Implementation</p>
                        <MultiSelect filter id="regions_of_implementation" optionLabel="value" value={regionsOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Regions)} className="filter-dropdown-analytics" />
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Countries of Implementation</p>
                        <MultiSelect filter id="countries_of_implementation" optionLabel="value" value={countriesOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Countries)} className="filter-dropdown-analytics" />
                    </div>
                </div>
                <div className="p-grid p-justify-center margin-top-40 margin-bottom-20">
                    <Button icon="fad fa-filter fa-lg" label="Filter" className="button-filter" onClick={handleFilterButton}></Button>
                    <Button icon="fad fa-times fa-lg" label="Clear" className="button-filter-clear" onClick={clearFiltersButton}></Button>
                </div>
            </Card>
        );
    }

    //...User Filter Displaying Function...

    const userFilterAnalytics = () => {

        return(
            <Card className="filter-container">
                <div className="p-grid p-justify-between">
                    <div className="p-col-8 p-offset-2 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by CGIAR Action Areas</p>
                        <div className="p-col-12">
                            <Button id="system-transformation"  style={{opacity: opacity1Button}} className="filter-icons-button margin-right-7 cgiar6" onClick={selectButtonIcon}><img src={cgiar6} width={70}/></Button>
                            <Button id="resilient-agrifood" style={{opacity: opacity2Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar7} width={70}/></Button>
                            <Button id="genetic-innovation" style={{opacity: opacity3Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar8} width={70}/></Button>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by CGIAR Impact Areas</p>
                        <div className="p-col-12">
                            <Button id="nutrition" style={{opacity: opacity4Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar1} width={70}/></Button>
                            <Button id="poverty_reduction" style={{opacity: opacity5Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar2} width={70}/></Button>
                            <Button id="gender_equality" style={{opacity: opacity6Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar3} width={70}/></Button>
                        </div>
                        <div className="p-col-12">
                            <Button id="climate_adaptation" style={{opacity: opacity7Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar4} width={70}/></Button>
                            <Button id="environmental_health" style={{opacity: opacity8Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={cgiar5} width={70}/></Button>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Sustainable Development Goals</p>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal1" style={{opacity: opacity9Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal1} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal2" style={{opacity: opacity10Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal2} width={70}/></Button>
                            </div>
                            <div className="display-inline" >
                                <Button id="goal3" style={{opacity: opacity11Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal3} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal4" style={{opacity: opacity12Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal4} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal5" style={{opacity: opacity13Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal5} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal6" style={{opacity: opacity14Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal6} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal7" style={{opacity: opacity15Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal7} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal8" style={{opacity: opacity16Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal8} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal9" style={{opacity: opacity17Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal9} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal10" style={{opacity: opacity18Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal10} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal11" style={{opacity: opacity19Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal11} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal12" style={{opacity: opacity20Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal12} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal13" style={{opacity: opacity21Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal13} width={70}/></Button>
                            </div>
                            <div className="margin-right-7 display-inline">
                                <Button id="goal14" style={{opacity: opacity22Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal14} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal15" style={{opacity: opacity23Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal15} width={70}/></Button>
                            </div>
                        </div>
                        <div className="p-col-12">
                            <div className="margin-right-7 display-inline">
                                <Button id="goal16" style={{opacity: opacity24Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal16} width={70}/></Button>
                            </div>
                            <div className="display-inline">
                                <Button id="goal17" style={{opacity: opacity25Button}} className="filter-icons-button margin-right-7" onClick={selectButtonIcon}><img src={goal17} width={70}/></Button>
                            </div>
                        </div>
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Regions of Implementation</p>
                        <MultiSelect filter id="regions_of_implementation" optionLabel="value" value={regionsOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Regions)} className="filter-dropdown-analytics" />
                    </div>
                    <div className="p-col-8 p-offset-2 margin-top-20 responsive-div-sidebar">
                        <p className="filter-headings-analytics">Filter by Countries of Implementation</p>
                        <MultiSelect filter id="countries_of_implementation" optionLabel="value" value={countriesOfImplementationItem} onChange={onFilterChange} options={filterRegionsValues(filterResults.Countries)} className="filter-dropdown-analytics" />
                    </div>
                </div>
                <div className="p-grid p-justify-center margin-top-40 margin-bottom-20">
                    <Button icon="fad fa-filter fa-lg" label="Filter" className="button-filter" onClick={handleFilterButton}></Button>
                    <Button icon="fad fa-times fa-lg" label="Clear" className="button-filter-clear" onClick={clearFiltersButton}></Button>
                </div>
            </Card>
        );
    }

    return (
        <>
            {filters}
        </>
    );
}

export default FilterAnalytics
