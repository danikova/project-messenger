import React from 'react';
import styled from 'styled-components';
import page404 from '../../assets/404.png';
import AppBar from './AppBar';
import SocketWrapper from './SocketWrapper';
import { Switch, Route, Redirect } from 'react-router-dom';
import Chatrooms from './Chatrooms';
import Settings from './Settings';
import { AppContainer } from '../shared/styled-components';
import {
    FRONTEND_CHATROOMS_FOCUSED_WITH_MATCH_URL,
    FRONTEND_CHATROOMS_URL,
    FRONTEND_SETTINGS_URL,
} from '../../routes';

const MainViewWrapper = styled.div`
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin: 0;
`;

const Page404Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 100px;
    width: 100vw;
`;

const Page404Img = styled.img`
    display: block;
    width: 400px;
    margin: auto;
`;

export default function AppView(props) {
    return (
        <MainViewWrapper>
            <SocketWrapper>
                <AppBar />
                <AppContainer>
                    <Switch>
                        <Route
                            path={FRONTEND_SETTINGS_URL}
                            component={Settings}
                        />
                        <Route
                            path={[
                                FRONTEND_CHATROOMS_FOCUSED_WITH_MATCH_URL,
                                FRONTEND_CHATROOMS_URL,
                            ]}
                            component={Chatrooms}
                        />
                        <Redirect exact from='/' to={FRONTEND_CHATROOMS_URL} />
                        <Route
                            render={(routeProps) => (
                                <Page404Wrapper>
                                    <Page404Img src={page404} />
                                </Page404Wrapper>
                            )}
                        />
                    </Switch>
                </AppContainer>
            </SocketWrapper>
        </MainViewWrapper>
    );
}
