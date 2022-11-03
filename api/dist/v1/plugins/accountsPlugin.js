"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const AccountsService_1 = __importDefault(require("../services/AccountsService"));
const AccountKeysService_1 = __importDefault(require("../services/AccountKeysService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/accounts',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/accounts/tokens',
                options: {
                    description: 'Account Balance',
                    notes: 'Shows the balance of the account',
                    tags: ['api'],
                    validate: {
                        query: joi_1.default.object({
                            token_id: joi_1.default.number()
                                .required()
                                .description('Token id')
                        })
                    },
                    handler: getBalanceHandler
                }
            },
            {
                method: 'GET',
                path: '/accounts/checkRole',
                options: {
                    description: 'Checks address role',
                    notes: 'Address and role should be of string type',
                    tags: ['api'],
                    validate: {
                        query: joi_1.default.object({
                            role: joi_1.default.string()
                                .required()
                                .description('Role on smart contract'),
                        })
                    },
                    handler: hasRoleHandler
                }
            },
            {
                method: 'GET',
                path: '/accounts/checkWhitelist',
                options: {
                    description: 'Checks address whitelist status',
                    notes: 'Address should be of string type',
                    tags: ['api'],
                    handler: isWhitelistedHandler
                }
            },
            // {
            //   method: 'POST',
            //   path: '/accounts/newAccount',
            //   options: {
            //     description: 'Creates an account for the user',
            //     notes: 'Account in blockchain',
            //     tags: ['api'],
            //     handler: createAccountHandler
            //   }
            // },
        ]);
    },
};
const accountsService = new AccountsService_1.default();
const accountKeysService = new AccountKeysService_1.default();
const createAccountHandler = async (request, h) => {
    const accountData = await accountsService.createAccount();
    return h.response(accountData).code(200);
};
const getBalanceHandler = async (request, h) => {
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const address = keys.publicKey;
    const { token_id } = request.query;
    const balance = await accountsService.getBalance(token_id, address);
    return h.response({ address, token_id, balance }).code(200);
};
const hasRoleHandler = async (request, h) => {
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const address = keys.publicKey;
    const { role } = request.query;
    const hasRole = await accountsService.hasRole(role, address);
    return h.response({ address, role, hasRole }).code(200);
};
const isWhitelistedHandler = async (request, h) => {
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const address = keys.publicKey;
    const isWhitelisted = await accountsService.isWhitelisted(address);
    return h.response({ address, isWhitelisted }).code(200);
};
exports.default = {
    plugin,
    options
};
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWlucmVtYXgiLCJwYXNzd29yZCI6IjEyMzQiLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNjY3Mzk2OTg5LCJleHAiOjE2Njc0MDA1ODl9._jBtepGikqV27u519QA0W-D6ntLDUAq35zQ-i8LtfsU
//# sourceMappingURL=accountsPlugin.js.map