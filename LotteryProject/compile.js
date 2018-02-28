const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Lottery.sol'); // Cross-Compatibility path-building
const contractSource = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(contractSource, 1).contracts[':Lottery']; // Compiling to ABI + Bytecode
