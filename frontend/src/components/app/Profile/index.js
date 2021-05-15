import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import {
    FlexWindowHeader,
    MaxWindowContent,
    MaxSizeFlexWindow,
    Pad,
} from '../../shared/styled-components';
import { Tab, Tabs, TabBody, Cutout } from 'react95';
import Settings from './Settings';
import { history } from '../../../shared/history.service';
import { FRONTEND_PROFILE_SETTINGS_URL, FRONTEND_PROFILE_URL } from '../../../routes';

const FullHeightTabBody = styled(TabBody)`
    height: calc(100% - 34px);
`;

const MaxHeightCutout = styled(Cutout)`
    height: 100%;
    max-height: 100%;
`;

export function Profile(props) {
    const intl = useIntl();
    const { pathname } = props.location;

    return (
        <MaxSizeFlexWindow>
            <Helmet>
                <title>
                    {intl.formatMessage({
                        id: 'helmet.profile.title',
                    })}
                </title>
            </Helmet>
            <FlexWindowHeader>
                <span>profile.exe</span>
            </FlexWindowHeader>
            <MaxWindowContent>
                <Tabs
                    value={pathname}
                    onChange={(_e, value) => history.push(value)}
                >
                    <Tab value={FRONTEND_PROFILE_URL}>
                        <FormattedMessage id='profile.userInfo.tabText' />
                    </Tab>
                    <Tab value={FRONTEND_PROFILE_SETTINGS_URL}>
                        <FormattedMessage id='profile.settings.tabText' />
                    </Tab>
                </Tabs>
                <FullHeightTabBody>
                    <MaxHeightCutout>
                        {pathname === FRONTEND_PROFILE_URL && (
                            <Pad>
                                <div>user info</div>
                            </Pad>
                        )}
                        {pathname === FRONTEND_PROFILE_SETTINGS_URL && (
                            <Pad>
                                <Settings />
                            </Pad>
                        )}
                    </MaxHeightCutout>
                </FullHeightTabBody>
            </MaxWindowContent>
        </MaxSizeFlexWindow>
    );
}

export default Profile;
