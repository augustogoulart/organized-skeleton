/**
 * Build Project to ASM.js
 * @author André Ferreira <andrehrf@gmail.com>
 */

'use strict';

const app = require("organized");
app.build([`${__dirname}/controllers/*.js`], `${__dirname}/build`);