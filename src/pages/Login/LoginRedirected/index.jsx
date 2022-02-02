import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../reducer/actions";
import {useNavigate} from "react-router-dom";
import {getAccessToken} from '../../../services/AuthorizationService'

const LoginRedirected = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const csrfToken = useSelector((state) => state.csrfToken)

    const accessToken = useSelector((state) => state.accessToken)
    const setAccessToken = (payload) => dispatch({ type: Actions.SetAccessToken, payload });

    const setUserData = (payload) => dispatch({ type: Actions.SetUserData, payload });

    const setLoggedIn = (payload) => dispatch({ type: Actions.SetLoggedIn, payload });

    useEffect(
        () => {
            if (csrfToken !== '') {
                const code = window.location.hash.split('&')[1].slice(5)
                getAccessToken(csrfToken, code)
                    .then(async res => {
                        setAccessToken(await res.json())
                    })
                setLoggedIn('logged in')

                navigate('/')
            }
        }, [csrfToken]
    )

    return null
}

export default LoginRedirected
