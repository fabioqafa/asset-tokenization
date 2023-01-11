"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssetsManagementService_1 = __importDefault(require("../services/AssetsManagementService"));
const joi_1 = __importDefault(require("joi"));
const Users_AssetsService_1 = __importDefault(require("../services/Users_AssetsService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/v1/assets',
    register: async function (server) {
        server.route([
            {
                method: 'GET',
                path: '/assets',
                options: {
                    description: 'Returns all assets',
                    notes: 'notes for later',
                    tags: ['api'],
                    handler: getAllAssetsHandler
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
                path: '/assets',
                options: {
                    description: 'Adds a new asset to the database',
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
            {
                method: 'POST',
                path: '/assets/newShareholder',
                options: {
                    description: 'Adds shareholder to an asset',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        payload: joi_1.default.object({
                            userId: joi_1.default.string()
                                .required(),
                            assetId: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: addShareholdersHandler
                }
            },
            {
                method: 'DELETE',
                path: '/assets/removeShareholder',
                options: {
                    description: 'Removes a shareholder from an asset',
                    notes: 'notes for later',
                    tags: ['api'],
                    validate: {
                        payload: joi_1.default.object({
                            userId: joi_1.default.string()
                                .required(),
                            assetId: joi_1.default.string()
                                .required()
                        })
                    },
                    handler: removeShareholderHandler
                }
            },
            {
                method: 'GET',
                path: '/assets/shareholders',
                options: {
                    description: 'Retrieves all shareholders of an asset',
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
const users_assets_service = new Users_AssetsService_1.default();
const getAllAssetsHandler = async (request, h) => {
    const assets = await assetsManagementService.getAllAssets();
    return h.response({ assets }).code(200);
};
const totalSupplyHandler = async (request, h) => {
    const { id } = request.params;
    const totalSupply = await assetsManagementService.totalSupply(id);
    if (totalSupply > 0) {
        return h.response({ data: { id, totalSupply } }).code(200);
    }
    else {
        return h.response().code(404);
    }
};
const createAssetHandler = async (request, h) => {
    const { tokenSymbol, address, flatnr, floor, aptnr, tenantId } = request.payload;
    const asset = await assetsManagementService.createAsset(tokenSymbol, address, flatnr, floor, aptnr, tenantId);
    return h.response({ asset }).code(201);
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
const removeShareholderHandler = async (request, h) => {
    const { userId, assetId } = request.payload;
    const result = await users_assets_service.removeShareholder(userId, assetId);
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