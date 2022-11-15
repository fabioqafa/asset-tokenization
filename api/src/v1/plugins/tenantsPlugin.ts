import TenantsService from "../services/TenantsService";
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from "joi";
import AssetsManagementService from "../services/AssetsManagementService";

const options = {
    route : true,
}

const plugin = {
    name: 'app/tenants',
    register: async function (server: Server) {
      server.route([
        {
          method: 'GET',
          path: '/tenants',
          options: {
            description: 'Returns all tenants',
            notes: 'notes for later',
            tags: ['api'],
            
            handler: getAllTenantsHandler
          }
        },
        {
          method: 'GET',
          path: '/tenants/tenantsAssets', //?tenantId = {tenantId}
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
          path: '/tenants/tenant', //?name = {name}
          options: {
            description: 'Returns one tenant by its name',
            notes: 'notes for later',
            tags: ['api'],
            validate : {
              query : Joi.object({
                name : Joi.string()
                  .required()
              })
            },
            
            handler: getTenantHandler
          }
        },
        {
          method: 'POST',
          path: '/tenants',
          options: {
            description: 'Creates a new tenant',
            notes: 'notes for later',
            tags: ['api'],
            validate : {
              payload : Joi.object({
                name : Joi.string()
                  .required()
              })
            },
            
            handler: createTenantHandler
          }
        },
      ]);
    },
  };

  const tenantService = new TenantsService();
  const assetsManagementService = new AssetsManagementService();

  const getAllTenantsHandler = async (request : Request, h : ResponseToolkit) => {
    const tenants = await tenantService.getAllTenants();

    return h.response({tenants}).code(200);
  }

  const getTenantHandler = async (request : Request, h : ResponseToolkit) => {
    const {name} = request.query;
    const tenant = await tenantService.getTenant(name as string);

    return h.response({tenant}).code(200);
  }

  const getTenantsAssets = async (request : Request, h : ResponseToolkit) => {
    const { tenantId } = request.query;
    const assets = await assetsManagementService.getTenantsAssets(tenantId);

    return h.response({assets}).code(200);
  }

  const createTenantHandler = async (request : Request, h : ResponseToolkit) => {
      const { name } = request.payload as any;
      const newTenant = await tenantService.createNewTenant(name as string);

      return h.response({newTenant}).code(201);
  }

  export default {
    plugin,
    options
} as PluginObject;