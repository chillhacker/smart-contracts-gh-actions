require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  plugins: ["solidity-coverage"],
  coverage: {
    reporter: ["text-summary", "lcov", "html"], // Add `text-summary` for console and file output
  },
};
