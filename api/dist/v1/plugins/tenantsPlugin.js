"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TenantsService_1 = __importDefault(require("../services/TenantsService"));
const joi_1 = __importDefault(require("joi"));
const AssetsManagementService_1 = __importDefault(require("../services/AssetsManagementService"));
const options = {
    route: true,
};
const plugin = {
    name: 'app/v1/tenants',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/tenants',
                options: {
                    description: 'Returns all tenants',
                    notes: 'notes for later',
                    tags: ['api'],
                    handler: getAllTenantsHandler
                }
            },
            {
                method: 'GET',
                path: '/tenants/tenantsAssets',
                options: {
                    description: 'Returns all assets of a tenant',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        query: joi_1.default.object({
                            tenantId: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: getTenantsAssets
                }
            },
            {
                method: 'GET',
                path: '/tenants/tenant',
                options: {
                    description: 'Returns one tenant by its name',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        query: joi_1.default.object({
                            name: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: getTenantHandler
                }
            },
            {
                method: 'POST',
                path: '/tenants',
                options: {
                    auth: false,
                    description: 'Creates a new tenant',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        payload: joi_1.default.object({
                            name: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: createTenantHandler
                }
            },
        ]);
    },
};
const tenantService = new TenantsService_1.default();
const assetsManagementService = new AssetsManagementService_1.default();
const getAllTenantsHandler = async (request, h) => {
    const tenants = await tenantService.getAllTenants();
    return h.response({ tenants }).code(200);
};
const getTenantHandler = async (request, h) => {
    const { name } = request.query;
    const tenant = await tenantService.getTenant(name);
    return h.response({ tenant }).code(200);
};
const getTenantsAssets = async (request, h) => {
    const { tenantId } = request.query;
    const assets = await assetsManagementService.getTenantsAssets(tenantId);
    return h.response({ assets }).code(200);
};
const createTenantHandler = async (request, h) => {
    const { name } = request.payload;
    const newTenant = await tenantService.createNewTenant(name);
    return h.response({ newTenant }).code(201);
};
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=tenantsPlugin.js.map