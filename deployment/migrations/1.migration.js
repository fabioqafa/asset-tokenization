const ERC1155 = artifacts.require("ERC1155PresetMinterPauserSupply");

module.exports = function (deployer) {
  deployer.deploy(ERC1155,"", 2);
};