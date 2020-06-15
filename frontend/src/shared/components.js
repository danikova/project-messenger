import styled from 'styled-components';

import { Window, WindowHeader, WindowContent } from 'react95';
import { Grid } from '@material-ui/core';

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
