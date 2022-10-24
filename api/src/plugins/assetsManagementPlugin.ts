import AssetsManagementService from "../services/AssetsManagementService";
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from "joi";

const options = {
    route: true
  };

const plugin = {
    name: 'app/assets',
    register: async function (server: Server) {
      server.route([
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
          method: 'GET',
          path: '/assets/{id}/exists',
          options: {
            description: 'Checks if asset exists or not',
            notes: 'notes for later',
            tags: ['api'],
            validate : {
                params : Joi.object({
                    id : Joi.number()
                        .required()
                })
            },
            handler: existsHandler
          }
        },
      ]);
    },
  };

const assetsManagementService = new AssetsManagementService();

const totalSupplyHandler = async (request: Request, h: ResponseToolkit) => {
    const {id} = request.params;
    const result = await assetsManagementService.totalSupply(id);

    return h.response({id, result});
}

const existsHandler = async (request : Request, h : ResponseToolkit) => {
    const {id} = request.params;
    const result = await assetsManagementService.exists(id);

    return h.response({id, result})
}

export default {
    plugin,
    options
} as PluginObject;