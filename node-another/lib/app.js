"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const r = require("./router");
http.createServer(r.route).listen(3000);
