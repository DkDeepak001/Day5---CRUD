const CRUD = artifacts.require("./CRUD.sol");

module.exports = function(deployer) {
  deployer.deploy(CRUD);
};
