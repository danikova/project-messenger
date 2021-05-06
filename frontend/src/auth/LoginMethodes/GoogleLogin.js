import React from 'react';
import styled from 'styled-components';
import { loginWithCredentials } from '../../redux/actions/user.action';
import { GoogleLogin as ReactGoogleLogin } from 'react-google-login';
import { withSnackbar } from 'notistack';

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
                this.props.enqueueSnackbar(`Successful login`);
                this.props.onLoginSuccess();
            },
            (error) => {
                this.props.enqueueSnackbar(
                    `${
                        error.response.data.error ||
                        error.response.data.message ||
                        JSON.stringify(error.response.data.error)
                    }\nPlease try other login methode.`,
                );
            },
        );
    };

    onGoogleLoginFailure = (res) => {
        this.props.enqueueSnackbar(
            `Something happend. Please try other login methode.`,
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
                    />
                </GoogleLoginBtnWrapper>
            </GoogleLoginBtnContainer>
        );
    }
}

export default withSnackbar(GoogleLogin);
