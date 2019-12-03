var formidable = require("formidable"),
  http = require("http"),
  util = require("util"),
  fs = require("fs"),
  mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "a17020077",
  password: "123456",
  database: "a17020077"
});
var bodyParser = require("body-parser");

insert_db = (name, author, conn) => {
  let sql =
    "INSERT INTO users (name, author, pushlished_date) VALUES (" +
    name +
    "," +
    author +
    ");";
  conn.query(sql, function(err, result) {
    if (err) throw err;
    console.log("1 book inserted");
  });
};


select_books = () =>{
  let sql = "select * from book";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    return console.log(result);
  });
}

fs.readFile("./index.html", function(err, html) {
  if (err) {
    throw err;
  }
  let book_name = "";
  let author_name = "";
  http
    .createServer(function(req, res) {
      if (req.url == "/create-book" && req.method.toLowerCase() == "post") {
        book_name = "ten sach";
        author_name = "tac gia";
        console.log("name la: " + book_name);
        console.log("author:" + author_name);

        // con.connect(function(err) {
        //   if (err) throw err;
        //   console.log("Connected!");
        // });
        // insert_db(book_name, author_name);
        return;
      }
      if (req.url == "/books") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("abc");
      }
      else{
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html);
      }
      // show a file upload form
      
    })
    .listen(8080);
});
