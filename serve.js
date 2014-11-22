var fs = require('fs');
var Express = require('express');
var app = Express();

// HTTP port to listen
var port = 4000;

// Serve 
app.get('/', function(req, res) { 
    var file = __dirname + '/resume.json';
    fs.readFile(file, function(err, resumeJson) {
        var resumeJson;
        if (err) {
            console.log('Could not find:', file);
        } else {
            try {
                resumeJson = JSON.parse(resumeJson);
            } catch (e) {
                var msg = 'Parse error: ' + file;
                res.status(404).send(msg);
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                console.log(msg);
                return;
            }
        }
        var render = require(__dirname + '/index').render;
        try {
            console.log('Using local theme.');
            res.send(render(resumeJson));
            return;
        } catch (e) {
            console.log(e);
            throw e;
        }
    });
});

// Serve static files css, js, images...
app.use(Express.static(process.cwd() + '/Ceevee10'));
app.listen(port);

console.log('');
var previewUrl = 'http://localhost:' + port;
console.log('Preview: ' + previewUrl);
console.log('Press ctrl-c to stop\n')
