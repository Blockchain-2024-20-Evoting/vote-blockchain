module.exports = {
  networks: {
    development: {
      host: "206.189.238.162",
      port: 8550,
      network_id: "5777",
      gas: 6721975,
      gasPrice: 20000000000,
    },
  },

  mocha: {},

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19",
    },
  },
};
