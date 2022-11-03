"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RolesService_1 = __importDefault(require("../services/RolesService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/roles',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/roles/minterRole',
                options: {
                    description: 'Returns the role of the minter',
                    notes: 'Role is in bytes64 format',
                    tags: ['api'],
                    handler: getMinterRoleHandler
                }
            },
            {
                method: 'GET',
                path: '/roles/pauserRole',
                options: {
                    description: 'Returns the role of the pauser',
                    notes: 'Role is in bytes64 format',
                    tags: ['api'],
                    handler: getPauserRoleHandler
                }
            },
            {
                method: 'GET',
                path: '/roles/adminRole',
                options: {
                    description: 'Returns the role of the admin of the smart contract',
                    notes: 'Role is in bytes64 format',
                    tags: ['api'],
                    handler: getAdminRoleHandler
                }
            },
        ]);
    },
};
const rolesService = new RolesService_1.default();
const getMinterRoleHandler = async (request, h) => {
    const minterRole = await rolesService.getMinterRole();
    return h.response({ "Minter Role": minterRole }).code(200);
};
const getPauserRoleHandler = async (request, h) => {
    const pauserRole = await rolesService.getPauserRole();
    return h.response({ "Pauser Role": pauserRole }).code(200);
};
const getAdminRoleHandler = async (request, h) => {
    const defaultAdminRole = await rolesService.getAdminRole();
    return h.response({ "Admin Role": defaultAdminRole }).code(200);
};
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=rolesPlugin.js.map