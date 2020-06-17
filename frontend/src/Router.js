import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import MainView from './main';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';
import { connect } from 'react-redux';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes } from 'react95';

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function AppRouter(props) {
    return (
        <div>
            <ResetStyles />
            <ThemeProvider theme={themes.default}>
                <Router>
                    <Switch>
                        <Route path='/sign-in'>
                            <SignIn />
                        </Route>
                        <Route path='/sign-up'>
                            <SignUp />
                        </Route>
                        <Route
                            path='/'
                            render={(routeProps) =>
                                props.user.token ? (
                                    <MainView {...routeProps} />
                                ) : (
                                    <Redirect to='/sign-in' />
                                )
                            }
                        />
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        user,
    };
};

export default connect(mapStateToProps)(AppRouter);
