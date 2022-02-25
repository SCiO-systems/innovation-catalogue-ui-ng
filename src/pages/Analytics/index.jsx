import React, {useEffect, useState} from "react";
import { Button } from 'primereact/button';
import {FilterAnalytics,ChartsAnalytics} from "./components";
import ResultsService from "../../services/ResultsService";
import {useNavigate, useParams} from "react-router-dom";
import {Dialog} from "primereact/dialog";
import {useDispatch} from "react-redux";
import {Actions} from "../../reducer/actions";
import Loading from '../../components/Loading'

const Analytics = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const setCurrentPage = (payload) => dispatch({ type: Actions.SetCurrentPage, payload });

    const jsonTemplate = {keywords: [], filters:[]};

    const [queryJson, setQueryJson] = useState(jsonTemplate);

    const [result, setResult] = useState(null);
    const [search, setSearch] = useState(true);
    const [nodata, setNodata] = useState(false);
    const resultsUrl = "/search"
    const resultService = new ResultsService();

    useEffect(
        () => {
            setCurrentPage('analytics')
            if (!localStorage.getItem("selectedRole")){
                navigate('/role')
            }
        }, []
    )

    const [lazyParams, setLazyParams] = useState({
        first: 0,
        page: 1,
        action:"search",
        field:"default",
        sort:0,
        rows:10
    });

    const query = useParams();

    useEffect(() => {
        setSearch(true);
        resultService.getSearchResults(queryJson,lazyParams).then(data =>{
            //console.log(data);
            if(data){
                setResult(data.data);
            }else{
                setNodata(true);
                setResult(null);
            }
            setSearch(false);
        } );
    },[queryJson])

    const handleChange = (newValue) => {
        setQueryJson(newValue);
    }

    const onHide = () => {
        setSearch(false)
    }

    const onHideNoData = () => {
        setNodata(false)
    }

    const clearPage = () =>{
        setNodata(false);
        setQueryJson({...jsonTemplate});
    }


    const renderPage = () =>{
       return (
           <div>
               <Loading visible={search}/>

               <Dialog header="No Results ..." visible={nodata} position={"top"} modal style={{ width: '50vw' }}
                       onHide={() => onHideNoData()}
                       draggable={false} resizable={false}
                       closable = {false}
               >
                   <div className="p-grid ">
                       <div className="p-col"></div>
                       <div className="p-col"></div>
                       <Button label="Clear Filters" className="search-button"  onClick={()=>clearPage()}/>
                   </div>
               </Dialog>

               <div className="p-grid  container-analytics">
                   <div className="p-col-fixed margin-right sidebar-filters-width">
                       {
                           result?
                               <FilterAnalytics
                                   queryJson={queryJson}
                                   callback={handleChange}
                                   filter={result.summaries} query={query.query}>
                               </FilterAnalytics>:
                               console.log()
                       }

                   </div>
                   <div className=" p-col">
                       <div className="p-grid">
                           {
                               result?<ChartsAnalytics charts={result.summaries}></ChartsAnalytics>:
                                   console.log()
                           }
                       </div>
                   </div>
                </div>
           </div>
       );
    }

    return (
        <div>
            {renderPage()}
        </div>

    );

}

export default Analytics
