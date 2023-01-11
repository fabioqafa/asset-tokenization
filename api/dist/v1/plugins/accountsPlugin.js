"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const AccountsService_1 = __importDefault(require("../services/AccountsService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/v1/accounts',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/accounts/{address}/tokens',
                options: {
                    description: 'Account balance',
                    notes: 'Shows the balance of the account',
                    tags: ['api'],
                    validate: {
                        params: joi_1.default.object({
                            address: joi_1.default.string()
                                .required()
                                .description('Address of account'),
                        }),
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
                path: '/accounts/{address}/checkRole',
                options: {
                    description: 'Checks address role',
                    notes: 'Address and role should be of string type',
                    tags: ['api'],
                    validate: {
                        params: joi_1.default.object({
                            address: joi_1.default.string()
                                .required()
                                .description('Address of account')
                        }),
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
                path: '/accounts/{address}/checkWhitelist',
                options: {
                    description: 'Checks address whitelist status',
                    notes: 'Address should be of string type',
                    tags: ['api'],
                    validate: {
                        params: joi_1.default.object({
                            address: joi_1.default.string()
                                .required()
                                .description('Address of account')
                        })
                    },
                    handler: isWhitelistedHandler
                }
            },
            {
                method: 'POST',
                path: '/accounts',
                options: {
                    description: 'Creates an account for the user',
                    notes: 'Account in blockchain',
                    tags: ['api'],
                    handler: createAccountHandler
                }
            },
        ]);
    },
};
const accountsService = new AccountsService_1.default();
const createAccountHandler = async (request, h) => {
    const account = await accountsService.createAccount();
    return h.response({ account }).code(200);
};
const getBalanceHandler = async (request, h) => {
    const { address } = request.params;
    const { token_id } = request.query;
    const balance = await accountsService.getBalance(token_id, address);
    return h.response({ balanceData: { address, token_id, balance } }).code(200);
};
const hasRoleHandler = async (request, h) => {
    const { address } = request.params;
    const { role } = request.query;
    const hasRole = await accountsService.hasRole(role, address);
    return h.response({ data: { address, role, hasRole } }).code(200);
};
const isWhitelistedHandler = async (request, h) => {
    const { address } = request.params;
    const isWhitelisted = await accountsService.isWhitelisted(address);
    return h.response({ data: { address, isWhitelisted } }).code(200);
};
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=accountsPlugin.js.map