import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {

    return (
        <div className="layout-footer margin-top-0">
            <div className="p-grid">
                <div className="p-col p-d-flex p-jc-start p-mb-2">
                    <div>
                        <span style={{color: "#fff" , fontSize: "14px", marginRight: "0px", fontFamily: "Montserrat"}}>Developed with funding from</span>
                    </div>
                    <div>
                        <img  className="footer-logo" src="assets/layout/images/logo-white.png" alt="sapphire-layout" />
                    </div>
                </div>
                <div className="p-col">
                    <div
                        style=
                            {{  color: "#fff" ,
                                fontSize: "16px",
                                fontFamily: "Montserrat"
                            }}
                        className="p-mb-2"
                    >CGIAR Research Program on Roots, Tubers and Bannanas (RTB)</div>
                    <div style=
                             {{  color: "#fff" ,
                                 fontSize: "12px",
                                 fontFamily: "Montserrat"
                             }}>
                        Led by the International Potato Center<br></br>
                        Apartado 1558, Lima, Peru + 51 1 349 6017 ext 3105
                    </div>
                </div>
                <div className="p-col">
                    <div style={{
                        textAlign:"justify",
                        textJustify:"inter-word",
                        color:"white",
                        fontSize: "10px"
                    }}
                         className="p-mb-2"
                    >

                        RTB thanks all donors and organizations which globally support
                        its work through their contributions to the CGIAR Trust Fund
                    </div>
                    <div style={{
                        textAlign:"justify",
                        textJustify:"inter-word",
                        color:"white"}}
                         className="p-d-flex p-jc-between p-mb-2">
                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/CC-BY_icon.svg"></img>
                        </div>
                        <div>
                            <span style={{   fontSize: "10px"}}>
                                Copyright 2020 © International Potato Center. All rights reserved
                            </span>
                        </div>
                    </div>
                    <div style={{
                        textAlign:"justify",
                        textJustify:"inter-word",
                        }}
                         className="p-d-flex p-jc-between">
                        <div>

                            <Link to="/comingsoon" >
                                Terms of Use
                            </Link>
                            |
                            <Link to="/comingsoon">
                                Privacy Policy
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer;
