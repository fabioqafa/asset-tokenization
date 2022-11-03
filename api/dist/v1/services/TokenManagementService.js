"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1_ContractProvider_1 = require("./1.ContractProvider");
const ExeTrnx_1 = __importDefault(require("../utils/ExeTrnx"));
class TokenManagementService {
    issueTokens = async (id, amount, signerAddress, signerPrivateKey) => {
        try {
            const tx = await _1_ContractProvider_1.contract.methods.mint(id, amount, "0x00");
            const transactionReceipt = await (0, ExeTrnx_1.default)(tx, _1_ContractProvider_1.web3, _1_ContractProvider_1.contract, _1_ContractProvider_1.networkId, signerAddress, signerPrivateKey);
            return transactionReceipt;
        }
        catch (error) {
            console.error(error);
            throw { error: "Smart contract error" };
        }
    };
    transferTokens = async (from, to, id, amount, signerAddress, signerPrivateKey) => {
        try {
            const tx = await _1_ContractProvider_1.contract.methods.safeTransferFrom(from, to, id, amount, "0x00");
            const transactionReceipt = await (0, ExeTrnx_1.default)(tx, _1_ContractProvider_1.web3, _1_ContractProvider_1.contract, _1_ContractProvider_1.networkId, signerAddress, signerPrivateKey);
            return transactionReceipt;
        }
        catch (error) {
            console.error(error);
            throw { error: "Smart contract error" };
        }
    };
}
exports.default = TokenManagementService;
//# sourceMappingURL=TokenManagementService.js.map