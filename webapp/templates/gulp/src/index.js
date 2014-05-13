var fs = require('fs');
var onlyScripts = require('./utilus/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);
tasks.forEach(function(task) {
    require('./tasks/' + task);
});