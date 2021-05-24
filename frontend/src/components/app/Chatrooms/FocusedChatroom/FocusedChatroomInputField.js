import React, { useEffect, useRef, useState } from 'react';
import { Cutout, Button } from 'react95';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { MaxHeightGrid } from '../../../shared/styled-components';
import { FormattedMessage } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload, FaPaperPlane } from 'react-icons/fa';
import { pushActiveMessage } from '../../../../store/actions/room.action';
import { Editor, EditorState } from 'draft-js';

const CustomCutout = styled(Cutout)`
    background: white;
    cursor: text;

    & > div {
        min-height: 62px;
    }

    .DraftEditor-root {
        background: white;
        display: block;
        width: 100%;
        min-height: 54px;
        max-height: 140px;
        resize: none;
        outline: none;
        overflow: visible;
        box-sizing: border-box;
        padding: 0 0 0 4px;

        .public-DraftEditorPlaceholder-root {
            color: gray;
            position: fixed;
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

export function FocusedChatroomInputField({ focusedRoomId }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [files, setFiles] = useState([]);
    const [processing, setProcessing] = useState(false);
    const domEditor = useRef();

    const focus = () => domEditor.current && domEditor.current.focus();
    const onDrop = (droppedFiles) => setFiles([...files, ...droppedFiles]);
    const getMessage = () =>
        editorState.getCurrentContent().getPlainText('<br>').trim();
    const getFiles = () => files;
    const sendDisabled =
        processing || (!getMessage() && getFiles().length === 0);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const { onClick: openFileBrowser, ...rootProps } = getRootProps();

    const flushMessage = () => {
        if (focusedRoomId && !sendDisabled) {
            pushActiveMessage(getMessage(), getFiles(), () => {
                setFiles([]);
                setEditorState(EditorState.createEmpty());
                setProcessing(false);
                focus();
            });
            setProcessing(true);
        }
    };

    useEffect(() => {
        focus();
    }, []);

    return (
        <InputField {...rootProps} tabIndex={-1} onClick={focus}>
            <input {...getInputProps()} tabIndex={-1} />
            <ContentGrid container>
                <Grid item xs={10} md={10}>
                    <CustomCutout>
                        <Editor
                            editorState={editorState}
                            onChange={setEditorState}
                            placeholder={
                                isDragActive
                                    ? 'Drop the files here ...'
                                    : 'Type something or drag n drop files ...'
                            }
                            keyBindingFn={(e) => {
                                if (!e.shiftKey && e.key === 'Enter') {
                                    flushMessage();
                                    e.preventDefault();
                                }
                            }}
                            readOnly={processing}
                            spellCheck
                            ref={domEditor}
                        />
                    </CustomCutout>
                </Grid>
                <Grid item xs={2} md={2}>
                    <Grid
                        className='full-height btn-group'
                        container
                        direction='column'
                    >
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
