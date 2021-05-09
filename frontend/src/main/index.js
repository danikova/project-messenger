import React from 'react';
import styled from 'styled-components';
import page404 from '../assets/404.png';
import AppBar from './AppBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import ChatRooms from './ChatRooms';

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

export default class MainView extends React.Component {
    render() {
        return (
            <MainViewWrapper>
                <AppBar />
                <Switch>
                    <Route path='/profile'>
                        <div>hi</div>
                    </Route>
                    <Route path='/chatrooms'>
                        <ChatRooms />
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
            </MainViewWrapper>
        );
    }
}
