import styled from 'styled-components';
import React from 'react';

import {
    AppBar as OriginalAppBar,
    Toolbar,
    TextField,
    Button,
} from 'react95';
import { AppbarList } from './AppbarList';
import { AvatarHolder } from '../../shared/AvatarHolder';
import { LocaleSelector } from '../../shared/LocaleSelector';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const CustomAppBar = styled(OriginalAppBar)`
    z-index: 50;
`;

const AvatarMargin = styled.div`
    padding: 5px;
    display: inline;
`;

const CustomToolbar = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ToolbarContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export class AppBar extends React.Component {
    state = {
        toolbarOpen: false,
    };

    render() {
        return (
            <CustomAppBar>
                <CustomToolbar>
                    <ToolbarContentWrapper>
                        <Button
                            onClick={() =>
                                this.setState({
                                    toolbarOpen: !this.state.toolbarOpen,
                                })
                            }
                            active={this.state.toolbarOpen}
                            style={{ fontWeight: 'bold' }}
                        >
                            {/* <img
                                src={logoIMG}
                                alt='react95 logo'
                                style={{ height: '20px', marginRight: 4 }}
                            /> */}
                            Start
                        </Button>
                        {this.state.toolbarOpen && (
                            <AppbarList
                                toolbarClose={() =>
                                    this.setState({ toolbarOpen: false })
                                }
                            />
                        )}
                        <AvatarMargin />

                        <AvatarHolder
                            userId={
                                this.props.user.data && this.props.user.data._id
                            }
                        />
                        <AvatarMargin />
                        <div>{this.props.user.data.username}</div>
                    </ToolbarContentWrapper>
                    <ToolbarContentWrapper>
                        <LocaleSelector />
                        <TextField
                            placeholder={this.props.intl.formatMessage({
                                id: 'appbar.searchPlaceholder',
                            })}
                            width={300}
                        />
                    </ToolbarContentWrapper>
                </CustomToolbar>
            </CustomAppBar>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        user,
    };
};

export default injectIntl(connect(mapStateToProps)(AppBar));
