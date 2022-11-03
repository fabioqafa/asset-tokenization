"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1_ContractProvider_1 = require("./1.ContractProvider");
class RolesService {
    getMinterRole = async () => {
        try {
            const minterRole = await _1_ContractProvider_1.contract.methods.MINTER_ROLE().call();
            return minterRole;
        }
        catch (error) {
            console.error(error);
            throw { error: "Smart contract error" };
        }
    };
    getPauserRole = async () => {
        try {
            const pauserRole = await _1_ContractProvider_1.contract.methods.PAUSER_ROLE().call();
            return pauserRole;
        }
        catch (error) {
            console.error(error);
            throw { error: "Smart contract error" };
        }
    };
    getAdminRole = async () => {
        try {
            const defaultAdminRole = await _1_ContractProvider_1.contract.methods.DEFAULT_ADMIN_ROLE().call();
            return defaultAdminRole;
        }
        catch (error) {
            console.error(error);
            throw { error: "Smart contract error" };
        }
    };
}
exports.default = RolesService;
//# sourceMappingURL=RolesService.js.map