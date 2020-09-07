const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const campaignPath = path.resolve(__dirname, 'contracts', 'CrowdFunding.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
console.log(source)
const input = { language: 'Solidity', sources: { 'Campaign.sol': { content: source } } }
const output = solc.compile(JSON.stringify(input));

fs.ensureDirSync(buildPath);


console.log(output);
console.log(buildPath);

for (let contract in output.contracts) {
  console.log(contract)
  // outputJsonSync: Saves json file from compiled contracts json data
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
