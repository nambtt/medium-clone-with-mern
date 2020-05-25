import Cookies from 'js-cookie';
import React, { useEffect, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { loadMe, logInUserWithOauth } from '../../redux/actions/authActions';
import './App.css';

const Comments = lazy(() => import(/* webpackChunkName: "Comments" */'../../pages/Comments/Comments'));
const Feed = lazy(() => import(/* webpackChunkName: "Feed" */'../../pages/Feed/Feed'));
const NewStory = lazy(() => import(/* webpackChunkName: "NewStory" */'../../pages/NewStory/NewStory'));
const ViewStory = lazy(() => import(/* webpackChunkName: "ViewStory" */'../../pages/ViewStory/ViewStory'));
const EditStory = lazy(() => import(/* webpackChunkName: "EditStory" */'../../pages/EditStory/EditStory'));
const MyStories = lazy(() => import(/* webpackChunkName: "MyStories" */'../../pages/MyStories/MyStories'));

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
				<Suspense fallback={<div>Loading...</div>}>
					<div>
						<Route path="/" component={Feed} exact></Route>
						<Route path="/my-stories/" component={MyStories} exact></Route>
						<Route path="/new-story" component={NewStory} exact></Route>
						<Route path="/view-story/:_id" component={ViewStory} exact></Route>
						<Route path="/edit-story/:_id" component={EditStory} exact></Route>
						<Route path="/view-story/:_id/comments" component={Comments} exact></Route>
					</div>
				</Suspense>
			</Router>
		</div>
	);

}
const mapStateToProps = (state) => {
	return { auth: state.auth };
}
export default connect(mapStateToProps, { logInUserWithOauth, loadMe })(App);

