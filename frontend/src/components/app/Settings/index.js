import React from 'react';
import styled from 'styled-components';
import {
    FlexWindowHeader,
    MaxWindowContent,
    MaxSizeFlexWindow,
    Pad,
} from '../../shared/styled-components';
import { Cutout } from 'react95';
import Settings from './Layout';

const MaxHeightCutout = styled(Cutout)`
    height: 100%;
    max-height: 100%;
`;

export function Profile(props) {
    return (
        <MaxSizeFlexWindow>
            <FlexWindowHeader>
                <span>settings.exe</span>
            </FlexWindowHeader>
            <MaxWindowContent>
                <MaxHeightCutout>
                    <Pad>
                        <Settings />
                    </Pad>
                </MaxHeightCutout>
            </MaxWindowContent>
        </MaxSizeFlexWindow>
    );
}

export default Profile;
