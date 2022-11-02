import AssetsManagementService from "../services/AssetsManagementService";
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from "joi";
import Users_Assets from "../services/Users_AssetsService";

const options = {
    route: true
  };

const plugin = {
    name: 'app/assets',
    register: async function (server: Server) {
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
          path: '/assets/tenantsAssets', //?tenantId = {tenantId}
          options: {
            description: 'Returns all assets of a tenant',
            notes: 'notes for later',
            tags: ['api'],
            validate : {
              query : Joi.object({
                tenantId : Joi.string()
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
            validate : {
                params : Joi.object({
                    id : Joi.number()
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
            validate : {
                payload : Joi.object({
                    tokenSymbol : Joi.string()
                        .required(),
                    address : Joi.string()
                        .required(),
                    flatnr : Joi.number()
                        .required(),
                    floor : Joi.number()
                        .required(),
                    aptnr : Joi.number()
                        .required(),
                    tenantId : Joi.string()
                        .required()
                })
            },
            handler: createAssetHandler
          }
        },
        {
          method: 'POST',
          path: '/assets/addShareholders',
          options: {
            description: 'Adds shareholder to an asset',
            notes: 'notes for later',
            tags: ['api'],
            validate : {
                payload : Joi.object({
                    userId : Joi.string()
                        .required(),
                    assetId : Joi.string()
                        .required()
                })
            },
            handler: addShareholdersHandler
          }
        },
        {
          method: 'GET',
          path: '/assets/owners', //?tokenId = {tokenId}
          options: {
            description: 'Returns the owners of the asset',
            notes: 'notes for later',
            tags: ['api'],
            validate : {
                query : Joi.object({
                    tokenId : Joi.number()
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

const assetsManagementService = new AssetsManagementService();
const users_assets_service = new Users_Assets();

const getAllAssetsHandler = async (request : Request, h : ResponseToolkit) => {
  const assets = await assetsManagementService.getAllAssets();

  return h.response({assets}).code(200);
}

const getTenantsAssets = async (request : Request, h : ResponseToolkit) => {
  const { tenantId } = request.query;
  const assets = await assetsManagementService.getTenantsAssets(tenantId);

  return h.response({assets}).code(200);
}

const totalSupplyHandler = async (request: Request, h: ResponseToolkit) => {
    const {id} = request.params;
    const totalSupply = await assetsManagementService.totalSupply(id);
    if (totalSupply > 0)
      {return h.response({id, totalSupply}).code(200);}
    else 
      {return h.response().code(404);}
    
}

const createAssetHandler = async (request : Request, h : ResponseToolkit) => {
  const {tokenSymbol, address, flatnr, floor, aptnr, tenantId} = request.payload as any;
  const asset = await assetsManagementService.createAsset(tokenSymbol as string, address as string, flatnr as number, floor as number, aptnr as number, tenantId as string);

  return h.response({asset}).code(201);
}

const getAssetOwnersHandler = async (request : Request, h : ResponseToolkit) => {
  const { tokenId } = request.query as any;
  const owners = await users_assets_service.getAssetOwners(tokenId);

  return h.response({owners}).code(200);
}

const addShareholdersHandler = async (request : Request, h : ResponseToolkit) => {
  const { userId, assetId } = request.payload as any;
  const result = await users_assets_service.addShareholders(userId, assetId);

  return h.response({result}).code(200);
}

// const existsHandler = async (request : Request, h : ResponseToolkit) => {
//     const {id} = request.params;
//     const result = await assetsManagementService.exists(id);

//     return h.response({id, result})
// }

export default {
    plugin,
    options
} as PluginObject;