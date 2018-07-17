import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Registration from './Registration';
import Projects from './Projects';
import Tasks from './Tasks';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route exact path="/registration" render={props => <Registration {...props} />} />
            <Route exact path="/projects" render={props => <Projects {...props} />} />
            <Route exact path="/tasks" render={props => <Tasks {...props} />} />
        </Switch>
    </BrowserRouter>
);
