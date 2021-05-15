import { store } from '..';
import {
    SETTINGS_SELECT_THEME,
    SETTINGS_SET_FONT_SIZE,
    SETTINGS_TOGGLE_SCREEN_LINES,
    SETTINGS_TOGGLE_VINTAGE_FONT,
    SETTINGS_SET_SCREEN_LINES_INTENSITY,
    SETTINGS_SET_BACKGROUND_COLOR
} from '../constants/settings.constant';

export function setTheme(value) {
    store.dispatch({ type: SETTINGS_SELECT_THEME, data: value });
}

export function toggleVintageFont(value) {
    store.dispatch({ type: SETTINGS_TOGGLE_VINTAGE_FONT, data: value });
}

export function setFontSize(value) {
    store.dispatch({ type: SETTINGS_SET_FONT_SIZE, data: value });
}

export function toggleScreenLines(value) {
    store.dispatch({ type: SETTINGS_TOGGLE_SCREEN_LINES, data: value });
}

export function setScreenLinesIntensity(value) {
    store.dispatch({ type: SETTINGS_SET_SCREEN_LINES_INTENSITY, data: value });
}

export function setBackgroundColor(value) {
    store.dispatch({ type: SETTINGS_SET_BACKGROUND_COLOR, data: value });
}
