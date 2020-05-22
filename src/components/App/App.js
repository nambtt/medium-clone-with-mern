import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Comments from '../../pages/Comments/Comments';
import Feed from '../../pages/Feed/Feed';
import NewStory from '../../pages/NewStory/NewStory';
import { ViewStory } from '../../pages/ViewStory/ViewStory';
import { loadMe, logInUserWithOauth } from '../../redux/actions/authActions';
import './App.css';





const App = ({ logInUserWithOauth, auth, loadMe }) => {

	useEffect(() => {
		if (window.location.hash === '#_=_') window.location.hash = '';

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
					<Route path="/new-story" component={NewStory} exact></Route>
					<Route path="/view-story/:_id" component={ViewStory} exact></Route>
					<Route path="/view-story/:_id/comments" component={Comments} exact></Route>
				</div>
			</Router>
		</div>
	);

}
const mapStateToProps = (state) => {
	return { auth: state.auth };
}
export default connect(mapStateToProps, { logInUserWithOauth, loadMe })(App);
