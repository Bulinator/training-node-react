// keys.js - figure out what set of credential to return
if (process.env.NODE_ENV === 'production') {
  // return the prod set of keys
  module.exports = require('./prod');
} else {
  // development environment
  module.exports = require('./dev');
}
