import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Header from '../Header/Header'
import Feed from '../Feed/Feed'


class App extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Header />
						<Route path="/" component={Feed} exact></Route>
					</div>
				</Router>
			</div>
		);
	}

}
export default App;
