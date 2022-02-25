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
import ManageInnovations from "./pages/ManageInnovations";
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
import {getCsrfToken} from './services/httpService/csrf'
import {getMelUserData} from './services/httpService/melLogin'
import {getUserData} from './services/httpService/user'

PrimeReact.ripple = true;

const App = () => {

    const dispatch = useDispatch();

    const csrfToken = useSelector((state) => state.csrfToken)
    const setCsrfToken = (payload) => dispatch({ type: Actions.SetCsrfToken, payload });

    const accessToken = useSelector((state) => state.accessToken)
    const setAccessToken = (payload) => dispatch({ type: Actions.SetAccessToken, payload });

    const userData = useSelector((state) => state.userData)
    const setUserData = (payload) => dispatch({ type: Actions.SetUserData, payload });

    const melUserData = useSelector((state) => state.melUserData)
    const setMelUserData = (payload) => dispatch({ type: Actions.SetMelUserData, payload });

    const setLoggedIn = (payload) => dispatch({ type: Actions.SetLoggedIn, payload });

    const [menuActive, setMenuActive] = useState(false);

    useEffect(() => {
        getCsrfToken()
            .then(res => {
                setCsrfToken(res)
            })
        const token = localStorage.getItem("accessToken");
        if (token) {
            setAccessToken(token)
            setLoggedIn('logged in')
        }
        const data = localStorage.getItem("melUserData");
        if (data) {
            setMelUserData(JSON.parse(data))
        }
    }, [])

    useEffect(
        () => {
            if (csrfToken !== '') {
                if (accessToken) {
                    getMelUserData(csrfToken, accessToken)
                        .then(async res => {
                            const temp = await res.text()
                            if (temp === 'Access Token has expired') {
                                localStorage.removeItem("accessToken");
                                localStorage.removeItem("melUserData");
                                setLoggedIn('logged out')
                                setMelUserData({})
                                setAccessToken('')
                            } else {
                                setMelUserData(JSON.parse(temp))
                                localStorage.setItem("melUserData",temp);
                            }
                        })
                        .catch(err => console.log(err))
                }
            }
        }, [accessToken]
    )

    useEffect(
        () => {
            if (melUserData.profile_id) {
                if (csrfToken !== '') {
                    getUserData(csrfToken,melUserData.profile_id)
                        .then(async res => {
                            setUserData(await res.json())
                        })
                        .catch(err => console.log(err))
                }
            }
        },[melUserData,csrfToken]
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
                        <Route path={'/innovations'} element={<ManageInnovations/>} />
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
