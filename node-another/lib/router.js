"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url"); //https://nodejs.org/api/url.html
const fs = require("fs");
const path = require("path");
var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif'
};
var _url;
function route(req, res) {
    var dir = "./public";
    _url = url.parse(req.url);
    var pathName = _url.pathname;
    if (pathName === "/")
        pathName = dir + "/index.html";
    else
        pathName = dir + pathName;
    console.log("request on: " + pathName);
    fs.readFile(pathName, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end("NOT FOUND");
        }
        res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(pathName)] });
        res.end(data);
    });
}
exports.route = route;
//exports.route = route;
/*
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
