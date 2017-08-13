import http = require("http");
import url = require("url");
import fs = require("fs");
import r = require("./router");

http.createServer(r.route).listen(3000);
