// As sequelize doensn't support typescript as it supports only javascript so to convert typescript
//  to javascript we need to use ts-node
require('ts-node/register');
const config = require('./db.config');
module.exports = config;