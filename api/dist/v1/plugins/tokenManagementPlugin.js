"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenManagementService_1 = __importDefault(require("../services/TokenManagementService"));
const joi_1 = __importDefault(require("joi"));
const Users_AssetsService_1 = __importDefault(require("../services/Users_AssetsService"));
const AccountKeysService_1 = __importDefault(require("../services/AccountKeysService"));
const UsersService_1 = __importDefault(require("../services/UsersService"));
const AssetsManagementService_1 = __importDefault(require("../services/AssetsManagementService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/tokenmanagement',
    register: async function (server) {
        server.route([
            // {
            //   method: 'POST',
            //   path: '/tokenmanagement/issueTokens',
            //   options: {
            //     description: 'Issue tokens',
            //     notes: 'notes',
            //     tags: ['api'],
            //     validate : {
            //         payload : Joi.object({
            //             id : Joi.number()
            //                 .required(),
            //             amount : Joi.number()
            //                 .required(),
            //             issuerAddress : Joi.string()
            //                 .required()
            //                 .description("Signer of the transaction"),
            //             issuerPrivateKey : Joi.string()
            //                 .required()
            //                 .description("Private key to sign the transaction")
            //         })
            //     },
            //     handler: issueTokensHandler
            //   }
            // },
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
                                .required()
                        })
                    },
                    handler: transferTokensHandler
                }
            }
        ]);
    },
};
const tokenManagementService = new TokenManagementService_1.default();
const accountKeysService = new AccountKeysService_1.default();
const usersService = new UsersService_1.default();
const assetsManagementService = new AssetsManagementService_1.default();
const users_assets_service = new Users_AssetsService_1.default();
const issueTokensHandler = async (request, h) => {
    const { id, amount } = request.payload;
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    const transactionReceipt = await tokenManagementService.issueTokens(id, amount, signerAddress, signerPrivateKey);
    return h.response({ transactionReceipt }).code(200);
};
const transferTokensHandler = async (request, h) => {
    const { from, to, id, amount } = request.payload;
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    const transactionReceipt = await tokenManagementService.transferTokens(from, to, id, amount, signerAddress, signerPrivateKey);
    const { userId } = await accountKeysService.getUserFromKeys(to);
    const asset = await assetsManagementService.getAsset(id);
    await users_assets_service.addShareholders(userId, asset.id);
    return h.response({ transactionReceipt }).code(200);
};
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=tokenManagementPlugin.js.map