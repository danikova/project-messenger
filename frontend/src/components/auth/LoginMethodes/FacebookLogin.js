import React from 'react';
import styled from 'styled-components';
import { loginUser } from '../../../store/actions/user.action';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { withSnackbar } from 'notistack';
import { FormattedMessage, injectIntl } from 'react-intl';
import { API_FACEBOOK_LOGIN_URL } from '../../../routes';

const FacebookButton = styled.button`
    background: #4267b2;
    border: none;
    height: 43px;
    color: white;
    padding: 0 20px;
    cursor: pointer;
`;

export class FacebookLogin extends React.Component {
    onFacebookResponse = (res) => {
        if (res.accessToken)
            loginUser(
                { accessToken: res.accessToken },
                API_FACEBOOK_LOGIN_URL,
                () => {
                    this.props.enqueueSnackbar(
                        this.props.intl.formatMessage({
                            id: 'auth.login.snackbar.successful',
                        }),
                    );
                    this.props.onLoginSuccess();
                },
                (error) => {
                    this.onGoogleLoginFailure();
                },
            );
        else
            this.props.enqueueSnackbar(
                this.props.intl.formatMessage({
                    id: 'auth.login.snackbar.oAuthFailure',
                }),
            );
    };

    render() {
        return (
            <ReactFacebookLogin
                appId='176623211025291'
                autoLoad={false}
                callback={this.onFacebookResponse}
                render={(renderProps) => (
                    <FacebookButton onClick={renderProps.onClick}>
                        <FormattedMessage id='auth.login.facebookBtnText' />
                    </FacebookButton>
                )}
            />
        );
    }
}

export default injectIntl(withSnackbar(FacebookLogin));
