import React, {useState} from 'react'
import {AppTopBar} from './components'

const MenuBar = (props) => {

    const {menuActive, setMenuActive} = props

    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const [menuHoverActive, setMenuHoverActive] = useState(false);

    let menuClick;
    let userMenuClick;

    const menu = [
        {label: "Home", to: "/"},
        {label: "About", to:"/about"},
        {label: "Search", to: "/search"},
        {label: "Analytics", to: "/analytics"},
        {label: "Contact us",to:"/comingsoon"}
    ];

    const isMobile = () => {
        return window.innerWidth <= 1024;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;

        if (isMobile()) {
            setMenuActive(prevMenuActive => !prevMenuActive);
        }

        event.preventDefault();
    };

    const onTopbarUserMenuButtonClick = (event) => {
        userMenuClick = true;
        setTopbarUserMenuActive(prevTopbarUserMenuActive => !prevTopbarUserMenuActive);

        event.preventDefault();
    };

    const onTopbarUserMenuClick = (event) => {
        userMenuClick = true;

        if (event.target.nodeName === 'BUTTON' || event.target.parentNode.nodeName === 'BUTTON') {
            setTopbarUserMenuActive(false)
        }
        event.preventDefault();
    };
    const onSidebarClick = () => {
        menuClick = true;
    };

    const onRootMenuItemClick = (event) => {
        menuClick = true;
        if (isMobile()) {
            setMenuHoverActive(event.isSameIndex ? false : true);
        }
        else {
            setMenuHoverActive(prevMenuHoverActive => !prevMenuHoverActive);
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    const onMenuItemClick = (event) => {
        if (event.item && !event.item.items) {
            if (isMobile()) {
                setMenuActive(false);
                unblockBodyScroll();
            }

            setMenuHoverActive(false);
        }
    };

    return (
        <div className="layout-top">
            <AppTopBar topbarUserMenuActive={topbarUserMenuActive} menuActive={menuActive} menuHoverActive={menuHoverActive}
                       onMenuButtonClick={onMenuButtonClick} onTopbarUserMenuButtonClick={onTopbarUserMenuButtonClick}
                       onTopbarUserMenuClick={onTopbarUserMenuClick} model={menu} horizontal={true} onSidebarClick={onSidebarClick}
                       onRootMenuItemClick={onRootMenuItemClick} onMenuItemClick={onMenuItemClick} isMobile={isMobile} />

            <div className="layout-topbar-separator" />
        </div>
    )
}

export default MenuBar
