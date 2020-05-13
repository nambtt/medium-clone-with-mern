import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import Feed from '../../pages/Feed/Feed'

import { loadMe } from '../../redux/actions/authActions'


const App = ({ auth, loadMe }) => {

	useEffect(() => {
		if (!auth.isAuthenticated && auth.token) {
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
export default connect(mapStateToProps, { loadMe })(App);
