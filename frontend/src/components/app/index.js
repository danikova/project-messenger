import React from 'react';
import styled from 'styled-components';
import page404 from '../../assets/404.png';
import AppBar from './AppBar';
import SocketWrapper from './SocketWrapper';
import { Switch, Route, Redirect } from 'react-router-dom';
import Chatrooms from './Chatrooms';
import Profile from './Profile';
import { AppContainer } from '../shared/styled-components';

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

export default class AppView extends React.Component {
    render() {
        return (
            <MainViewWrapper>
                <SocketWrapper>
                    <AppBar />
                    <AppContainer>
                        <Switch>
                            <Route path='/profile' component={Profile} />
                            <Route path='/chatrooms'>
                                <Chatrooms />
                            </Route>
                            <Redirect exact from='/' to='/chatrooms' />
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
}
