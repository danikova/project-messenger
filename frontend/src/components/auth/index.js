import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { FRONTEND_LOGIN_URL, FRONTEND_REGISTER_URL } from '../../routes';
import Login from './Login';
import Register from './Register';

export function AuthView() {
    return (
        <Switch>
            <Route exact path={FRONTEND_LOGIN_URL}>
                <Login />
            </Route>
            <Route path={FRONTEND_REGISTER_URL}>
                <Register />
            </Route>
            <Redirect to={FRONTEND_LOGIN_URL} />
        </Switch>
    );
}
