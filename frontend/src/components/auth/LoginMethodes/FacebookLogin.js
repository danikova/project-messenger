import React from 'react';
import styled from 'styled-components';
import { loginUser } from '../../../store/actions/user.action';
import ReactFacebookLogin from 'react-facebook-login';
import { withSnackbar } from 'notistack';
import { injectIntl } from 'react-intl';
import { API_FACEBOOK_LOGIN_URL } from '../../../routes';

const GoogleLoginBtnContainer = styled.div`
    width: 100%;
    padding-top: 16px;
`;
const GoogleLoginBtnWrapper = styled.div`
    margin: 0 auto;
    display: table;
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
                    id: 'auth.login.snackbar.googleFailure',
                }),
            );
    };

    render() {
        return (
            <GoogleLoginBtnContainer>
                <GoogleLoginBtnWrapper>
                    <ReactFacebookLogin
                        appId='176623211025291'
                        autoLoad={true}
                        // fields='name,email,picture'
                        callback={this.onFacebookResponse}
                    />
                </GoogleLoginBtnWrapper>
            </GoogleLoginBtnContainer>
        );
    }
}

export default injectIntl(withSnackbar(FacebookLogin));
