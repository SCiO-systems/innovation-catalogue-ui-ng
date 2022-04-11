import React from 'react';
import classNames from 'classnames';
import {AppMenu,LoginMenu} from './components';
import {useNavigate} from "react-router-dom";
import { useSelector} from "react-redux";

const AppTopBar = (props) => {

    const loggedIn = useSelector((state) => state.loggedIn)

    const loginUrl = "/login"

	let menuButtonClassName = classNames('layout-menubutton ', { 'layout-menubutton-active': props.menuActive })
    let roleMapping = [
        {type: "user", role_name: "Innovation User"},
        {type: "donor", role_name: "Investor/Donor"},
        {type: "evaluator", role_name: "Evaluator"},
        {type: "monitoring_officer", role_name: "Monitoring Officer"},
        {type: "impact_officer", role_name: "Impact Assessment Officer"},
        {type: "km_officer", role_name: "Knowledge Sharing and Communication Officer"},
        {type: "project_manager", role_name: "Project/Program Manager"}
    ];

    const navigate = useNavigate();

    const guestInfo = () =>{

	    let selectedRole = localStorage.getItem("selectedRole");
        if(!selectedRole){
            return (
                <>
                    <span className="guest-topbar"><i className="fad fa-user user-icon-topbar"/></span>
                </>
            );
        }
        let roleData = roleMapping.filter(element => {
            if(element.type === selectedRole){
                return element;
            }
        })

        return (
                <>
                    <a onClick={() => navigate("/role")}>
                        <span className="guest-topbar"><i className="fad fa-user user-icon-topbar"/>Guest ({roleData[0].role_name}) </span>
                    </a>
                </>
        );
    }

	const loginButton = () =>{
	    return(
	        <div>
                <span>
                    {guestInfo()}
                </span>
                <span>
                    <a onClick={() => navigate(loginUrl)}>
                        <span className="login-button-topbar">Login</span>
                    </a>
                </span>
            </div>
        );
    }

    const loginCheck = () => {
        if(loggedIn === 'logged in'){
           return <LoginMenu topbarUserMenuActive={props.topbarUserMenuActive} onTopbarUserMenuButtonClick={props.onTopbarUserMenuButtonClick} onTopbarUserMenuClick={props.onTopbarUserMenuClick} />;
        }else{
            return loginButton();
        }
    }

	return (

		<div className="layout-topbar">
			<button type="button" className={menuButtonClassName} onClick={props.onMenuButtonClick}>
				<div className="layout-menubutton-icon" />
			</button>

			<div className="layout-topbar-grid">
				<div className="layout-topbar-grid-column layout-topbar-grid-column-fixed">
					<button type="button" className="layout-logo p-link" onClick={() => { window.location = "/#" }}>
						<div className="logo-fix">
                            <img style={{width:"200px",height:"75px"} }src="assets/elements/logo.png"></img>
                        </div>
					</button>
				</div>

				<div className="layout-topbar-grid-column">
					<AppMenu model={props.model} horizontal={props.horizontal} menuHoverActive={props.menuHoverActive} isMobile={props.isMobile}
						onMenuItemClick={props.onMenuItemClick} onRootMenuItemClick={props.onRootMenuItemClick} onSidebarClick={props.onSidebarClick} />
				</div>
                {loginCheck()}
            </div>
        </div>
	);
}

export default AppTopBar;
