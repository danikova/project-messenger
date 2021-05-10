import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    Button,
    Window,
    WindowHeader,
    WindowContent,
    Toolbar,
    Avatar,
    Panel,
    Progress
} from 'react95';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../redux/actions/user.action';

export const AppWrapperGrid = styled(Grid)`
    height: calc(100% - 28px);
    max-height: calc(100% - 28px) !important;
    margin-top: 37px !important;
    > div {
        max-height: 100% !important;
    }
`;

export const MaxHeightGrid = styled(Grid)`
    height: 100%;
`;

export const MaxSizeFlexWindow = styled(Window)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const FlexWindowHeader = styled(WindowHeader)`
    flex: 0 1;
`;

export const FlexWindowContent = styled(WindowContent)`
    flex: 1 1;
`;

const DialogBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

const DialogWindow = styled(Window)`
    z-index: 110;
    width: 500px;
    margin: auto;
    display: block;
    margin-top: 100px;
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
`;

const DialogWindowHeader = styled(WindowHeader)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DialogWindowFooter = styled(Panel)`
    display: block;
    margin: 0.25rem;
    height: 31px;
    line-height: 31px;
    padding-left: 0.25rem;
`;

const DialogCloseSpan = styled.span`
    font-weight: bold;
    transform: translate(2px, -2px);
    font-size: 25px;
`;

export class Dialog extends React.Component {
    onKeyDown = (e) => {
        if (e.key === 'Escape' && this.props.onCloseClick)
            this.props.onCloseClick();
    };

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    render() {
        return (
            <DialogBackground>
                <DialogWindow resizable>
                    <DialogWindowHeader>
                        <span>{this.props.title}</span>
                        <Button
                            onClick={() =>
                                this.props.onCloseClick &&
                                this.props.onCloseClick()
                            }
                            disabled={this.props.closeDisabled}
                        >
                            <DialogCloseSpan>x</DialogCloseSpan>
                        </Button>
                    </DialogWindowHeader>
                    {this.props.toolbar && (
                        <Toolbar>{this.props.toolbar}</Toolbar>
                    )}
                    <WindowContent>{this.props.children}</WindowContent>
                    {this.props.footer && (
                        <DialogWindowFooter>
                            {this.props.footer}
                        </DialogWindowFooter>
                    )}
                </DialogWindow>
            </DialogBackground>
        );
    }
}

const MarginRightSpan = styled.span`
    margin-right: 20px;
`;

export function CustomSnackbar(props) {
    const { closeSnackbar } = useSnackbar();
    return (
        <Window>
            <DialogWindowHeader>
                <MarginRightSpan>{props.message}</MarginRightSpan>
                <Button
                    onClick={() => {
                        closeSnackbar(props.id);
                    }}
                >
                    <DialogCloseSpan>x</DialogCloseSpan>
                </Button>
            </DialogWindowHeader>
        </Window>
    );
}

export function AvatarHolder({ userId = null, ...props }) {
    const users = useSelector((state) => state.users);

    let user = {};
    if (userId) {
        if (users[userId]) user = users[userId];
        else getUserInfo(userId);
    }

    const color = user.color || { primary: '#fff', secondary: '#000' };
    return (
        <Avatar
            size={33}
            style={{
                background: `#${color.primary}`,
                color: `#${color.secondary}`,
                textShadow:
                    '-1px -1px 0 #595959, 1px -1px 0 #595959, -1px 1px 0 #595959, 1px 1px 0 #595959',
            }}
            src={user.imageUrl}
        >
            {user && user.username
                ? user.username.charAt(0).toUpperCase()
                : '...'}
        </Avatar>
    );
}

export const RandomProgress = () => {
    const [percent, setPercent] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setPercent(previousPercent => {
          if (previousPercent === 100) {
            return 0;
          }
          const diff = Math.random() * 5;
          return Math.min(previousPercent + diff, 100);
        });
      }, 500);
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return <Progress variant='tile' value={Math.floor(percent)} />;
  };