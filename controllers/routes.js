/**
 * Setting Express
 * @author André Ferreira <andrehrf@gmail.com>
 */

'use strict';

const express = require("express"),
      compression = require("compression");

module.exports = function(settings, dirname, argv, app){
    app.use(compression());//Gzip
    app.use(express.static("public", {maxage: "2h"}));//Public directory with cache
    app.post("/", function(req, res){ res.sendFile(`${dirname}/public/index.html`); });
};