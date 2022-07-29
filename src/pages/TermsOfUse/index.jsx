import React from "react";
import terms from "../../assets/TERM.png";

const TermsOfUse = () => {

    return (
        <div>
            <div className="terms-of-use-header">
                <img src={terms} width={250}/>
                <h1 className="terms-of-use-heading">Terms of use</h1>
            </div>
            <div style={{ textAlign:"center", paddingBottom:"60px"}}>
                <div className="padding-top-70">
                    <p className="welcome-text p-style">This site is managed and administered by the CGIAR Research Program on Roots, Tubers and Bananas (RTB) led by the International Potato Center (CIP).
                        Access and use to this site as well as to its content, such as materials, data and any other type of information shall be governed by these Terms of Use.
                        Thus, by accessing and using this site, you agree to be bound by these Terms of Use as well national and international law that may apply to the access and use of this
                        site and its content. RTB reserves the right to modify these Terms of Use at its discretion at any time, such modifications being effective when posted.</p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style" >Access to content</h1>
                    <p className="welcome-text p-style">By accessing this site you may access content including but not limited to materials, data, images, documents, database, software, video recordings,
                        audio recordings and any other type of information either (i) developed and made available by RTB (RTB Content) (ii) made available by people who may include
                        staff of or personnel associated with CGIAR Research Programs, CGIAR Platforms and other CGIAR Centers ("Contributed Content"), or (iii) belonging to or originated
                        by third parties, made available through the Platform site through links or by citation or aggregation ("Third Party Content").</p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">Permitted Use</h1>
                    <p className="welcome-text p-style">Access and use to this site and content are provided in accordance with the CGIAR Principles on the Management of Intellectual
                        Assets (https://www.cgiar.org/resources/cgiar-intellectual-asset- management/) and the CGIAR Open Access Policy
                        (https://www.cgiar.org/resources/open-access/). For this purpose, unless otherwise and explicitly stated, RTB Content are made
                        available by the Creative Commons Attribution-NonCommercial License 4.0	international (CC-BY-NC 4.0).</p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">Third-Party Content</h1>
                    <p className="welcome-text p-style">Use and Access to Third Party Content are governed by the terms of use applicable and contained in third party websites
                        from which such Third Party Content originates. RTB is not responsible and has no control over Third Party Content,
                        thus RTB makes no warranties or representations about the content, information, products, or services offered by third parties.
                        Unless otherwise expressly stated, no sponsorship or endorsement by RTB is therefore hereby implied.
                    </p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">Prohibited Use</h1>
                    <p className="welcome-text p-style">You agree not to use this Site and its content for any unlawful, illegal, fraudulent or harmful purpose and activity or in any way that would violate RTB
                        and third-party rights, including but not limited to intellectual property rights. Use of this site in any way or take any action that causes or may cause,
                        damage to the website or disability of the performance, availability or accessibility of the website is prohibited. You agree not to use the RTB or other partners'
                        logos without our prior written authorization.
                    </p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">Disclaimer/Limitation of liability</h1>
                    <p className="welcome-text p-style">The site and its content are provided by RTB on an "as is" basis. RTB does not warrant or make any representation that any such Content is accurate, complete or current.
                        RTB may make changes to any Content on this site at any time without notice. RTB makes no warranties, either express or implied, as to the reliability, merchantability,
                        and fitness for a particular purpose of any of the Content, as well as to the non-infringement of intellectual property rights or any other violation of rights. No event shall RTB
                        be liable for any loss or damages of any nature, including special, indirect, punitive or consequential damages, arising in connection with the access, use, or reliance on the site
                        and its Content.
                    </p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">Indemnification</h1>
                    <p className="welcome-text p-style">You agree to indemnify and hold the RTB, its employees, officers, trustees, and affiliates, harmless from any claims, losses, or damages,
                        including legal fees, resulting from your use of this Site, its Content, and violation of these Terms of Use, and to fully cooperate in the RTB's defense against any such claims.
                    </p>
                </div>
                <div className="padding-top-70">
                    <h1 className="welcome-heading heading-style">Contact</h1>
                    <p className="welcome-text p-style">Any questions or concerns regarding this Terms of Use, please contact us: CGIAR Research Program on Roots, Tubers and Bananas (RTB)<br/>
                        International Potato Center Headquarters Lima, Peru<br/>
                        Address: Apartado 1558, Lima, Peru<br/>
                        + 51 1 349 6017 ext 3105<br/>
                        Email rtb@cgiar.org<br/>
                    </p>
                </div>
            </div>

        </div>
    );
}
export default TermsOfUse
