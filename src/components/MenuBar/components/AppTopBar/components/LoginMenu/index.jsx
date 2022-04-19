import React, {useEffect, useState} from 'react'
import {Ripple} from "primereact/ripple";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../../../../reducer/actions";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

const LoginMenu = (props) => {

    const {topbarUserMenuActive, onTopbarUserMenuButtonClick, onTopbarUserMenuClick} = props

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const melUserData = useSelector((state) => state.melUserData)

    const userData = useSelector((state) => state.userData)

    const setInnovationManagement = (payload) => dispatch({ type: Actions.SetInnovationManagement, payload });

    const setEditingInnovation = (payload) => dispatch({ type: Actions.SetEditingInnovation, payload });

    const setLoggedIn = (payload) => dispatch({ type: Actions.SetLoggedIn, payload });

    const setUserData = (payload) => dispatch({ type: Actions.SetUserData, payload });

    const setViewing = (payload) => dispatch({ type: Actions.SetViewing, payload });

    const [role, setRole] = useState(null);

    let topbarMenuClassName = classNames('layout-profile-menu fadeInDown ', { 'layout-profile-menu-active': topbarUserMenuActive });

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

    const onClickLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem('melUserData')
        setLoggedIn('logged out')
        setUserData({})
        navigate("/");
    }

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

    const renderMyInnovations = () => {
        if (userData.user) {
            return (
                <li role="menuitem">
                    <a onClick={() => {
                        setInnovationManagement('my innovations')
                        navigate('/innovations/')
                    }}>
                        <button type="button" className="p-link p-ripple" >
                            <i className="pi pi-list icon-menu-topbar"></i>
                            <span>My Innovations</span>
                            <Ripple />
                        </button>
                    </a>
                </li>
            )
        } else {
            return null
        }

    }
    
    const renderReviwerManagement = () => {
        
        if (userData.user?.permissions.find(item => item === 'Reviewer')) {
            return (
                <li role="menuitem">
                    <a onClick={() => {
                        setInnovationManagement('my assignments')
                        navigate('/innovations/')
                    }}>
                        <button type="button" className="p-link p-ripple" >
                            <i className="pi pi-list icon-menu-topbar"></i>
                            <span>My Assignments</span>
                            <Ripple />
                        </button>
                    </a>
                </li>
            )
        } else {
            return null
        }
    }
    
    const renderAdministratorManagement = () => {
        
        if (userData.user?.permissions.find(item => item === 'Administrator')) {
            return (
                <>
                    <li role="menuitem">
                        <a onClick={() => {
                            setInnovationManagement('manage innovations')
                            navigate('/innovations/')
                        }}>
                            <button type="button" className="p-link p-ripple" >
                                <i className="pi pi-list icon-menu-topbar"></i>
                                <span>Manage Innovations</span>
                                <Ripple />
                            </button>
                        </a>
                    </li>
                    <li role="menuitem">
                        <a onClick={() => {
                            setInnovationManagement('manage users')
                            navigate('/innovations/')
                        }}>
                            <button type="button" className="p-link p-ripple" >
                                <i className="pi pi-list icon-menu-topbar"></i>
                                <span>Manage Users</span>
                                <Ripple />
                            </button>
                        </a>
                    </li>
                </>
            )
        } else {
            return null
        }
    }

    const renderScalingReadinessExpertManagement = () => {
        if (userData.user?.permissions.find(item => item === "Scaling Readiness Expert")) {
            return (
                <li role="menuitem">
                    <a onClick={() => {
                        setInnovationManagement('my sr assignments')
                        navigate('/innovations/')
                    }}>
                        <button type="button" className="p-link p-ripple" >
                            <i className="pi pi-list icon-menu-topbar"></i>
                            <span>My SR Assignments</span>
                            <Ripple />
                        </button>
                    </a>
                </li>
            )
        } else {
            return null
        }
    }

    return(
        <div className="layout-topbar-grid-column layout-topbar-grid-column-fixed">
            <button type="button" className="p-link profile-menu-button" onClick={onTopbarUserMenuButtonClick}>
                <img src={`https://mel.cgiar.org/graph/getcimage/width/500/height/500/image/-user-${melUserData.photo}`} alt="Profile" />
            </button>
            <ul className={topbarMenuClassName} onClick={onTopbarUserMenuClick}>
                <li role="menuitem">
                    <div className="user-info-topbar">
                        <span>{melUserData.first_name + ' ' + melUserData.last_name}</span>
                    </div>
                </li>
                <li role="menuitem">
                    <div className="user-info-topbar">
                        <span className="role-topbar">{role}</span>
                    </div>
                </li>
                <li role="menuitem">
                    <a onClick={() => navigate('/profile/')}>
                        <button type="button" className="p-link p-ripple">
                            <i className="pi pi-user icon-menu-topbar"></i>
                            <span>Profile</span>
                            <Ripple />
                        </button>
                    </a>
                </li>
                {renderMyInnovations()}
                {renderReviwerManagement()}
                {renderScalingReadinessExpertManagement()}
                {renderAdministratorManagement()}
                <li role="menuitem">
                    <a onClick={() => {
                        setEditingInnovation('')
                        setViewing(false)
                        navigate('/add-innovation/')
                    }}>
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

export default LoginMenu
