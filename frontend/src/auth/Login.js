import React from 'react';
import { Dialog } from '../shared/components';
import { Redirect } from 'react-router-dom';
import { Anchor, Divider } from 'react95';
import styled from 'styled-components';
import DefaultLogin from './LoginMethodes/DefaultLogin';
import GoogleLogin from './LoginMethodes/GoogleLogin';

const AnchorWrapper = styled.h1`
    margin-bottom: 10px;
    margin-top: -5px;
`;

const DividerWrapper = styled(Divider)`
    margin-top: 16px;
`;

export default class Login extends React.Component {
    state = {
        loginSuccess: false,
        to: '/'
    };

    onLoginSuccess = (to='/') => {
        this.setState({ loginSuccess: true, to });
    };

    render() {
        if (this.state.loginSuccess) return <Redirect to={this.state.to}></Redirect>;
        return (
            <Dialog title='login.exe' closeDisabled>
                <AnchorWrapper>
                    {"If you don't have any valid account "}
                    <Anchor href='/register'>-> Register (click)</Anchor>
                </AnchorWrapper>
                <DefaultLogin onLoginSuccess={this.onLoginSuccess} />
                <DividerWrapper />
                <GoogleLogin onLoginSuccess={this.onLoginSuccess} />
            </Dialog>
        );
    }
}
