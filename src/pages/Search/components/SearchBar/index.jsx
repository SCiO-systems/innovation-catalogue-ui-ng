import React, {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

const SearchBar = (props) => {
    const [searchQuery, setSearchQuery] = useState("");

    const userTargetValue = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleChange = () => {
        let searchQueryArray
        if(props.callback){
            let newQuery = {...props.queryJson};
            if(searchQuery === ""){
                searchQueryArray = [];
            }else{
                searchQueryArray = searchQuery.trim().split(" ");
            }
            newQuery.keywords = searchQueryArray;
            props.callback(newQuery);
        }
    }

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleChange();
        }
    }

    return (
        <div className="p-grid search-bar-container">
            <div className="p-col">
                <InputText type="text" onKeyDown={handleSearchKeyDown} placeholder="Search by keyword" className="input-search" value={searchQuery} onChange={userTargetValue}></InputText>
            </div>
            <div className="p-fixed">
                <Button onClick={handleChange} icon="fad fa-search fa-lg" label="Search" className="search-button" ></Button>
            </div>
        </div>
    );
}

export default SearchBar
