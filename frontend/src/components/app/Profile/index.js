import React, { useState } from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import {
    FlexWindowHeader,
    MaxSizeFlexWindow,
    MaxWindowContent,
} from '../../shared/styled-components';
import { Tab, Tabs, TabBody } from 'react95';

const FullHeightTabBody = styled(TabBody)`
    height: calc(100% - 34px);
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
                    {activeTab === 0 && <div>user info</div>}
                    {activeTab === 1 && <div>settings</div>}
                </FullHeightTabBody>
            </MaxWindowContent>
        </MaxSizeFlexWindow>
    );
}

export default Profile;
