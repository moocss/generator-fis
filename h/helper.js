var fs = require('fs');
var chalk = require('chalk');
function info() {
    var logo = readStr(__dirname + '/logo.txt');
    var help = readStr(__dirname + '/help.txt');
    console.log(chalk.green(logo));
    console.log(chalk.gray(help));
}

function readStr(file) {
    var data = fs.readFileSync(file, {
        encoding: 'utf8',
        flag: 'r'
    });
    return data;
}

exports.info = info;
