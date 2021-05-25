import React, { useEffect, useRef, useState } from 'react';
import { Cutout, Button } from 'react95';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { MaxHeightGrid } from '../../../shared/styled-components';
import { FormattedMessage } from 'react-intl';
import { useDropzone } from 'react-dropzone';
import { FaFileUpload, FaPaperPlane } from 'react-icons/fa';
import { pushActiveMessage } from '../../../../store/actions/room.action';
import { Editor, EditorState, getDefaultKeyBinding } from 'draft-js';
import { FileCarousel } from './FileCarousel';
import { fileToBase64 } from '../../../../shared/utils';

const oneMb = 1000000;
const maxFileSize = 15 * oneMb;
const maxFileCount = 9;

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
    const onDrop = (droppedFiles) =>
        setFiles(
            [...files, ...droppedFiles]
                .filter((file) => file.size < maxFileSize)
                .slice(0, maxFileCount),
        );
    const getMessage = () =>
        editorState
            .getCurrentContent()
            .getPlainText()
            .trim()
            .replace(/(\r\n|\r|\n)/gm, '<br>');
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
                        <FileCarousel
                            files={getFiles()}
                            getSrc={(file, setSrc) => {
                                if (file.type.startsWith('image'))
                                    fileToBase64(file).then(setSrc);
                            }}
                            getType={(file) =>
                                file.type.startsWith('image') ? 'image' : 'file'
                            }
                            onDeleteClick={(index) => {
                                setFiles([
                                    ...files.filter((item, i) => i !== index),
                                ]);
                            }}
                        />
                        <Editor
                            editorState={editorState}
                            onChange={setEditorState}
                            placeholder={
                                isDragActive
                                    ? 'Drop the files here ...'
                                    : 'Type something or drag n drop files ...'
                            }
                            keyBindingFn={(e) => {
                                if (!e.shiftKey && e.key === 'Enter')
                                    return 'flush-messages';
                                return getDefaultKeyBinding(e);
                            }}
                            handleKeyCommand={(command) => {
                                if (command === 'flush-messages') {
                                    flushMessage();
                                    return 'handled';
                                }
                                return 'not-handled';
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
                                disabled={
                                    processing ||
                                    getFiles().length >= maxFileCount
                                }
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
