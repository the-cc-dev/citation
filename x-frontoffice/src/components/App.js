import React, {Component} from 'react';
import XRouter from './XRouter';

import logo from './logo.svg';
import './App.css';

import Default from './Default';
import NotDefault from './NotDefault';

const components = {Default, NotDefault};

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h2>Welcome to React</h2>
				</div>
				<div className="App-intro">
					<XRouter serverUrl="http://localhost:4000/graphql" components={components}/>
				</div>
			</div>
		);
	}
}

export default App;