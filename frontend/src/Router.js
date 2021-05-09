import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    Router,
} from 'react-router-dom';
import MainView from './main';
import Login from './auth/Login';
import Register from './auth/Register';
import { connect } from 'react-redux';

import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes } from 'react95';
import { SnackbarProvider } from 'notistack';
import { CustomSnackbar } from './shared/components';
import { createBrowserHistory } from 'history';

const ResetStyles = createGlobalStyle`
  ${reset}
`;

const GlobalWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

export const history = createBrowserHistory();

function AppRouter(props) {
    return (
        <GlobalWrapper>
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
                    <Router history={history}>
                        <Switch>
                            <Route path='/login'>
                                <Login />
                            </Route>
                            <Route path='/register'>
                                <Register />
                            </Route>
                            <Route
                                path='/'
                                render={(routeProps) =>
                                    props.user.token ? (
                                        <MainView {...routeProps} />
                                    ) : (
                                        <Redirect to='/login' />
                                    )
                                }
                            />
                        </Switch>
                    </Router>
                </SnackbarProvider>
            </ThemeProvider>
        </GlobalWrapper>
    );
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        user,
    };
};

export default connect(mapStateToProps)(AppRouter);
