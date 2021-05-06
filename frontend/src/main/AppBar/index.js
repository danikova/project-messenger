import styled from 'styled-components';
import React from 'react';

import {
    AppBar as OriginalAppBar,
    Toolbar,
    TextField,
    Button,
    List,
    ListItem,
    Divider,
} from 'react95';

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
                            <List
                                style={{
                                    position: 'absolute',
                                    left: '0',
                                    top: '100%',
                                }}
                                onClick={() =>
                                    this.setState({ toolbarOpen: false })
                                }
                            >
                                <ListItem>
                                    <span role='img' aria-label='👨‍💻'>
                                        👨‍💻
                                    </span>
                                    Profile
                                </ListItem>
                                <ListItem>
                                    <span role='img' aria-label='📁'>
                                        📁
                                    </span>
                                    My account
                                </ListItem>
                                <Divider />
                                <ListItem disabled>
                                    <span role='img' aria-label='🔙'>
                                        🔙
                                    </span>
                                    Logout
                                </ListItem>
                            </List>
                        )}
                    </div>

                    <TextField placeholder='Search...' width={150} />
                </Toolbar>
            </CustomAppBar>
        );
    }
}

export default AppBar;
