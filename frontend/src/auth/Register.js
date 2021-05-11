import React from 'react';
import { Dialog } from '../shared/components';
import { Redirect } from 'react-router-dom';
import { TextField, Button, Anchor } from 'react95';
import styled from 'styled-components';
import Axios from 'axios';
import { withSnackbar } from 'notistack';
import { FormattedMessage, injectIntl } from 'react-intl';

const FullWidthTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 15px;
`;

const AnchorWrapper = styled.h1`
    margin-bottom: 10px;
    margin-top: -5px;
`;

export class Register extends React.Component {
    state = {
        registerSuccess: false,
        username: '',
        password: '',
    };

    render() {
        if (this.state.registerSuccess)
            return <Redirect to='/login'></Redirect>;
        return (
            <Dialog title='register.exe' closeDisabled>
                <AnchorWrapper>
                    <FormattedMessage id='auth.register.goToLoginText' />
                    <Anchor href='/login'>
                        <FormattedMessage id='auth.register.loginLink' />
                    </Anchor>
                </AnchorWrapper>
                <FullWidthTextField
                    placeholder={this.props.intl.formatMessage({
                        id: 'auth.username',
                    })}
                    value={this.state.username}
                    onChange={(e) =>
                        this.setState({ username: e.target.value })
                    }
                />
                <FullWidthTextField
                    placeholder={this.props.intl.formatMessage({
                        id: 'auth.password',
                    })}
                    value={this.state.password}
                    onChange={(e) =>
                        this.setState({ password: e.target.value })
                    }
                    type='password'
                />
                <Button
                    fullWidth
                    onClick={() => {
                        const request = Axios({
                            method: 'post',
                            url: '/auth/register',
                            data: {
                                username: this.state.username,
                                password: this.state.password,
                            },
                        });
                        request.then(
                            () => {
                                this.setState({ registerSuccess: true });
                                this.props.enqueueSnackbar(
                                    this.props.intl.formatMessage({
                                        id: 'auth.register.snackbar.successful',
                                    }),
                                );
                            },
                            (error) => {
                                this.props.enqueueSnackbar(
                                    error.response.data.error ||
                                        error.response.data.message ||
                                        JSON.stringify(
                                            error.response.data.error,
                                        ),
                                );
                            },
                        );
                    }}
                    style={{ marginLeft: '2px' }}
                    disabled={!this.state.username || !this.state.password}
                >
                    <FormattedMessage id='auth.register.btnText' />
                </Button>
            </Dialog>
        );
    }
}

export default injectIntl(withSnackbar(Register));
