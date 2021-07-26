import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Fieldset, Checkbox, Slider, Radio, ColorInput } from 'react95';
import { Pad } from '../../shared/styled-components';
import {
    setTheme,
    setFontSize,
    setScreenLinesIntensity,
    toggleScreenLines,
    toggleVintageFont,
    setBackgroundColor,
} from '../../../store/actions/settings.action';

export function Settings() {
    const {
        theme,
        vintageFont,
        fontSize,
        scanLines,
        scanLinesIntensity,
        backgroundColor,
    } = useSelector((state) => state.settings);
    const handleChangeWrapper = (action) => (e) => action(e.target.value);
    let colorChangeTimeout = null;
    return (
        <div>
            <Fieldset
                label={
                    <FormattedMessage id='profile.settings.fieldsets.backgroundColorLabel' />
                }
            >
                <Pad>
                    <ColorInput
                        defaultValue={backgroundColor}
                        onChange={(e) => {
                            clearTimeout(colorChangeTimeout);
                            colorChangeTimeout = setTimeout(() => {
                                handleChangeWrapper(setBackgroundColor)(e);
                            }, 500);
                        }}
                    />
                </Pad>
            </Fieldset>
            <Pad />
            <Fieldset
                label={
                    <FormattedMessage id='profile.settings.fieldsets.themeLabel' />
                }
            >
                <Pad>
                    <Radio
                        checked={theme === 'original'}
                        value='original'
                        label={
                            <FormattedMessage id='profile.settings.fieldsets.theme.original' />
                        }
                        onChange={handleChangeWrapper(setTheme)}
                    />
                    <br />
                    <Radio
                        checked={theme === 'rose'}
                        value='rose'
                        label={
                            <FormattedMessage id='profile.settings.fieldsets.theme.rose' />
                        }
                        onChange={handleChangeWrapper(setTheme)}
                    />
                    <br />
                    <Radio
                        checked={theme === 'tokyoDark'}
                        value='tokyoDark'
                        label={
                            <FormattedMessage id='profile.settings.fieldsets.theme.tokyoDark' />
                        }
                        onChange={handleChangeWrapper(setTheme)}
                    />
                    <br />
                    <Radio
                        checked={theme === 'olive'}
                        value='olive'
                        label={
                            <FormattedMessage id='profile.settings.fieldsets.theme.olive' />
                        }
                        onChange={handleChangeWrapper(setTheme)}
                    />
                </Pad>
            </Fieldset>
            <Pad />
            <Fieldset
                label={
                    <FormattedMessage id='profile.settings.fieldsets.fontLabel' />
                }
            >
                <Pad>
                    <Checkbox
                        label={
                            <FormattedMessage id='profile.settings.fieldsets.font.vintageFontLabel' />
                        }
                        checked={vintageFont}
                        onChange={() => toggleVintageFont(!vintageFont)}
                    />
                    <Pad>
                        <Slider
                            value={fontSize}
                            onChange={(e, val) => {
                                if (fontSize !== val) setFontSize(val);
                            }}
                            min={0.8}
                            max={1.2}
                            step={null}
                            marks={[
                                { value: 0.8, label: '0.8' },
                                { value: 0.9, label: '0.9' },
                                { value: 1, label: '1' },
                                { value: 1.1, label: '1.1' },
                                { value: 1.2, label: '1.2' },
                            ]}
                        />
                    </Pad>
                </Pad>
            </Fieldset>
            <Pad />
            <Fieldset
                label={
                    <Checkbox
                        label={
                            <FormattedMessage id='profile.settings.fieldsets.scanLineLabel' />
                        }
                        checked={scanLines}
                        onChange={() => toggleScreenLines(!scanLines)}
                    />
                }
            >
                <Pad>
                    <div>
                        <FormattedMessage id='profile.settings.fieldsets.scanLine.intensityLabel' />
                    </div>
                    <Pad>
                        <Slider
                            value={scanLinesIntensity}
                            onChange={(e, val) => {
                                if (scanLinesIntensity !== val)
                                    setScreenLinesIntensity(val);
                            }}
                            step={10}
                            min={0}
                            max={100}
                            marks={[
                                { value: 0, label: 'min' },
                                { value: 100, label: 'max' },
                            ]}
                        />
                    </Pad>
                </Pad>
            </Fieldset>
        </div>
    );
}

export default Settings;
