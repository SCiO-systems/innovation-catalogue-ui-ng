import React, {useEffect, useState} from 'react'
import Footer from './components/Footer'
import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import ChooseRole from './pages/ChooseRole'
import Comingsoon from './pages/ComingSoon'
import Analytics from './pages/Analytics'
import Search from './pages/Search'
import Innovation from "./pages/Innovation/Innovation";
import DetailedInnovation from './pages/Innovation/DetailedInnovation'
import ProfilePage from './pages/ProfilePage'
import Descriptors from './pages/Descriptors'
import AddInnovation from './pages/AddInnovation'
import MyInnovations from "./pages/MyInnovations";
import Login from './pages/Login/Login'
import LoginRedirected from './pages/Login/LoginRedirected'
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import classNames from 'classnames';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import PrimeReact from 'primereact/api';
import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "./reducer/actions";
import CsrfService from "./services/axios-test/csrf";
import {getUserData} from './services/AuthorizationService'

PrimeReact.ripple = true;

const App = () => {

    const dispatch = useDispatch();

    const csrfToken = useSelector((state) => state.csrfToken)
    const setCsrfToken = (payload) => dispatch({ type: Actions.SetCsrfToken, payload });

    const accessToken = useSelector((state) => state.accessToken)
    const setAccessToken = (payload) => dispatch({ type: Actions.SetAccessToken, payload });

    const setUserData = (payload) => dispatch({ type: Actions.SetUserData, payload });

    const setLoggedIn = (payload) => dispatch({ type: Actions.SetLoggedIn, payload });

    const [menuActive, setMenuActive] = useState(false);

    useEffect(async () => {
        setCsrfToken(await CsrfService.getCallToForm());
        const token = localStorage.getItem("accessToken");
        if (token) {
            setAccessToken(token)
            setLoggedIn('logged in')
        }
    }, [])

    useEffect(
        () => {
            if (!localStorage.getItem("accessToken")) {
                localStorage.setItem("accessToken",accessToken);
            }
            if (csrfToken !== '') {
                if (accessToken) {
                    getUserData(csrfToken, accessToken)
                        .then(async res => {
                            const temp = await res.text()
                            if (temp === 'Access Token has expired') {
                                localStorage.removeItem("accessToken");
                                setLoggedIn('logged out')
                                setUserData({})
                            } else {
                                console.log(JSON.parse(temp))
                                setUserData(JSON.parse(temp))
                            }

                        })
                }
            }
        }, [accessToken]
    )

    const layoutContainerClassName = classNames('layout-container', {
        'layout-menu-horizontal': true,
        'layout-menu-active': menuActive,
        'layout-top-medium': true,
        'p-input-filled': false,
        'p-ripple-disabled': false,
    }, 'layout-topbar-blue', 'layout-menu-light');

    return (
        <Router>
            <div
                className={layoutContainerClassName}
            >
                <div
                    className="layout-content"
                >
                    <MenuBar setMenuActive={setMenuActive} menuActive={menuActive} />
                    <Routes>
                        <Route path={'/'} exact element={<Home/>} />
                        <Route path={'/analytics'} element={<Analytics/>} />
                        <Route path={'/search/'} element={<Search/>} />
                        <Route path={'/role'} element={<ChooseRole/>} />
                        <Route path={'/profile'} element={<ProfilePage/>} />
                        <Route path={'/innovations'} element={<MyInnovations/>} />
                        <Route path={'/descriptors'} element={<Descriptors/>} />
                        <Route path={'/add-innovation'} element={<AddInnovation/>} />
                        <Route path={'/innovation/:id'} element={<Innovation/>} />
                        <Route path={'/detailed-innovation/:id'} element={<DetailedInnovation/>} />
                        <Route path={'/comingsoon'} element={<Comingsoon/>} />
                        <Route path={'/login'} element={<Login/>} />
                        <Route path={'/login/callback/'} element={<LoginRedirected/>} />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
