'use strict'

let l = (method, str) => {
  if (!console || !console[method]) return;
  console[method](`[todomvc++] ${str}`);
};

let log = (str) => l('log', str);
log.error = (str) => l('error', str);

module.exports = log;