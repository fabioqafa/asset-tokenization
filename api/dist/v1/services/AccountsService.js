"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1_ContractProvider_1 = require("./1.ContractProvider");
class AccountsService {
    createAccount = async () => {
        try {
            const accountData = _1_ContractProvider_1.web3.eth.accounts.create();
            return accountData;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    getBalance = async (id, address) => {
        try {
            const balance = await _1_ContractProvider_1.contract.methods.balanceOf(address, id).call();
            return balance;
        }
        catch (error) {
            console.error(error);
            throw "Smart contract error";
        }
    };
    hasRole = async (role, address) => {
        try {
            const result = await _1_ContractProvider_1.contract.methods.hasRole(role, address).call();
            return result;
        }
        catch (error) {
            console.error(error);
            throw "Smart contract error";
        }
    };
    isWhitelisted = async (address) => {
        try {
            const result = await _1_ContractProvider_1.contract.methods.isWhitelisted(address).call();
            return result;
        }
        catch (error) {
            console.error(error);
            throw "Smart contract error";
        }
    };
}
exports.default = AccountsService;
//# sourceMappingURL=AccountsService.js.map