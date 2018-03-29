const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build'); // Cross-Compatibility path-building
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');

const source = fs.readFileSync(campaignPath, 'utf-8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // Creating build dir if does not exist

for (const contract in output)
{
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract}.json`.replace(':', '')), output[contract]);
}
console.log('Contracts have been compiled');
