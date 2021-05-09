import styled from 'styled-components';
import React from 'react';

import {
    AppBar as OriginalAppBar,
    Toolbar,
    TextField,
    Button,
} from 'react95';
import { withSnackbar } from 'notistack';
import { AppbarList } from './AppbarList';

const CustomAppBar = styled(OriginalAppBar)`
    z-index: 50;
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
                            display: 'inline-block',
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
                    </div>

                    <TextField placeholder='Search...' width={150} />
                </Toolbar>
            </CustomAppBar>
        );
    }
}

export default withSnackbar(AppBar);


