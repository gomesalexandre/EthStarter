const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // Cross-Compatibility path-building
const contractSource = fs.readFileSync(inboxPath, 'utf8');

solc.compile(contractSource, 1); // Compiling to ABI + Bytecode

