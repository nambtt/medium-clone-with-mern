import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Header from '../Header/Header'
import Feed from '../../pages/Feed/Feed'
import Login from '../../pages/Login/Login'


class App extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Route path="/" component={Feed} exact></Route>
						<Route path="/login" component={Login} exact></Route>
					</div>
				</Router>
			</div>
		);
	}

}
export default App;
