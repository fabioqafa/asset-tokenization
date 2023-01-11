"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1_ContractProvider_1 = require("./1.ContractProvider");
const server_1 = require("../../server");
class AssetsManagementService {
    getAllAssets = async () => {
        try {
            const assets = await server_1.prisma.assets.findMany({
                select: {
                    id: true,
                    tokenId: true,
                    tokenSymbol: true,
                    address: true,
                    flatnr: true,
                    floor: true,
                    aptnr: true,
                    createdAt: true,
                    tenantId: true,
                    tenant: {
                        select: {
                            name: true
                        }
                    }
                }
            });
            return assets;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    getTenantsAssets = async (tenantId) => {
        try {
            const assets = await server_1.prisma.assets.findMany({
                where: {
                    tenantId
                }
            });
            return assets;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    totalSupply = async (id) => {
        try {
            const totalSupply = await _1_ContractProvider_1.contract.methods.totalSupply(id).call();
            return totalSupply;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    exists = async (id) => {
        try {
            const result = await _1_ContractProvider_1.contract.methods.exists(id).call();
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    createAsset = async (tokenSymbol, address, flatnr, floor, aptnr, tenantId) => {
        try {
            const newAsset = await server_1.prisma.assets.create({
                data: {
                    tokenSymbol,
                    address,
                    flatnr,
                    floor,
                    aptnr,
                    tenantId
                }
            });
            return newAsset;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
}
exports.default = AssetsManagementService;
//# sourceMappingURL=AssetsManagementService.js.map