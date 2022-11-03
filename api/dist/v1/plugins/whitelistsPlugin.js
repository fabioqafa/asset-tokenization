"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WhitelistsService_1 = __importDefault(require("../services/WhitelistsService"));
const joi_1 = __importDefault(require("joi"));
const AccountKeysService_1 = __importDefault(require("../services/AccountKeysService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/whitelist',
    register: async function (server) {
        server.route([
            {
                method: 'POST',
                path: '/whitelist/{address}/addToWhitelist',
                options: {
                    description: 'Add an account to whitelist',
                    notes: 'Returns a transaction hash',
                    tags: ['api'],
                    validate: {
                        params: joi_1.default.object({
                            address: joi_1.default.string()
                                .required()
                                .description("Address to be whitelisted")
                        })
                    },
                    handler: addToWhitelistHandler
                }
            },
            {
                method: 'POST',
                path: '/whitelist/{address}/removeFromWhitelist',
                options: {
                    description: 'Remove an account to whitelist',
                    notes: 'Returns a transaction hash',
                    tags: ['api'],
                    validate: {
                        params: joi_1.default.object({
                            address: joi_1.default.string()
                                .required()
                                .description("Address to be whitelisted")
                        })
                    },
                    handler: removeFromWhitelistHandler
                }
            },
        ]);
    },
};
const whitelist = new WhitelistsService_1.default();
const accountKeysService = new AccountKeysService_1.default();
const addToWhitelistHandler = async (request, h) => {
    const { address } = request.params;
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    const transactionReceipt = await whitelist.addToWhitelist(address, signerAddress, signerPrivateKey);
    return h.response({ transactionReceipt }).code(200);
};
const removeFromWhitelistHandler = async (request, h) => {
    const { address } = request.params;
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    const transactionReceipt = await whitelist.removeFromWhitelist(address, signerAddress, signerPrivateKey);
    return h.response({ transactionReceipt }).code(200);
};
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=whitelistsPlugin.js.map