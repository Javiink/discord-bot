const chalk = require('chalk');
require('better-logging')(console, {
  format: ctx => `${ctx.date} ${ctx.time24} ${ctx.msg}`
});
const fs = require('fs');

// *Musiink bot logger*
// This logger shows messages in the server console and logs
// @TODO some things into MySQL database for analytics and registry

let logfile = fs.createWriteStream(__dirname+'/app.log', {flags: 'a'});

module.exports = {
    log(guild, msg) {
        console.info(chalk.blue('ℹ')+` ${chalk.greenBright(`[${guild}]`)}  ${msg}`);
        logfile.write(`${fileLogDate()} ℹ [${guild}] ${msg}\n`);
    },
    info(guild, msg) {
        console.info(chalk.blue('ℹ')+` ${chalk.greenBright(`[${guild}]`)}  ${msg}`);
        logfile.write(`${fileLogDate()} ℹ [${guild}] ${msg}\n`);
    },
    success(guild, msg) {
        console.info(chalk.green(`✓ ${chalk.greenBright(`[${guild}]`)}  ${msg}`));
        logfile.write(`${fileLogDate()} ✓ [${guild}] ${msg}\n`);
    },
    warn(guild, msg) {
        console.warn(chalk.yellow.bold('⚠ WARN')+chalk.yellowBright.bold(` ${chalk.greenBright(`[${guild}]`)}  ${msg}`));
        logfile.write(`${fileLogDate()} ⚠ WARN [${guild}] ${msg}\n`);
    },
    error(guild, msg) {
        console.error(chalk.red.bold('---- ✗ ERROR ----')+chalk.redBright.bold(` ${chalk.greenBright(`[${guild}]`)}  ${msg}`));
        logfile.write(`${fileLogDate()} ---- ✗ ERROR ---- [${guild}] ${msg}\n`);
    },
    highlight(guild, msg) {
        console.info(chalk.magenta.bold('!!HEY, LISTEN!!')+` ${chalk.greenBright(`[${guild}]`)}  ${msg}`);
        logfile.write(`${fileLogDate()} !!HEY, LISTEN!!' [${guild}] ${msg}\n`);
    },
    command(msg) {
        console.log(chalk.cyanBright.bold(`>  ${msg}`));
        logfile.write(`${fileLogDate()} > ${msg}\n`);
    },
}

let fileLogDate = () => {
    var d = new Date();
    return `[${("0"+(d.getDate() + 1)).slice(-2)}/${("0"+(d.getMonth() + 1)).slice(-2)}/${d.getFullYear()} ${("0"+(d.getHours() + 1)).slice(-2)}:${("0"+(d.getMinutes() + 1)).slice(-2)}:${("0"+(d.getSeconds() + 1)).slice(-2)}]  `;
}