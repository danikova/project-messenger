import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

export function AuthView() {
    return (
        <Switch>
            <Route exact path='/authentication'>
                <Login />
            </Route>
            <Route path='/authentication/register'>
                <Register />
            </Route>
            <Redirect to='/authentication' />
        </Switch>
    );
}
