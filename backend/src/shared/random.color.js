const ColorScheme = require('color-scheme');
const scheme = new ColorScheme();

module.exports = function (hueValue = null) {
    if (hueValue == null) {
        const hueWheelSection = 360 / 100;
        hueValue = parseInt(Math.random() * 100 * hueWheelSection);
    } else {
        hueValue = hueValue % 360;
    }
    const colors = scheme
        .from_hue(hueValue)
        .scheme('contrast')
        .variation('pastel')
        .variation('light')
        .colors();

    const color = [colors[2], colors[0], colors[3], colors[1]];
    const compColor = [colors[6], colors[4], colors[7], colors[5]];
    return {
        color,
        compColor,
        primary: color[parseInt(Math.random() * color.length)],
        secondary: compColor[3],
    };
};
