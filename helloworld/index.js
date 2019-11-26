var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs'),
    mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "thweb"
});

insert_db = (data, conn) => {
    let lines = data.split(/\r\n|\r|\n/)
    let len = lines.length
    for (i = 0; i < len; i++) {
        var sql = "INSERT INTO users (username, age, email) VALUES (" + lines[i] + ")";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }
}
http.createServer(function (req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = "upload";
        form.keepExtensions = true;

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });

        form.parse(req, function (err, fields, files) {
            // //readfile
            fs.readFile(files.upload.path, 'utf8', function (err, data) {
                if (err) throw err;
                console.log('OK: ' + files.upload.path);
                console.log(data);
                insert_db(data, con);
            });


            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ fields: fields, files: files }));

        });

        return;
    }

    // show a file upload form
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
}).listen(8080);


