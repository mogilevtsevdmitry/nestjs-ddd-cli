// postinstall.js
const fs = require('fs');

const packageJson = require('./package.json');
packageJson.scripts['generate:domain'] = 'generate-domain';
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
