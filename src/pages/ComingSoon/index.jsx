import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import search from '../../assets/home/search.png'
import view from '../../assets/home/view.png'

const Comingsoon = () => {

    const searchUrl = "/search/";
    const analyticsUrl = "/analytics/";
    let urlAddInnovation = "/add-innovation/"
    let loginUrl = "/login"

    let tokenStorage = localStorage.getItem("token");

    return(

        <div>

            <div style={{paddingTop:"40px"}}>
                <center>
                    <img style={{width:"400px",height:"150px"} }src="assets/elements/logo.png"></img>
                </center>

                <h1 style={{color:"#B12425"}} className="welcome-heading margin-bottom-40" >Welcome to the RTB Innovation Catalog</h1>
                <p style={{
                    color:"#B12425",
                    textAlign:"center",
                    paddingLeft:"60px",
                    paddingRight:"60px",
                    fontSize:"20px"}} className="welcome-text">


                </p>
            </div>

            <div className="home_todo">
                <h1 style={{
                    color:"#B12425",
                    textAlign:"center",
                    paddingLeft:"60px",
                    paddingRight:"60px",
                    paddingTop:"80px"
                }}
                    className="buttons-heading margin-top-120">
                    Coming Soon ... In the meantime, what do you want to do?
                </h1>
                <div className="p-grid p-justify-center margin-top-80 home_todo">
                    <div className="col-4 margin-right-70 responsive-buttons-layout">
                        <Link to={searchUrl}>
                            <img style={{height:"300px"} } src={search}></img>
                        </Link>
                    </div>
                    <div className="col-4 margin-right-70 responsive-buttons-layout">
                        <Link to={analyticsUrl}>
                            <img style={{height:"300px"} } src={view}></img>
                        </Link>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Comingsoon
