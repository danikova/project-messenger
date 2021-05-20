import React from 'react';
import { loginUser } from '../../../store/actions/user.action';
import { GoogleLogin as ReactGoogleLogin } from 'react-google-login';
import { injectIntl } from 'react-intl';
import { API_GOOGLE_LOGIN_URL } from '../../../routes';
import { enqueueSnackbar } from '../../../store/actions/notifications.action';

export class GoogleLogin extends React.Component {
    onGoogleLoginSuccess = (res) => {
        loginUser(
            { idToken: res.tokenId },
            API_GOOGLE_LOGIN_URL,
            () => {
                enqueueSnackbar(
                    this.props.intl.formatMessage({
                        id: 'auth.login.snackbar.successful',
                    }),
                );
                this.props.onLoginSuccess();
            },
            () => {
                this.onGoogleLoginFailure();
            },
        );
    };

    onGoogleLoginFailure = (res) => {
        enqueueSnackbar(
            this.props.intl.formatMessage({
                id: 'auth.login.snackbar.oAuthFailure',
            }),
        );
    };

    render() {
        return (
            <ReactGoogleLogin
                clientId='890308939368-2o9ige6ektotc4csofkt5liusl22rdep.apps.googleusercontent.com'
                onSuccess={this.onGoogleLoginSuccess}
                onFailure={this.onGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
                buttonText={this.props.intl.formatMessage({
                    id: 'auth.login.googleBtnText',
                })}
            />
        );
    }
}

export default injectIntl(GoogleLogin);
