import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../reducer/actions";
import {useNavigate} from "react-router-dom";
import MelService from '../../../services/httpService/melLogin'

const LoginRedirected = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const setAccessToken = (payload) => dispatch({ type: Actions.SetAccessToken, payload });

    const setLoggedIn = (payload) => dispatch({ type: Actions.SetLoggedIn, payload });

    useEffect(
        () => {
                const code = window.location.hash.split('&')[1].slice(5)
                MelService.getAccessToken(code)
                    .then(res => {
                        setAccessToken(res)
                        localStorage.setItem("accessToken",res);
                    })
                    .catch(err => console.log(err))
                // setLoggedIn('logged in')
                navigate('/')

        }, []
    )

    return null
}

export default LoginRedirected
