import React, { useEffect, useRef, useState } from 'react';
import { Cutout, Button } from 'react95';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { MaxHeightGrid } from '../../../shared/styled-components';
import { FormattedMessage } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload, FaPaperPlane } from 'react-icons/fa';
import ContentEditable from 'react-contenteditable';
import { pushActiveMessage } from '../../../../store/actions/room.action';

const CustomTextarea = styled(({ className, value, ...props }) => {
    return (
        <Cutout className={className}>
            <ContentEditable
                className='textarea'
                {...props}
                role='textbox'
                html={value}
                tagName='span'
            ></ContentEditable>
        </Cutout>
    );
})`
    background: white;
    cursor: text;

    & > div {
        min-height: 62px;
    }

    .textarea {
        background: white;
        display: block;
        width: calc(100% + 12px);
        min-height: 54px;
        height: 100%;
        max-height: 140px;
        resize: none;
        outline: none;
        overflow: visible;
        margin: -8px;
        padding: 12px;
        box-sizing: border-box;

        &:empty::before {
            content: '${({ placeholder }) => placeholder}';
            color: gray;
        }
    }
`;

const InputField = styled.div`
    flex: 0 0;

    .full-height {
        height: 100%;
    }

    .full-width {
        width: 100%;
    }

    .btn-group {
        height: 70px;
        max-height: 70px;
    }

    .half-height {
        height: 50%;
    }

    .send-fa {
        margin-left: 5px;
    }
`;

const ContentGrid = styled(MaxHeightGrid)`
    align-items: flex-end;
`;

export function FocusedChatroomInputField({ disabled, focusedRoomId }) {
    const message = useRef('');
    const [files, setFiles] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [sendDisabled, setSendDisabled] = useState(processing);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (droppedFiles) => {
            const newFiles = [...files, ...droppedFiles];
            setFiles(newFiles);
            setSendDisabled(
                processing || (!message.current && newFiles.length === 0),
            );
        },
    });

    const { onClick: openFileBrowser, ...rootProps } = getRootProps();

    const flushMessage = () => {
        const m = message.current.trim();
        const f = files;
        if (focusedRoomId && (m || f.length !== 0)) {
            pushActiveMessage(m, f, () => {
                message.current = '';
                setFiles([]);
                setSendDisabled(true);
                setProcessing(false);
            });
            setProcessing(true);
        }
    };

    useEffect(() => {
        setSendDisabled(processing || (!message.current && files.length === 0));
    }, [processing, message, files, setSendDisabled]);

    return (
        <InputField {...rootProps}>
            <input {...getInputProps()} />
            <ContentGrid container>
                <Grid item xs={10} md={10}>
                    <CustomTextarea
                        autoFocus
                        rows={2}
                        disabled={processing}
                        value={isDragActive ? '' : message.current}
                        onChange={(e) => {
                            const newMessage = e.currentTarget.innerText.trim()
                                ? e.target.value
                                : '';
                            message.current = newMessage;
                            setSendDisabled(
                                processing ||
                                    (!message.current && files.length === 0),
                            );
                        }}
                        onKeyPress={(e) => {
                            if (!e.shiftKey && e.key === 'Enter') {
                                flushMessage();
                                e.preventDefault();
                            }
                        }}
                        placeholder={
                            isDragActive
                                ? 'Drop the files here ...'
                                : 'Type something or drag n drop files ...'
                        }
                    />
                </Grid>
                <Grid item xs={2} md={2}>
                    <Grid className='full-height btn-group' container direction='column'>
                        <Grid className='half-height' item>
                            <Button
                                className='full-height full-width'
                                disabled={sendDisabled}
                                onClick={flushMessage}
                            >
                                <FormattedMessage id='chatrooms.focusedChatroom.newMessage.btnText' />
                                <FaPaperPlane className='send-fa' />
                            </Button>
                        </Grid>
                        <Grid className='half-height' item>
                            <Button
                                className='full-height full-width'
                                disabled={processing}
                                onClick={openFileBrowser}
                            >
                                <FaFileUpload />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </ContentGrid>
        </InputField>
    );
}
