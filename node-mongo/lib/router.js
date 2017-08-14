"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url"); //https://nodejs.org/api/url.html
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const mongo = require("mongodb");
const nj = require("nunjucks");
nj.configure("views", { watch: true });
var mongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var mongo_url = "mongodb://localhost:27017/node-mongo";
var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff'
};
var _url;
function route(req, res) {
    var public_dir = "./public";
    _url = url.parse(req.url);
    console.log("request on: " + _url.pathname + " " + req.method);
    if (req.method === "GET") {
        var pathName = _url.pathname;
        if (pathName === "/") {
            //pathName = public_dir + "/index.html"
            mongoClient.connect(mongo_url, (err, db) => {
                db.collection('faggots').find({}).toArray((err, result) => {
                    if (err)
                        throw err;
                    nj.render("index.html", { result }, (err, data) => {
                        if (err)
                            throw err;
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    });
                });
            });
            return;
        }
        else
            pathName = public_dir + pathName;
        fs.readFile(pathName, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end("NOT FOUND");
            }
            res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(pathName)] });
            res.end(data);
        });
    }
    else if (req.method === "POST") {
        var body = '';
        req.on('data', (data) => {
            body += data;
            if (body.length > 5e6) {
                req.connection.destroy();
            }
        });
        req.on('end', () => {
            var post = qs.parse(body);
            console.log(post);
            //add data to our db
            if (_url.pathname == "/") {
                mongoClient.connect(mongo_url, (err, db) => {
                    if (err)
                        throw err;
                    db.collection("faggots").insertOne(post, (err, result) => {
                        if (err)
                            throw err;
                        console.log("1 doc inserted");
                        //console.log(result.ops[0]);
                        db.close();
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(post));
                    });
                });
            }
            else if (_url.pathname == "/del") {
                //TODO: to delete faggot from list
                //console.log("delete");
                mongoClient.connect(mongo_url, (err, db) => {
                    if (err)
                        throw err;
                    post._id = new ObjectID(post._id);
                    db.collection("faggots").deleteOne(post, (err, obj) => {
                        if (err)
                            throw err;
                        console.log("success delited");
                        res.statusCode = 200;
                        res.end();
                    });
                });
            }
        });
    }
}
exports.route = route;
//exports.route = route;
/*

req.method // "GET" 'POST'

// /p/t/s?asd=sss
console.log("href: "+_url.href); ///p/t/s?asd=sss
console.log("search: "+_url.search); // ?asd=sss
console.log("query: "+_url.query); // asd=sss
console.log("pathname: "+_url.pathname); // /p/t/s
console.log("path: "+_url.path); // /p/t/s?asd=sss

res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
//equals to
res.writeHead(200, { 'Content-Type': 'text/plain'});

*/
