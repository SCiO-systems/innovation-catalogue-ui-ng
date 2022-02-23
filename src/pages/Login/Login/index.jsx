import React, {useEffect} from 'react';
import { Button } from 'primereact/button';
import {Link, useNavigate} from 'react-router-dom';
import mel from '../../../assets/logo-mel.png';
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../../reducer/actions";

const Login = () => {

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const userData = useSelector((state) => state.userData)
	const setUserData = (payload) => dispatch({ type: Actions.SetUserData, payload });

	// useEffect(
	// 	() => {
	// 		if (user.name !== '') {
	// 			navigate('/profile')
	// 		}
	// 	},[]
	// )

	console.log(process.env.REACT_APP_CLIENT_ID)

	return (
		<div className="login-body">
			<div className="login-panel ui-fluid">
				<div>
					<div className="p-grid p-grid p-justify-center">
						<div className="p-col-12 logo-login-background">
                            <Link to="/">
                                <h1 className="logo-styling ">Innovation Catalog</h1>
                            </Link>
						</div>
					</div>
				</div>
                <div className="p-grid p-align-center">
                    <div className="p-col-12 heading-login">
						<a
							className="p-button login-button-mel"
							href={`https://mel.cgiar.org/user/login/client_id/${process.env.REACT_APP_CLIENT_ID}`}
							style={{  background: "#f9b403" }}
						>
							<img src={mel} width={30} />
							<span className="login-span">
								Login with MEL
							</span>
						</a>
					</div>
                </div>
			</div>
		</div>
	)
}

export default Login
