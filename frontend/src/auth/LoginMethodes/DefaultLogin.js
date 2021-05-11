import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from 'react95';
import { loginWithCredentials } from '../../redux/actions/user.action';
import { withSnackbar } from 'notistack';
import { FormattedMessage, injectIntl } from 'react-intl';

const FullWidthTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 15px;
`;

export class DefaultLogin extends React.Component {
    state = {
        username: '',
        password: '',
    };

    onBtnClick = () => {
        loginWithCredentials(
            {
                username: this.state.username,
                password: this.state.password,
            },
            '/auth/login',
            () => {
                this.props.enqueueSnackbar(`Successful login`);
                this.props.onLoginSuccess();
            },
            () => {
                this.props.enqueueSnackbar(
                    `Username or password is invalid. Please register if you dont have a valid account.`,
                );
            },
        );
    };

    render() {
        return (
            <div>
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
                    onClick={this.onBtnClick}
                    style={{ marginLeft: '2px' }}
                    disabled={!this.state.username || !this.state.password}
                >
                    <FormattedMessage id='auth.login.btnText' />
                </Button>
            </div>
        );
    }
}

export default injectIntl(withSnackbar(DefaultLogin));
