import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import {
    FlexWindowHeader,
    MaxSizeFlexWindow,
} from '../../shared/styled-components';
import { Tab, Tabs, TabBody, WindowContent } from 'react95';

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
            <WindowContent>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab value={0}>
                        <FormattedMessage id='profile.userInfo.tabText' />
                    </Tab>
                    <Tab value={1}>
                        <FormattedMessage id='profile.settings.tabText' />
                    </Tab>
                </Tabs>
                <TabBody>
                    {activeTab === 0 && <div>user info</div>}
                    {activeTab === 1 && <div>settings</div>}
                </TabBody>
            </WindowContent>
        </MaxSizeFlexWindow>
    );
}

export default Profile;
