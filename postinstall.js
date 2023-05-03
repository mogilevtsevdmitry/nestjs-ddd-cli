const fs = require('fs');
const path = require('path');

const targetPackageJsonPath = path.join(process.cwd(), 'package.json');
const targetPackageJson = require(targetPackageJsonPath);

const newScriptName = 'generate:domain';
const newScriptCommand = 'generate-domain';

if (!targetPackageJson.scripts) {
    targetPackageJson.scripts = {};
}

if (!targetPackageJson.scripts[newScriptName]) {
    targetPackageJson.scripts[newScriptName] = newScriptCommand;
    fs.writeFileSync(targetPackageJsonPath, JSON.stringify(targetPackageJson, null, 2), 'utf-8');
    console.log(`"${newScriptName}" script has been added to package.json`);
} else {
    console.log(`"${newScriptName}" script already exists in package.json`);
}
