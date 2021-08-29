const chalk = require('chalk');
require('better-logging')(console, {
  format: ctx => `${ctx.date} ${ctx.time24} ${ctx.msg}`
});

// *Musiink bot logger*
// This logger shows messages in the server console and logs
// @TODO some things into MySQL database for analytics and registry

module.exports = {
    log(msg) {
        console.info(chalk.blue('ℹ')+` ${msg}`);
    },
    info(msg) {
        console.info(chalk.blue('ℹ')+` ${msg}`);
    },
    success(msg) {
        console.info(chalk.green(`✓ ${msg}`));
    },
    warn(msg) {
        console.warn(chalk.yellow.bold('⚠ WARN')+chalk.yellowBright.bold(` ${msg}`));
    },
    error(msg) {
        console.error(chalk.red.bold('---- ✗ ERROR ----')+chalk.redBright.bold(` ${msg}`));
    },
    highlight(msg) {
        console.info(chalk.magenta.bold('!!HEY, LISTEN!!')+` ${msg}`);
    },
}