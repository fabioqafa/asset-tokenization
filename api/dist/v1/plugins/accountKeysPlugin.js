"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountKeysService_1 = __importDefault(require("../services/AccountKeysService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/accountKeys',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/accountKeys/allKeys',
                options: {
                    description: 'Returns all the keys',
                    notes: 'notes for later',
                    tags: ['api'],
                    handler: getAllAccountKeysHandler
                }
            },
            {
                method: 'GET',
                path: '/accountKeys/userKeys',
                options: {
                    description: 'Returns user keys',
                    notes: 'notes for later',
                    tags: ['api'],
                    handler: getUserKeysHandler
                }
            },
            // {
            //   method: 'POST',
            //   path: '/accountKeys/newKeys',
            //   options: {
            //     description: 'Creates new keys',
            //     notes: 'notes for later',
            //     tags: ['api'],
            //     validate : {
            //       payload : Joi.object({
            //         publicKey : Joi.string()
            //             .required(),
            //         privateKey : Joi.string()
            //             .required(),
            //         userId : Joi.string()
            //             .required()
            //       })
            //     },
            //     handler: createAccountKeyHandler
            //   }
            // },
        ]);
    }
};
const accountKeysService = new AccountKeysService_1.default();
const getAllAccountKeysHandler = async (request, h) => {
    const keys = await accountKeysService.getAllAccountKeys();
    return h.response({ keys }).code(200);
};
const getUserKeysHandler = async (request, h) => {
    const { username } = request.auth.artifacts.decoded;
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