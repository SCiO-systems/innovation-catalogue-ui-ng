import React from "react";
import sarfatti from "../../assets/people/sarfatti.jpg";
import bonaiuti from "../../assets/people/bonaiuti.jpg";
import clarke from "../../assets/people/clarke.jpg";
import kostantinidis from "../../assets/people/kostantinidis.jpg";
import naziri from "../../assets/people/naziri.jpg";
import sartas from "../../assets/people/sar.jpg";
import schut from "../../assets/people/schut.jpg";
import zervas from "../../assets/people/zervas.jpg";

const About = () => {

    return (
        <div>
            <div className="about-page-bg-image">

            </div>
            <div className="text-align-center">
                <div className="padding-top-70">
                    <h1 style={{color:"#B12425"}} className="welcome-heading margin-bottom-40 " >About Innovation Catalog</h1>
                    <p className="welcome-text p-style">An online platform that offers a comprehensive, single-entry point for exploring agricultural innovations.
                        The RTB Innovation Catalog allows visitors to quickly and easily find suitable innovations. The Catalog as been developed with funding from the CGIAR Research Program for Roots, Tubers and Bananas (RTB).</p>
                </div>
                <div className="padding-top-70">
                    <h1 style={{color:"#B12425"}} className="welcome-heading margin-bottom-40" >Why an Innovation Catalog?</h1>
                    <p className="welcome-text p-style">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
            <div className="about-page-people-bg">
                <div className="padding-top-70">
                    <h1 style={{color:"#B12425"}} className="welcome-heading margin-bottom-40" >Who we are</h1>
                </div>
                <div className="p-grid p-justify-center about-page-people">
                    <div className="p-col text-align-center">
                        <img src={sarfatti} className="about-page-avatar"></img>
                        <div>
                            <p className="avatar-fullname">Paolo Sarfatti</p>
                            <p className="avatar-title">Title</p>
                        </div>
                    </div>
                    <div className="p-col text-align-center">
                        <img src={bonaiuti} className="about-page-avatar"></img>
                        <div>
                            <p className="avatar-fullname">Enrico Bonaiuti</p>
                            <p className="avatar-title">Title</p>
                        </div>
                    </div>
                    <div className="p-col text-align-center">
                        <img src={clarke} className="about-page-avatar"></img>
                        <div>
                            <p className="avatar-fullname">Victoria Clarke</p>
                            <p className="avatar-title">Title</p>
                        </div>
                    </div>
                    <div className="p-col text-align-center">
                        <img src={kostantinidis} className="about-page-avatar"></img>
                        <div>
                            <p className="avatar-fullname">Sotiris Konstantinidis</p>
                            <p className="avatar-title">Title</p>
                        </div>
                    </div>
                </div>
                <div className="p-grid p-justify-center avatars-border-bottom padding-40">

                    <div className="p-col text-align-center">
                        <img src={naziri} className="about-page-avatar"></img>
                        <div>
                            <p className="avatar-fullname">Diego Naziri</p>
                            <p className="avatar-title">Title</p>
                        </div>
                    </div>
                    <div className="p-col text-align-center">
                        <img src={sartas} className="about-page-avatar"></img>
                        <div>
                            <p className="avatar-fullname">Murat Sartas</p>
                            <p className="avatar-title">Title</p>
                        </div>
                    </div>
                    <div className="p-col text-align-center">
                        <img src={schut} className="about-page-avatar"></img>
                        <div>
                            <p className="avatar-fullname">Marc Schut</p>
                            <p className="avatar-title">Title</p>
                        </div>
                    </div>
                    <div className="p-col text-align-center">
                        <img src={zervas} className="about-page-avatar"></img>
                        <div>
                            <p className="avatar-fullname">Panagiotis Zervas</p>
                            <p className="avatar-title">Title</p>
                        </div>
                    </div>
                </div>
                <hr className="about-page-hr"/>
                <div className="about-page-contact">
                    <div>
                        <p className="contact-info-b">International Potato Center</p>
                        <p className="contact-info">Headquarters Lima, Peru</p>
                        <p className="contact-info">Address: Apartado 1558, Lima, Peru</p>
                        <p className="contact-info">+51 1349 6017</p>
                        <p className="contact-info">Email: rtb@cgiar.org</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default About
