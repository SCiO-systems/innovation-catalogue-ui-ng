import React, {useEffect, useState} from "react";
import CountUp from 'react-countup';
import {useNavigate} from "react-router-dom";
import ResultsService from "../../services/ResultsService";
import addImage from '../../assets/home/add.png'
import searchImage from '../../assets/home/search.png'
import viewImage from '../../assets/home/view.png'
import builtIcon from '../../assets/home/builtIcon.png'
import flagIcon from '../../assets/home/flagIcon.png'
import ideaIcon from '../../assets/home/ideaIcon.png'
import worldIcon from '../../assets/home/worldIcon.png'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reducer/actions";

import TestService from '../../services/axios-test/testing'
import CsrfService from '../../services/axios-test/csrf'

const Home = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const setCurrentPage = (payload) => dispatch({ type: Actions.SetCurrentPage, payload });

    const csrfToken = useSelector((state) => state.csrfToken)

    const jsonTemplate = {keywords: [], filters:[]};
    const [queryJson, setQueryJson] = useState(jsonTemplate);
    const [innovations,setInnovations] = useState(null);
    const [countries,setCountries] = useState(null);
    const [sdg,setSDG] = useState(null);
    const [organization,setOrganization] = useState(null);
    const searchUrl = "/search/";
    const analyticsUrl = "/analytics/";
    let urlAddInnovation = "/add-innovation/"
    let loginUrl = "/login"

    let tokenStorage = localStorage.getItem("token");

    const [lazyParams, setLazyParams] = useState({
        first: 0,
        page: 1,
        action:"search",
        field:"default",
        sort:0,
        rows:10
    });

    function countUnique(iterable) {
        return new Set(iterable).size;
    }

    const [haveWeReceivedPostResponseState, setHaveWeReceivedPostResponseState] = useState("not yet")

    useEffect(() => {
        setCurrentPage('/')
        const resultService = new ResultsService();
        resultService.getSearchResults(queryJson,lazyParams).then(data =>{
            setInnovations(data.data.total);
            setCountries(data.data.summaries.Countries.length);
            setSDG(countUnique(data.data.summaries.sdg));
            setOrganization(data.data.summaries.organization.length);
        } );
    }, []);


    return(
        <div>
            <div className="home-welcome-container">

            </div>

            <div style={{paddingTop:"40px"}}>
                <center>
                    <img className="home-logo" src="assets/elements/logo.png"></img>
                </center>

                <h1 style={{color:"#B12425"}} className="welcome-heading margin-bottom-40" >Welcome to the RTB Innovation Catalog</h1>
                <p style={{
                    color:"#B12425",
                    textAlign:"center",
                    paddingLeft:"60px",
                    paddingRight:"60px",
                    fontSize:"20px"}} className="welcome-text">An online platform that offers a comprehensive, single-entry point for exploring agricultural innovations. The RTB Innovation Catalog allows visitors to quickly and easily find suitable innovations.
                    The Catalog has been developed with funding from the CGIAR Research Program for Roots, Tubers and Bananas (RTB).  </p>
            </div>

            <div style={{paddingTop:"80px"}}>
            <div className="home_todo">
                <h1 style={{
                    color:"#B12425",
                    textAlign:"center",
                    paddingLeft:"60px",
                    paddingRight:"60px",
                    paddingTop:"80px"
                   }}
                    className="buttons-heading margin-top-120">What do you want to do?</h1>
                <div className="p-grid p-justify-center margin-top-80 home_todo">
                    <div className="col-4 margin-right-70 responsive-buttons-layout">
                        <a onClick={async() => {
                            TestService.test(csrfToken)
                                .then(res => {
                                    console.log(res)
                                })
                            setHaveWeReceivedPostResponseState(await CsrfService.testCsurfPostClick(csrfToken))
                            navigate(searchUrl)
                        }}>
                            <img style={{height:"300px"} } src={searchImage}></img>
                       </a>
                    </div>
                    <div className="col-4 margin-right-70 responsive-buttons-layout">
                        <a onClick={() => navigate(analyticsUrl)}>
                            <img style={{height:"300px"} } src={viewImage}></img>
                        </a>
                    </div>
                    <div className="col-4 responsive-buttons-layout">
                        <a onClick={() => navigate("/comingsoon")}>
                            <img style={{height:"300px"} } src={addImage}></img>
                        </a>
                    </div>
                </div>
            </div>
            </div>
            <div className="home_counter_container">
                <div className="p-grid p-justify-center">
                    <div className="p-col-12 p-md-6 p-lg-3 text-align-center">
                        <img style={{height:"150px"} } src={ideaIcon}></img>
                        <p className="counter-p-small">a collection of</p>
                        <CountUp className="counter-numbers" end={innovations} duration={2}/>
                        <p className="counter-p-big">Innovations</p>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-3 text-align-center">
                        <img style={{height:"150px"} } src={builtIcon}></img>
                        <p className="counter-p-small">from</p>
                        <CountUp className="counter-numbers" end={organization} duration={2}/>
                        <p className="counter-p-big">Organizations</p>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-3 text-align-center">
                        <img style={{height:"150px"} } src={flagIcon}></img>
                        <p className="counter-p-small">implemented in</p>
                        <CountUp className="counter-numbers" end={countries} duration={2}/>
                        <p className="counter-p-big">Countries</p>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-3 text-align-center">
                        <img style={{height:"150px"} } src={worldIcon}></img>
                        <p className="counter-p-small">addressing</p>
                        <CountUp className="counter-numbers" end={sdg} duration={2}/>
                        <p className="counter-p-big">SDG Targets</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home
