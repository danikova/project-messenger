import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import MainView from './main';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import { connect } from 'react-redux';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes } from 'react95';
import { SnackbarProvider } from 'notistack';
import { CustomSnackbar } from './shared/components';

const ResetStyles = createGlobalStyle`
  ${reset}
`;

function AppRouter(props) {
    return (
        <div>
            <ResetStyles />
            <ThemeProvider theme={themes.default}>
                <SnackbarProvider
                    maxSnack={5}
                    preventDuplicate
                    content={(key, message) => {
                        return (
                            <div key={key}>
                                <CustomSnackbar
                                    key={key}
                                    id={key}
                                    message={message}
                                />
                            </div>
                        );
                    }}
                >
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
                </SnackbarProvider>
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
