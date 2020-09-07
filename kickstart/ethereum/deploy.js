// const compiledFactory = require('./build/CampaignFactory.json');
const compiledFactory = require('./build/CampaignFactory.json');
const Web3 = require('web3');

// Deploy locally with ganache
const ganache = require('ganache-cli');
const provider = ganache.provider({ port: 8545 })

// // Deploy with Infura (rinkeby)
// const HDWalletProvider = require('truffle-hdwallet-provider');
// const provider = new HDWalletProvider(
//   'call glow acoustic vintage front ring trade assist shuffle mimic volume reject',
//   'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
// );


const web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  // const result = await new web3.eth.Contract(
  //   JSON.parse(compiledFactory.interface)
  // )
  //   .deploy({ data: compiledFactory.bytecode })
  //   .send({ gas: '1000000', from: accounts[0] });

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    // .deploy({ data: '0x' + compiledFactory.bytecode }) // add bytecode
    .deploy({ data: compiledFactory.bytecode }) // add bytecode
    .send({ from: accounts[0], gas: '1000000' }); // remove gas 

  console.log('Contract deployed to', result.options.address);
};
deploy();


