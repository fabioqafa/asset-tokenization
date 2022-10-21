import RolesService from "../services/RolesService";
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/roles',
    register: async function (server: Server) {
      server.route([
        {
          method: 'GET',
          path: '/roles/minterRole',
          options: {
            description: 'Returns the role of the minter',
            notes: 'Role is in bytes64 format',
            tags: ['api'],
            
            handler: getMinterRoleHandler
          }
        },
        {
          method: 'GET',
          path: '/roles/pauserRole',
          options: {
            description: 'Returns the role of the pauser',
            notes: 'Role is in bytes64 format',
            tags: ['api'],
            
            handler: getPauserRoleHandler
          }
        },
        {
          method: 'GET',
          path: '/roles/adminRole',
          options: {
            description: 'Returns the role of the admin of the smart contract',
            notes: 'Role is in bytes64 format',
            tags: ['api'],
            
            handler: getAdminRoleHandler
          }
        },
      ]);
    },
  };

const rolesService = new RolesService();

const getMinterRoleHandler = async (request: Request, h: ResponseToolkit) => {
    const minterRole = await rolesService.getMinterRole();

    return h.response({"Minter Role" : minterRole});
}

const getPauserRoleHandler = async (request: Request, h: ResponseToolkit) => {
    const pauserRole = await rolesService.getPauserRole();

    return h.response({"Pauser Role" : pauserRole});
}

const getAdminRoleHandler = async (request: Request, h: ResponseToolkit) => {
    const defaultAdminRole = await rolesService.getAdminRole();

    return h.response({"Admin Role" : defaultAdminRole});
}

export default {
    plugin,
    options
} as PluginObject;