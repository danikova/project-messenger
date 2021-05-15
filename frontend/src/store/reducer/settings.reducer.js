import {
    SETTINGS_SELECT_THEME,
    SETTINGS_SET_BACKGROUND_COLOR,
    SETTINGS_SET_FONT_SIZE,
    SETTINGS_SET_SCREEN_LINES_INTENSITY,
    SETTINGS_TOGGLE_SCREEN_LINES,
    SETTINGS_TOGGLE_VINTAGE_FONT,
} from '../constants/settings.constant';

const INITIAL_STATE = {
    theme: 'original',
    vintageFont: false,
    fontSize: 1,
    scanLines: false,
    scanLinesIntensity: 0,
    backgroundColor: '#008080',
};

export function settings(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SETTINGS_SELECT_THEME:
            return { ...state, theme: action.data };
        case SETTINGS_TOGGLE_VINTAGE_FONT:
            return { ...state, vintageFont: action.data };
        case SETTINGS_SET_FONT_SIZE:
            return { ...state, fontSize: action.data };
        case SETTINGS_TOGGLE_SCREEN_LINES:
            return { ...state, scanLines: action.data };
        case SETTINGS_SET_SCREEN_LINES_INTENSITY:
            return { ...state, scanLinesIntensity: action.data };
        case SETTINGS_SET_BACKGROUND_COLOR:
            return { ...state, backgroundColor: action.data };
        default:
            return state;
    }
}
