"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExeTrnx_1 = __importDefault(require("../utils/ExeTrnx"));
const _1_ContractProvider_1 = require("./1.ContractProvider");
class Whitelist {
    addToWhitelist = async (address, signerAddress, signerPrivateKey) => {
        try {
            const tx = await _1_ContractProvider_1.contract.methods.addToWhitelist(address);
            const transactionReceipt = await (0, ExeTrnx_1.default)(tx, _1_ContractProvider_1.web3, _1_ContractProvider_1.contract, _1_ContractProvider_1.networkId, signerAddress, signerPrivateKey);
            return transactionReceipt;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    removeFromWhitelist = async (address, signerAddress, signerPrivateKey) => {
        try {
            const tx = await _1_ContractProvider_1.contract.methods.removeFromWhitelist(address);
            const transactionReceipt = await (0, ExeTrnx_1.default)(tx, _1_ContractProvider_1.web3, _1_ContractProvider_1.contract, _1_ContractProvider_1.networkId, signerAddress, signerPrivateKey);
            return transactionReceipt;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
}
exports.default = Whitelist;
//# sourceMappingURL=WhitelistsService.js.map