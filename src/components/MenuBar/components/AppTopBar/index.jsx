import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {AppMenu} from './components';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';
import {useNavigate} from "react-router-dom";
import {Button} from "primereact/components/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../reducer/actions";

const AppTopBar = (props) => {

    const dispatch = useDispatch();

    const loggedIn = useSelector((state) => state.loggedIn)
    const setLoggedIn = (payload) => dispatch({ type: Actions.SetLoggedIn, payload });

    const setUserData = (payload) => dispatch({ type: Actions.SetUserData, payload });

    const [role, setRole] = useState(null);

    const profileUrl = '/profile/';
    const myInnovationsUrl = '/innovations/';
    const addInnovationUrl = '/add-innovation/';
    const loginUrl = "/login"
    // const loginUrl = "/comingsoon"

    let topbarMenuClassName = classNames('layout-profile-menu fadeInDown ', { 'layout-profile-menu-active': props.topbarUserMenuActive });
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

    useEffect(() => {

        let selectedRole = localStorage.getItem("selectedRole");

        if(selectedRole === "user"){
            setRole("Innovation User");
        }
        if(selectedRole === "evaluator"){
            setRole("Evaluator");
        }
        if(selectedRole === "donor"){
            setRole("Investor/Donor");
        }
        if(selectedRole === "monitoring_officer"){
            setRole("Monitoring Officer");
        }
        if(selectedRole === "impact_officer"){
            setRole("Impact Assessment Officer");
        }
        if(selectedRole === "km_officer"){
            setRole("Knowledge Sharing and Communiction Officer");
        }
        if(selectedRole === "project_manager"){
            setRole("Project/Program Manager");
        }
    },[]);

	const getInk = (el) => {
        for (let i = 0; i < el.children.length; i++) {
            if (typeof el.children[i].className === 'string' && el.children[i].className.indexOf('p-ink') !== -1) {
                return el.children[i];
            }
        }
        return null;
	}

	const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

	const onItemClick = (event) => {
		const ink = getInk(event.currentTarget);
		if (ink) {
			removeClass(ink, 'p-ink-active');
		}
	}

	const onClickLogout = () => {
	    localStorage.removeItem("accessToken");
        setLoggedIn('logged out')
        setUserData({})
        navigate("/");
    }

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

	const loginMenu = () =>{

	    return(
            <div className="layout-topbar-grid-column layout-topbar-grid-column-fixed">
                <button type="button" className="p-link profile-menu-button" onClick={props.onTopbarUserMenuButtonClick}>
                    <img src="assets/layout/images/avatar.png" alt="Profile" />
                </button>
                <ul className={topbarMenuClassName} onClick={props.onTopbarUserMenuClick}>
                    <li className="layout-profile-menu-search">
							<span className="p-float-label">
								<InputText type="text" />
								<label>Search</label>
							</span>
                    </li>
                    <li role="menuitem">
                        <div className="user-info-topbar">
                            <span>Anna Miller</span>
                            <Ripple />
                        </div>
                    </li>
                    <li role="menuitem">
                        <div className="user-info-topbar">
                            <span className="role-topbar">{role}</span>
                            <Ripple />
                        </div>
                    </li>
                    <li role="menuitem">
                        <a onClick={() => navigate(profileUrl)}>
                            <button type="button" className="p-link p-ripple">
                                <i className="pi pi-user icon-menu-topbar"></i>
                                <span>Profile</span>
                                <Ripple />
                            </button>
                        </a>
                    </li>
                    <li role="menuitem">
                        <a onClick={() => navigate(myInnovationsUrl)}>
                            <button type="button" className="p-link p-ripple" >
                                <i className="pi pi-list icon-menu-topbar"></i>
                                <span>My Innovations</span>
                                <Ripple />
                            </button>
                        </a>

                    </li>
                    <li role="menuitem">
                        <a onClick={() => navigate(addInnovationUrl)}>
                            <button type="button" className="p-link p-ripple" onClick={onItemClick}>
                                <i className="pi pi-plus icon-menu-topbar"></i>
                                <span>Add Innovation</span>
                                <Ripple />
                            </button>
                        </a>
                    </li>
                    <li role="menuitem">
                        <button type="button" className="p-link p-ripple" onClick={onClickLogout}>
                            <i className="pi pi-sign-out icon-menu-topbar"></i>
                            <span>Logout</span>
                            <Ripple />
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    const loginCheck = () => {

        // let tokenStorage = localStorage.getItem("token");

        if(loggedIn === 'logged in'){
           return loginMenu();
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
