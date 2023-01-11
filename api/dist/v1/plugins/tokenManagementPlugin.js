"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenManagementService_1 = __importDefault(require("../services/TokenManagementService"));
const joi_1 = __importDefault(require("joi"));
const options = {
    route: true
};
const plugin = {
    name: 'app/v1/tokenmanagement',
    register: async function (server) {
        server.route([
            {
                method: 'POST',
                path: '/tokenmanagement/issueTokens',
                options: {
                    description: 'Issue tokens',
                    notes: 'notes',
                    tags: ['api'],
                    validate: {
                        payload: joi_1.default.object({
                            id: joi_1.default.number()
                                .required(),
                            amount: joi_1.default.number()
                                .required(),
                            issuerAddress: joi_1.default.string()
                                .required()
                                .description("Signer of the transaction"),
                            issuerPrivateKey: joi_1.default.string()
                                .required()
                                .description("Private key to sign the transaction")
                        })
                    },
                    handler: issueTokensHandler
                }
            },
            {
                method: 'POST',
                path: '/tokenmanagement/transferTokens',
                options: {
                    description: 'Transfer tokens',
                    notes: 'notes',
                    tags: ['api'],
                    validate: {
                        payload: joi_1.default.object({
                            from: joi_1.default.string()
                                .required(),
                            to: joi_1.default.string()
                                .required(),
                            id: joi_1.default.number()
                                .required(),
                            amount: joi_1.default.number()
                                .required(),
                            signerAddress: joi_1.default.string()
                                .required()
                                .description("Signer of the transaction"),
                            signerPrivateKey: joi_1.default.string()
                                .required()
                                .description("Private key to sign the transaction")
                        })
                    },
                    handler: transferTokensHandler
                }
            }
        ]);
    },
};
const tokenManagementService = new TokenManagementService_1.default();
const issueTokensHandler = async (request, h) => {
    try {
        const { id, amount, issuerAddress, issuerPrivateKey } = request.payload;
        const transactionReceipt = await tokenManagementService.issueTokens(id, amount, issuerAddress, issuerPrivateKey);
        return h.response({ transactionReceipt }).code(200);
    }
    catch (error) {
        throw error;
    }
};
const transferTokensHandler = async (request, h) => {
    const { from, to, id, amount, signerAddress, signerPrivateKey } = request.payload;
    const transactionReceipt = await tokenManagementService.transferTokens(from, to, id, amount, signerAddress, signerPrivateKey);
    return h.response({ transactionReceipt }).code(200);
};
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=tokenManagementPlugin.js.map