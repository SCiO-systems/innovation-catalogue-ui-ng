import React, {useEffect, useState} from "react";
import {SearchBar, Filters} from './components'
import ResultsService from "../../services/ResultsService";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {ProgressBar} from "primereact/progressbar";
import {Card} from "primereact/card";
import {DataView} from "primereact/dataview";
import {Button} from "primereact/button";
import {useDispatch} from "react-redux";
import {Actions} from "../../reducer/actions";
import Loading from '../../components/Loading'

const Search = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const setCurrentPage = (payload) => dispatch({ type: Actions.SetCurrentPage, payload });

    const jsonTemplate = {keywords: [], filters:[]};

    const [queryJson, setQueryJson] = useState(jsonTemplate);
    const [queryPath, setQueryPath] = useState("/search/");
    const [results, setResults] = useState(null);
    const [total, setTotal] = useState(null);
    const [search, setSearch] = useState(true);

    const [visibleTitle, setVisibleTitle] = useState(true);
    const [visibleDate, setVisibleDate] = useState(true);
    const [loading, setLoading] = useState(true);
    const innovationUrl = "/innovation/"

    const [action, setAction] = useState("search");
    const [field, setField] = useState("default");
    const [sort, setSort] = useState("default");
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        page: 1,
        action:"search",
        field:"default",
        sort:0,
        rows:10
    });

    let location = useLocation();
    const query = useParams();

    useEffect(
        () => {
            setCurrentPage('search')
            if (!localStorage.getItem("selectedRole")){
                navigate('/role')
            }
        }, []
    )

    useEffect(() => {

        setSearch(false);
        let parameters = location.pathname.split("/");

        const resultService = new ResultsService();
        if((parameters.length === 3)&&(parameters[2])!==""){
            resultService.getSearchResults(JSON.parse(parameters[2]),lazyParams).then(data =>{
                if(data){
                    setResults(data.data);
                    setTotal(data.data.total);
                    setSearch(true);
                }else{
                    setResults({
                        results:[]
                    });
                    setTotal(0);
                    setSearch(true);
                }

            } );
        }else{
            resultService.getSearchResults(queryJson,lazyParams).then(data =>{
                if(data){
                    setResults(data.data);
                    setTotal(data.data.total);
                    setSearch(true);
                }else{
                    setResults({
                        results:[]
                    });
                    setTotal(0);
                    setSearch(true);
                }
            } );
        }

        if(queryJson !== jsonTemplate){
            console.log(queryJson)
            setQueryPath("/search/" + JSON.stringify(queryJson))
        }


    }, [lazyParams]);


    useEffect(() => {
        setSearch(false);
        const resultService = new ResultsService();

        resultService.getSearchResults(queryJson,lazyParams).then(data =>{
            if(data){
                setResults(data.data);
                setTotal(data.data.total);
                setSearch(true);
            }else{
                setResults({
                    results:[]
                });
                setTotal(0);
                setSearch(true);
            }
        } );

        if(queryJson !== jsonTemplate){
            setQueryPath("/search/" + JSON.stringify(queryJson))
        }
    }, [queryJson, queryPath]);

    const handleChange = (newValue) => {
        setQueryJson(newValue);
    }

    const onSortTitleDescending = () => {
        setVisibleTitle(false);
        let _lazyParams = lazyParams;
        _lazyParams.field = "title";
        _lazyParams.sort = -1;
        _lazyParams.action = "ordered_search"
        setLazyParams({..._lazyParams});
    }

    const onSortTitleAscending = () => {
        setVisibleTitle(true);
        let _lazyParams = lazyParams;
        _lazyParams.field = "title";
        _lazyParams.sort = 1;
        _lazyParams.action = "ordered_search"
        setLazyParams({..._lazyParams});

    }

    const onSortDateDescending = () => {
        setVisibleDate(false);
        let _lazyParams = lazyParams;
        _lazyParams.field = "last_updated";
        _lazyParams.sort = -1;
        _lazyParams.action = "ordered_search"
        setLazyParams({..._lazyParams});

    }

    const onSortDateAscending = () => {
        setVisibleDate(true);
        let _lazyParams = lazyParams;
        _lazyParams.field = "last_updated";
        _lazyParams.sort = 1;
        _lazyParams.sort = 1;
        _lazyParams.action = "ordered_search"
        setLazyParams({..._lazyParams});
    }

    const onPage = (event) => {
        let _lazyParams =
            {
                first: event.first,
                rows: event.rows,
                page: event.page,
                action:action,
                field:field,
                sort:sort
            }
        setLazyParams({..._lazyParams});
    }

    const renderHeader = () => {

        return (
            <div className="p-grid p-nogutter">
                <div className="p-col" style={{textAlign: 'left'}}>
                    <div className={visibleTitle?"visible": "not-visible"}>
                        <Button className="button-sorting margin-right" label="Title" icon="fad fa-sort-amount-down fa-lg" onClick={onSortTitleDescending}></Button>
                    </div>
                    <div className={visibleTitle?"not-visible": "visible"}>
                        <Button className="button-sorting margin-right" label="Title" icon="fad fa-sort-amount-up fa-lg" onClick={onSortTitleAscending}></Button>
                    </div>
                    <div className={visibleDate?"visible": "not-visible"}>
                        <Button className="button-sorting" label="Most Recent" icon="fad fa-sort-amount-down fa-lg" onClick={onSortDateDescending}></Button>
                    </div>
                    <div className={visibleDate?"not-visible": "visible"}>
                        <Button className="button-sorting" label="Most Recent" icon="fad fa-sort-amount-up fa-lg" onClick={onSortDateAscending}></Button>
                    </div>
                </div>
            </div>
        );
    }

    const renderListItem = (data) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item margin-top-20 margin-bottom-20">
                    <h3 className="innovation-title-results">{data.title}</h3>
                    <div className="product-list-detail">
                        <div className="margin-bottom-20 display-list" >
                            <div className="margin-right">
                                <p><i className="fad fa-user fa-lg" style={{color: "#d68227"}}></i> {data.submitter.submitter_first_name} {data.submitter.submitter_last_name}</p>
                            </div>
                            <div className="margin-right">
                                <p><i className="fad fa-envelope fa-lg" style={{color: "#d68227"}}></i> {data.submitter.submitter_email}</p>
                            </div>
                            <div className="margin-right">
                                <p><i className="fad fa-calendar-edit fa-lg" style={{color: "#d68227"}}></i> {data.last_updated}</p>
                            </div>
                        </div>
                        <p className="text-align-justify">{data.summary}</p>
                    </div>
                    <div className="product-list-action p-grid p-justify-end margin-top-5">
                        <Link to={innovationUrl + data.innovation_id}>
                            <Button label="View" className="button-view-results"></Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product, layout) => {
        if(product){
            if (layout === 'list'){
                return renderListItem(product);
            }
        }else{
            return <></>
        }
    }

    const header = renderHeader();

    const renderPage = () =>{


        return(
            <div>
                <div hidden={search}>
                    <ProgressBar mode="indeterminate" />
                </div>
                <SearchBar queryJson={queryJson} callback={handleChange}></SearchBar>
                <div className="p-grid p-justify-center search-results-padding">
                    <div className="p-col-fixed margin-right margin-bottom-20 sidebar-filters-width">
                        <Filters queryJson={queryJson} callback={handleChange} filters={results.summaries} query={query.query}></Filters>
                    </div>
                    <div className="p-col results-innovations-width">
                        <div className="dataview-demo">
                            <div>
                                <Card>
                                    <h4 className="heading-result-h4"><span className="heading-result-span">{total}</span> Innovation Results Found</h4>
                                </Card>
                            </div>
                            <div className="card margin-top-40">
                                {
                                    results.results?
                                        <DataView
                                            value={results.results}
                                            layout="list"
                                            header={header}
                                            itemTemplate={itemTemplate}
                                            paginator rows={lazyParams.rows} rowsPerPageOptions={[5,10,20,50]}
                                            lazy={true}
                                            onPage={onPage}
                                            totalRecords={total}
                                            first={lazyParams.first}
                                        />:console.log()
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {results?renderPage():<Loading visible={results}/>}
        </div>
    );
}

export default Search
