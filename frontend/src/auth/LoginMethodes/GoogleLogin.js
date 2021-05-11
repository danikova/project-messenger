import React from 'react';
import styled from 'styled-components';
import { loginWithCredentials } from '../../redux/actions/user.action';
import { GoogleLogin as ReactGoogleLogin } from 'react-google-login';
import { withSnackbar } from 'notistack';
import { injectIntl } from 'react-intl';

const GoogleLoginBtnContainer = styled.div`
    width: 100%;
    padding-top: 16px;
`;
const GoogleLoginBtnWrapper = styled.div`
    margin: 0 auto;
    display: table;
`;

export class GoogleLogin extends React.Component {
    onGoogleLoginSuccess = (res) => {
        loginWithCredentials(
            { idToken: res.tokenId },
            '/auth/google-login',
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
    };

    onGoogleLoginFailure = (res) => {
        this.props.enqueueSnackbar(
            this.props.intl.formatMessage({
                id: 'auth.login.snackbar.googleFailure',
            }),
        );
    };

    render() {
        return (
            <GoogleLoginBtnContainer>
                <GoogleLoginBtnWrapper>
                    <ReactGoogleLogin
                        clientId='890308939368-2o9ige6ektotc4csofkt5liusl22rdep.apps.googleusercontent.com'
                        onSuccess={this.onGoogleLoginSuccess}
                        onFailure={this.onGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        buttonText={this.props.intl.formatMessage({
                            id: 'auth.login.googleBtnText',
                        })}
                    />
                </GoogleLoginBtnWrapper>
            </GoogleLoginBtnContainer>
        );
    }
}

export default injectIntl(withSnackbar(GoogleLogin));
