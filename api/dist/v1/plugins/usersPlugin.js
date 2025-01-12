"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const UsersService_1 = __importDefault(require("../services/UsersService"));
const Users_AssetsService_1 = __importDefault(require("../services/Users_AssetsService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/v1/users',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/users',
                options: {
                    description: 'Returns all users of the platform',
                    notes: 'notes for later',
                    tags: ['api'],
                    handler: getAllUsersHandler
                }
            },
            {
                method: 'GET',
                path: '/users/allUsersTenant',
                options: {
                    description: 'Returns all users of a tenant',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        query: joi_1.default.object({
                            tenantId: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: getUsersByTenantIdHandler
                }
            },
            {
                method: 'GET',
                path: '/users/user',
                options: {
                    description: 'Returns user by its email',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        query: joi_1.default.object({
                            username: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: getUserHandler
                }
            },
            {
                method: 'GET',
                path: '/users/assets',
                options: {
                    description: 'Shows all assets where user is a shareholder',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        query: joi_1.default.object({
                            username: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: getOwnersAssetHandler
                }
            },
            {
                method: 'POST',
                path: '/users/signup',
                options: {
                    auth: false,
                    description: 'Registers an user for the first time',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        payload: joi_1.default.object({
                            email: joi_1.default.string()
                                .email()
                                .required(),
                            username: joi_1.default.string()
                                .required(),
                            password: joi_1.default.string()
                                .required(),
                            tenantId: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: signUpHandler
                }
            },
            {
                method: 'POST',
                path: '/users/login',
                options: {
                    auth: false,
                    description: 'User authentication',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        payload: joi_1.default.object({
                            username: joi_1.default.string()
                                .required(),
                            password: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: logInHandler
                }
            },
        ]);
    },
};
const usersService = new UsersService_1.default();
const users_assets_service = new Users_AssetsService_1.default();
const getAllUsersHandler = async (request, h) => {
    const users = await usersService.getAllUsers();
    return h.response({ users }).code(200);
};
const getUsersByTenantIdHandler = async (request, h) => {
    const { tenantId } = request.query;
    const users = await usersService.getUsersByTenantId(tenantId);
    return h.response({ users }).code(200);
};
const getUserHandler = async (request, h) => {
    const { username } = request.query;
    const user = await usersService.getUser(username);
    return h.response({ user }).code(200);
};
const signUpHandler = async (request, h) => {
    const { email, username, password, tenantId } = request.payload;
    const user = await usersService.signUp(email, username, password, tenantId);
    return h.response({ user }).code(201);
};
const getOwnersAssetHandler = async (request, h) => {
    const { username } = request.query;
    const assets = await users_assets_service.getOwnersAsset(username);
    return h.response({ assets }).code(200);
};
const logInHandler = async (request, h) => {
    if (request.pre.apiVersion == 1) {
        const { username, password } = request.payload;
        const token = await usersService.logIn(username, password);
        return h.response({ token }).code(200);
    }
    else if (request.pre.apiVersion == 2) {
        return "Ok";
    }
    else {
        throw console.error("Bad version");
    }
};
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=usersPlugin.js.map