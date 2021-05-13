import styled from 'styled-components';
import { Window, WindowHeader, WindowContent, Panel } from 'react95';
import { Grid } from '@material-ui/core';

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

export const DialogBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
`;

export const DialogWindow = styled(Window)`
    z-index: 110;
    width: 500px;
    margin: auto;
    display: block;
    margin-top: 100px;
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
`;

export const DialogWindowHeader = styled(WindowHeader)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const DialogWindowFooter = styled(Panel)`
    display: block;
    margin: 0.25rem;
    height: 31px;
    line-height: 31px;
    padding-left: 0.25rem;
`;

export const DialogCloseSpan = styled.span`
    font-weight: bold;
    transform: translate(0px, -2px);
    font-size: 25px;
`;

export const MarginRightSpan = styled.span`
    margin-right: 20px;
`;

export const FixedLocaleSelectorWrapper = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
`;