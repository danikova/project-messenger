import styled from 'styled-components';
import React from 'react';

import { AppBar as OriginalAppBar, Toolbar, TextField, Button } from 'react95';
import { withSnackbar } from 'notistack';
import { AppbarList } from './AppbarList';
import { AvatarHolder } from '../../shared/components';
import { connect } from 'react-redux';

const CustomAppBar = styled(OriginalAppBar)`
    z-index: 50;
`;

const AvatarMargin = styled.div`
    padding: 5px;
    display: inline;
`;

export class AppBar extends React.Component {
    state = {
        toolbarOpen: false,
    };

    render() {
        return (
            <CustomAppBar>
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <div
                        style={{
                            position: 'relative',
                            display: 'flex',
                        }}
                    >
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
                                enqueueSnackbar={this.props.enqueueSnackbar}
                            />
                        )}
                        <AvatarMargin />
                        <AvatarHolder
                            userId={
                                this.props.user.data && this.props.user.data._id
                            }
                        />
                    </div>
                    <TextField placeholder='Search...' width={300} />
                </Toolbar>
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

export default withSnackbar(connect(mapStateToProps)(AppBar));
