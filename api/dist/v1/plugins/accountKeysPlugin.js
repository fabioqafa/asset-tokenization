"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const AccountKeysService_1 = __importDefault(require("../services/AccountKeysService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/v1/accountKeys',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/accountKeys',
                options: {
                    description: 'Shows all the keys',
                    notes: 'notes for later',
                    tags: ['api'],
                    handler: getAllAccountKeysHandler
                }
            },
            {
                method: 'GET',
                path: '/accountKeys/user',
                options: {
                    description: 'Shows user keys',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        query: joi_1.default.object({
                            username: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: getUserKeysHandler
                }
            },
            {
                method: 'POST',
                path: '/accountKeys',
                options: {
                    description: 'Saves user blockchain keys in the database',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        payload: joi_1.default.object({
                            publicKey: joi_1.default.string()
                                .required(),
                            privateKey: joi_1.default.string()
                                .required(),
                            userId: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: createAccountKeyHandler
                }
            },
        ]);
    }
};
const accountKeysService = new AccountKeysService_1.default();
const getAllAccountKeysHandler = async (request, h) => {
    const keys = await accountKeysService.getAllAccountKeys();
    return h.response({ keys }).code(200);
};
const getUserKeysHandler = async (request, h) => {
    const { username } = request.query;
    const keys = await accountKeysService.getUserAccountKeys(username);
    return h.response({ keys }).code(200);
};
const createAccountKeyHandler = async (request, h) => {
    const { publicKey, privateKey, userId } = request.payload;
    const newKeys = await accountKeysService.createAccountKey(publicKey, privateKey, userId);
    return h.response({ newKeys }).code(200);
};
exports.default = {
    options,
    plugin
};
//# sourceMappingURL=accountKeysPlugin.js.map