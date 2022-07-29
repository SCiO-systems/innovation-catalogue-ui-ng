import React from "react";
import policy from "../../assets/PRIVACY-POLICIES.png";

const PrivacyPolicy = () => {

    return (
        <div>
            <div className="terms-of-use-header">
                <img src={policy} width={250}/>
                <h1 className="terms-of-use-heading">Privacy Policy</h1>
            </div>
            <div style={{  textAlign:"center", paddingBottom:"60px"}}>
                <div style={{paddingTop:"70px"}}>
                    <p className="welcome-text p-style">RTB, as the administrator of the site, collects, stores, and uses certain types of information about the users of the site for the following purposes:
                        <ul>
                            <li>To provide the information that is most of your interest.</li>
                            <li>To provide news and updates with regards to the site and its content.</li>
                            <li>To evaluate your professional profile in relation to job opportunities inside RTB.</li>
                            <li>To diagnose and get statistic of the site's traffic and to solve issues with the sites functionality to improve it.</li>
                            <li>To follow up with you and respond to requests or questions.</li>
                        </ul>
                    </p>
                </div>
                <div className="padding-top-70">
                    <h1 style={{color:"#B12425", textAlign:"left", paddingLeft:"50px",paddingBottom:"10px", fontSize:"25px", fontWeight: "bold"}} className="welcome-heading" >1.	Type of information to be collected:</h1>
                    <p className="welcome-text p-style">
                        <p style={{paddingBottom:"10px"}}>a.	Personal Contact nformation</p>
                        Access and use of this site and its content may be done without providing any personal contact information. Your personal contact information, such as your name (first name, last name), email address, telephone number and your organizations name shall only be collected when you subscribe voluntarily to receive news and updates from RTB, or when you apply for receiving any specific service or information.
                        Personal identifiable data is only shared internally in order to process communications, and with our service provider, Mailchimp, only for delivering quarterly newsletters to all our subscribers. We do not sell your personal contact information and we will never do.
                    </p>
                    <p className="welcome-text p-style">
                        <p style={{paddingBottom:"10px"}}>b.	Non identifiable nformation</p>
                        RTB may record and analyze information about your interaction with this site. This may include your ΙP address, the URL/domain name of any referring website, the time and date of your visit to the site and the type of pages visited, among other; some of this information may be collected by using cookies. This information provides statistics about the geographical distribution of visitors to our site, the technology they use to access the site, most visited pages in this site and preferred content shared in our Site, which helps us understand the preferences of the site users and improve the site.
                        This information cannot be traced back to a particular individual and is never connected to the personal contact information you provide to us.
                        We share non-personal information within the System Organization and with companies and/or consultants involved in our communications activities.
                    </p>

                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">2.	Use of cookies</h1>
                    <p className="welcome-text p-style">As explained before, RTB may record and analyze non identifiable information by using cookies. When first accessing to this site you will be asked to accept or deny the use of our cookies, and when even accepted, and if permitted by your browser, you can always decline our cookies.
                        If our cookies are decline, you may not be able to use all certain features on this Site.
                    </p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">3.	Time we may retain your personal information</h1>
                    <p className="welcome-text p-style">RTB may retain your personal contact information during the time needed for providing the requested services and permitted by applicable law. Confidentiality, integrity and availability of information are protected.
                    </p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">4.	Third Party Sites</h1>
                    <p className="welcome-text p-style">This Site may include content from third party sites and its corresponding links. This privacy Policy does not apply to such content nor its links, which are govern by their own privacy policies.
                    </p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">5.	Changes</h1>
                    <p className="welcome-text p-style">RTB hereby reserves the right to modify this privacy Policy as it may deem necessary at any time and will be effective as soon as posted.
                    </p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">6.	Contact information for requests and managing your personal information</h1>
                    <p className="welcome-text p-style"> In case you want to limit the use or disclosure of your personal data or to exercise your right to access, rectify, cancel or oppose to the treatment of your personal information, you can contact to: rtb@cgiar.org to submit your request.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy
