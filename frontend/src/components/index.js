import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import AppView from './app';
import { connect, useSelector } from 'react-redux';

import styled, { ThemeProvider } from 'styled-components';
import { SnackbarProvider } from 'notistack';
import { CustomSnackbar } from './shared/CustomSnackbar';
import { history } from '../shared/history.service';
import { AuthView } from './auth';

import original from 'react95/dist/themes/original';
import rose from 'react95/dist/themes/rose';
import olive from 'react95/dist/themes/olive';
import tokyoDark from 'react95/dist/themes/tokyoDark';
import { GlobalStyle } from './shared/GlobalStyle';

const themes = {
    original,
    rose,
    olive,
    tokyoDark,
};

const GlobalWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

function AppRouter(props) {
    const {
        theme,
        vintageFont,
        fontSize,
        scanLines,
        scanLinesIntensity,
        backgroundColor,
    } = useSelector((state) => state.settings);
    return (
        <GlobalWrapper>
            <GlobalStyle
                vintageFont={vintageFont}
                fontSize={fontSize}
                scanLines={scanLines}
                scanLinesIntensity={scanLinesIntensity}
                backgroundColor={backgroundColor}
            />
            <ThemeProvider theme={themes[theme || 'original']}>
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
                            <Route path='/authentication'>
                                <AuthView />
                            </Route>
                            <Route
                                render={(routeProps) =>
                                    props.user.token ? (
                                        <AppView {...routeProps} />
                                    ) : (
                                        <Redirect to='/authentication' />
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
