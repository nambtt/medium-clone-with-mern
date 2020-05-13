import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Cookies from 'js-cookie';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import Feed from '../../pages/Feed/Feed'

import { loadMe, logInUserWithOauth, attachTokenToHeader } from '../../redux/actions/authActions'


const App = ({ logInUserWithOauth, auth, loadMe }) => {

	useEffect(() => {
		//if (window.location.hash === '#_=_') window.location.hash = '';

		const cookieJwt = Cookies.get('x-auth-cookie');
		if (cookieJwt) {
			Cookies.remove('x-auth-cookie');
			logInUserWithOauth(cookieJwt);
		}
	}, [logInUserWithOauth]);

	useEffect(() => {
		if (!auth.isAuthenticated && auth.token) {
			// load token from localStorage and request user data from server
			loadMe();
		}
	}, [auth.isAuthenticated, auth.token, loadMe])

	return (
		<div>
			<Router>
				<div>
					<Route path="/" component={Feed} exact></Route>
				</div>
			</Router>
		</div>
	);

}
const mapStateToProps = (state) => {
	return { auth: state.auth };
}
export default connect(mapStateToProps, { logInUserWithOauth, loadMe })(App);
