"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
class TenantsService {
    getAllTenants = async () => {
        try {
            const tenants = await server_1.prisma.tenants.findMany();
            return tenants;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    getTenant = async (name) => {
        try {
            const tenant = await server_1.prisma.tenants.findUnique({
                where: {
                    name
                }
            });
            return tenant;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    createNewTenant = async (name) => {
        try {
            const tenant = await server_1.prisma.tenants.create({
                data: {
                    name
                }
            });
            return tenant;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
}
exports.default = TenantsService;
//# sourceMappingURL=TenantsService.js.map