import React, { useState } from 'react';
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

const FullHeightTabBody = styled(TabBody)`
    height: calc(100% - 34px);
`;

const MaxHeightCutout = styled(Cutout)`
    height: 100%;
    max-height: 100%;
`;

export function Profile() {
    const intl = useIntl();
    const [activeTab, setActiveTab] = useState(0);

    function handleTabChange(_e, value) {
        setActiveTab(value);
    }

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
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab value={0}>
                        <FormattedMessage id='profile.userInfo.tabText' />
                    </Tab>
                    <Tab value={1}>
                        <FormattedMessage id='profile.settings.tabText' />
                    </Tab>
                </Tabs>
                <FullHeightTabBody>
                    <MaxHeightCutout>
                        {activeTab === 0 && (
                            <Pad>
                                <div>user info</div>
                            </Pad>
                        )}
                        {activeTab === 1 && (
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
