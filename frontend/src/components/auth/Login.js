import React from 'react';
import { FixedLocaleSelectorWrapper } from '../shared/styled-components';
import { Dialog } from '../shared/Dialog';
import { LocaleSelector } from '../shared/LocaleSelector';
import { Redirect } from 'react-router-dom';
import { Anchor, Divider } from 'react95';
import styled from 'styled-components';
import DefaultLogin from './LoginMethodes/DefaultLogin';
import GoogleLogin from './LoginMethodes/GoogleLogin';
import FacebookLogin from './LoginMethodes/FacebookLogin';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { FRONTEND_REGISTER_URL } from '../../routes';

const AnchorWrapper = styled.h1`
    margin-bottom: 10px;
    margin-top: -5px;
`;

const DividerWrapper = styled(Divider)`
    margin-top: 16px;
`;

const OAuthBtnContainer = styled.div`
    width: 100%;
`;
const OAuthLoginBtnWrapper = styled.div`
    margin: 0 auto;
    display: table;
    padding-top: 16px;
`;

export class Login extends React.Component {
    state = {
        loginSuccess: false,
        to: '/',
    };

    onLoginSuccess = (to = '/') => {
        this.setState({ loginSuccess: true, to });
    };

    render() {
        if (this.state.loginSuccess)
            return <Redirect to={this.state.to}></Redirect>;
        return (
            <Dialog title='login.exe' closeDisabled>
                <Helmet>
                    <title>
                        {this.props.intl.formatMessage({
                            id: 'helmet.login.title',
                        })}
                    </title>
                </Helmet>
                <FixedLocaleSelectorWrapper>
                    <LocaleSelector />
                </FixedLocaleSelectorWrapper>
                <AnchorWrapper>
                    <FormattedMessage id='auth.login.goToRegisterText' />
                    <Anchor href={FRONTEND_REGISTER_URL}>
                        <FormattedMessage id='auth.login.registerLink' />
                    </Anchor>
                </AnchorWrapper>
                <DefaultLogin onLoginSuccess={this.onLoginSuccess} />
                <DividerWrapper />
                <OAuthBtnContainer>
                    <OAuthLoginBtnWrapper>
                        <GoogleLogin onLoginSuccess={this.onLoginSuccess} />
                    </OAuthLoginBtnWrapper>
                    <OAuthLoginBtnWrapper>
                        <FacebookLogin onLoginSuccess={this.onLoginSuccess} />
                    </OAuthLoginBtnWrapper>
                </OAuthBtnContainer>
            </Dialog>
        );
    }
}

export default injectIntl(Login);
