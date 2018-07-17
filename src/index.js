import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

import { Navbar }  from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import Routes from './routes';
import './main.css';

const client = new ApolloClient({
	link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
	cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

const App = () => (
	<ApolloProvider client={client}>
		<Navbar className="nav">
			<a href="/">Home</a>
			<a href="registration">Registration</a>
			<a href="login">Login</a>
			<a href="projects">Projects</a>
			<a href="tasks">Tasks</a>
    </Navbar>
    <Routes />
	</ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
