import React from 'react';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

export class Profile extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>
                        {this.props.intl.formatMessage({
                            id: 'helmet.profile.title',
                        })}
                    </title>
                </Helmet>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
                <div>Profile</div>
            </div>
        );
    }
}

export default injectIntl(Profile);
