import React from 'react';
import { FixedLocaleSelectorWrapper } from '../shared/styled-components';
import { Dialog } from '../shared/Dialog';
import { LocaleSelector } from '../shared/LocaleSelector';
import { Redirect } from 'react-router-dom';
import { TextField, Button, Anchor } from 'react95';
import styled from 'styled-components';
import Axios from 'axios';
import { FormattedMessage, injectIntl, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { API_REGISTER_URL, FRONTEND_LOGIN_URL } from '../../routes';
import { enqueueSnackbar } from '../../store/actions/notifications.action';
import { useForm } from 'react-hook-form';

const FullWidthTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 15px;
`;

const AnchorWrapper = styled.h1`
    margin-bottom: 10px;
    margin-top: -5px;
`;

function RegisterForm(props) {
    const { register, handleSubmit } = useForm();
    const intl = useIntl();
    const onSubmit = (data) => {
        const request = Axios({
            method: 'post',
            url: API_REGISTER_URL,
            data,
        });
        request.then(props.onSuccess);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FullWidthTextField
                autoFocus
                placeholder={intl.formatMessage({
                    id: 'auth.username',
                })}
                {...register('username')}
            />
            <FullWidthTextField
                placeholder={intl.formatMessage({
                    id: 'auth.password',
                })}
                type='password'
                {...register('password')}
            />
            <Button fullWidth type='submit' style={{ marginLeft: '2px' }}>
                <FormattedMessage id='auth.register.btnText' />
            </Button>
        </form>
    );
}

export class Register extends React.Component {
    state = {
        registerSuccess: false,
    };

    render() {
        if (this.state.registerSuccess)
            return <Redirect to='/login'></Redirect>;
        return (
            <Dialog title='register.exe' closeDisabled>
                <Helmet>
                    <title>
                        {this.props.intl.formatMessage({
                            id: 'helmet.register.title',
                        })}
                    </title>
                </Helmet>
                <FixedLocaleSelectorWrapper>
                    <LocaleSelector />
                </FixedLocaleSelectorWrapper>
                <AnchorWrapper>
                    <FormattedMessage id='auth.register.goToLoginText' />
                    <Anchor href={FRONTEND_LOGIN_URL}>
                        <FormattedMessage id='auth.register.loginLink' />
                    </Anchor>
                </AnchorWrapper>
                <RegisterForm
                    onSuccess={() => {
                        this.setState({ registerSuccess: true });
                        enqueueSnackbar({
                            templateName: 'auth.register.snackbar.successful',
                        });
                    }}
                />
            </Dialog>
        );
    }
}

export default injectIntl(Register);
