const chalk = require('chalk');

exports.info = (...args) => console.log(chalk.bold.cyan(...args));
exports.warning = (...args) => console.log(chalk.bold.yellow(...args));
exports.error = (...args) => console.log(chalk.bold.red(...args));
exports.fatal = (...args) => console.log(chalk.bold.magenta(...args));
