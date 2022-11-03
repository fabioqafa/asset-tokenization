"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssetsManagementService_1 = __importDefault(require("../services/AssetsManagementService"));
const joi_1 = __importDefault(require("joi"));
const Users_AssetsService_1 = __importDefault(require("../services/Users_AssetsService"));
const TokenManagementService_1 = __importDefault(require("../services/TokenManagementService"));
const AccountKeysService_1 = __importDefault(require("../services/AccountKeysService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/assets',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/assets/allAssets',
                options: {
                    description: 'Returns all assets',
                    notes: 'notes for later',
                    tags: ['api'],
                    handler: getAllAssetsHandler
                }
            },
            {
                method: 'GET',
                path: '/assets/tenantsAssets',
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
                path: '/assets/{id}/totalSupply',
                options: {
                    description: 'Returns the total supply of asset with id {id}',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        params: joi_1.default.object({
                            id: joi_1.default.number()
                                .required()
                        })
                    },
                    handler: totalSupplyHandler
                }
            },
            {
                method: 'POST',
                path: '/assets/newAsset',
                options: {
                    description: 'Creates a new asset',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        payload: joi_1.default.object({
                            tokenSymbol: joi_1.default.string()
                                .required(),
                            address: joi_1.default.string()
                                .required(),
                            flatnr: joi_1.default.number()
                                .required(),
                            floor: joi_1.default.number()
                                .required(),
                            aptnr: joi_1.default.number()
                                .required(),
                            tenantId: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: createAssetHandler
                }
            },
            // {
            //   method: 'POST',
            //   path: '/assets/addShareholders',
            //   options: {
            //     description: 'Adds shareholder to an asset',
            //     notes: 'notes for later',
            //     tags: ['api'],
            //     validate : {
            //         payload : Joi.object({
            //             userId : Joi.string()
            //                 .required(),
            //             assetId : Joi.string()
            //                 .required()
            //         })
            //     },
            //     handler: addShareholdersHandler
            //   }
            // },
            {
                method: 'GET',
                path: '/assets/owners',
                options: {
                    description: 'Returns the owners of the asset',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        query: joi_1.default.object({
                            tokenId: joi_1.default.number()
                                .required(),
                        })
                    },
                    handler: getAssetOwnersHandler
                }
            },
            // {
            //   method: 'GET',
            //   path: '/assets/{id}/exists',
            //   options: {
            //     description: 'Checks if asset exists or not',
            //     notes: 'notes for later',
            //     tags: ['api'],
            //     validate : {
            //         params : Joi.object({
            //             id : Joi.number()
            //                 .required()
            //         })
            //     },
            //     handler: existsHandler
            //   }
            // },
        ]);
    },
};
const assetsManagementService = new AssetsManagementService_1.default();
const tokenManagementService = new TokenManagementService_1.default();
const users_assets_service = new Users_AssetsService_1.default();
const accountKeysService = new AccountKeysService_1.default();
const getAllAssetsHandler = async (request, h) => {
    const assets = await assetsManagementService.getAllAssets();
    return h.response({ assets }).code(200);
};
const getTenantsAssets = async (request, h) => {
    const { tenantId } = request.query;
    const assets = await assetsManagementService.getTenantsAssets(tenantId);
    return h.response({ assets }).code(200);
};
const totalSupplyHandler = async (request, h) => {
    const { id } = request.params;
    const totalSupply = await assetsManagementService.totalSupply(id);
    if (totalSupply > 0) {
        return h.response({ id, totalSupply }).code(200);
    }
    else {
        return h.response().code(404);
    }
};
const createAssetHandler = async (request, h) => {
    const { tokenSymbol, address, flatnr, floor, aptnr, tenantId } = request.payload;
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    const asset = await assetsManagementService.createAsset(tokenSymbol, address, flatnr, floor, aptnr, tenantId);
    const transactionReceipt = await tokenManagementService.issueTokens(asset.tokenId, 10000, signerAddress, signerPrivateKey);
    return h.response({ asset, transactionReceipt }).code(201);
};
const getAssetOwnersHandler = async (request, h) => {
    const { tokenId } = request.query;
    const owners = await users_assets_service.getAssetOwners(tokenId);
    return h.response({ owners }).code(200);
};
const addShareholdersHandler = async (request, h) => {
    const { userId, assetId } = request.payload;
    const result = await users_assets_service.addShareholders(userId, assetId);
    return h.response({ result }).code(200);
};
// const existsHandler = async (request : Request, h : ResponseToolkit) => {
//     const {id} = request.params;
//     const result = await assetsManagementService.exists(id);
//     return h.response({id, result})
// }
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=assetsManagementPlugin.js.map