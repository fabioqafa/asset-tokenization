"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1_ContractProvider_1 = require("./1.ContractProvider");
const ExeTrnx_1 = __importDefault(require("../utils/ExeTrnx"));
class SmartContractData {
    getDecimals = async () => {
        try {
            const decimals = await _1_ContractProvider_1.contract.methods.getDecimals().call();
            return decimals;
        }
        catch (error) {
            console.error(error);
            throw { error: "Smart contract error" };
        }
    };
    pause = async (signerAddress, signerPrivateKey) => {
        try {
            const tx = await _1_ContractProvider_1.contract.methods.pause();
            const transactionReceipt = await (0, ExeTrnx_1.default)(tx, _1_ContractProvider_1.web3, _1_ContractProvider_1.contract, _1_ContractProvider_1.networkId, signerAddress, signerPrivateKey);
            return transactionReceipt;
        }
        catch (error) {
            console.error(error);
            throw { error: "Smart contract error" };
        }
    };
    unpause = async (signerAddress, signerPrivateKey) => {
        try {
            const tx = await _1_ContractProvider_1.contract.methods.unpause();
            const transactionReceipt = await (0, ExeTrnx_1.default)(tx, _1_ContractProvider_1.web3, _1_ContractProvider_1.contract, _1_ContractProvider_1.networkId, signerAddress, signerPrivateKey);
            return transactionReceipt;
        }
        catch (error) {
            console.error(error);
            throw { error: "Smart contract error" };
        }
    };
    isPaused = async () => {
        try {
            const result = await _1_ContractProvider_1.contract.methods.paused().call();
            return result;
        }
        catch (error) {
            console.error(error);
            throw { error: "Smart contract error" };
        }
    };
}
exports.default = SmartContractData;
//# sourceMappingURL=SmartContractService.js.map