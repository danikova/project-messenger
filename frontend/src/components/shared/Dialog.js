import React from 'react';
import {
    Button,


    WindowContent,
    Toolbar
} from 'react95';
import { DialogBackground, DialogWindow, DialogWindowHeader, DialogCloseSpan, DialogWindowFooter } from './styled-components';


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
                            onClick={() => this.props.onCloseClick &&
                                this.props.onCloseClick()}
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
