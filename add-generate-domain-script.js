const fs = require('fs');

const packageJson = require('./package.json');

const generateDomainScript = 'generate-domain';

if (!packageJson.scripts) {
    packageJson.scripts = {};
}

if (!packageJson.scripts['generate:domain']) {
    packageJson.scripts['generate:domain'] = generateDomainScript;
}

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
