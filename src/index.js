import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import routes from "./routes";

const history = createBrowserHistory({forceRefresh: true});

ReactDOM.render(
	<Router history={history}>
		<Switch>
			{routes.map((route, idx) => (
				<Route
					key={idx}
					path={route.path}
					exact={route.exact}								/* Sistema de rotas do react */
					component={(props => (
						<route.layout {...props}>
							<route.component {...props}/>
						</route.layout>
					))}
				/>
			))}			
			<Route component={() => (
				<div>Error</div>
      )}/>
		</Switch>
	</Router>,
  	document.getElementById('root')
);