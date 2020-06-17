import React from 'react';
import { Dialog } from '../shared/components';
import { Redirect } from 'react-router-dom';
import { TextField, Button, Anchor } from 'react95';
import styled from 'styled-components';
import { loginWithCredentials } from '../redux/actions/user.action';

const FullWidthTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 15px;
`;

const AnchorWrapper = styled.h1`
    margin-bottom: 10px;
    margin-top: -5px;
`;

export class SignIn extends React.Component {
    state = {
        loginSuccess: false,
        username: '',
        password: '',
    };

    render() {
        if (this.state.loginSuccess) return <Redirect to='/'></Redirect>;
        return (
            <Dialog title='signIn.exe'>
                <AnchorWrapper>
                    {"If you don't have any valid account "}
                    <Anchor href='/sign-up'>
                        -> Sign Up (click)
                    </Anchor>
                </AnchorWrapper>
                <FullWidthTextField
                    placeholder='username'
                    value={this.state.username}
                    onChange={(e) =>
                        this.setState({ username: e.target.value })
                    }
                />
                <FullWidthTextField
                    placeholder='password'
                    value={this.state.password}
                    onChange={(e) =>
                        this.setState({ password: e.target.value })
                    }
                    type='password'
                />
                <Button
                    fullWidth
                    onClick={() => {
                        loginWithCredentials(
                            this.state.username,
                            this.state.password,
                            () => {
                                this.setState({ loginSuccess: true });
                            },
                        );
                    }}
                    style={{ marginLeft: '2px' }}
                    disabled={!this.state.username || !this.state.password}
                >
                    Sign In
                </Button>
            </Dialog>
        );
    }
}
