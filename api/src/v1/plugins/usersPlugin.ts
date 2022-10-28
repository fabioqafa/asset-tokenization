import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';
import UsersService from '../services/UsersService';
import Users_Assets from '../services/Users_AssetsService';

const options = {
    route: true
  };

  const plugin = {
    name: 'app/users',
    register: async function (server: Server) {
      server.route([
        {
          method: 'GET',
          path: '/v1/users/allUsers',
          options: {
            description: 'Returns all users of the platform',
            notes: 'notes for later',
            tags: ['api'],
            
            handler: getAllUsersHandler
          }
        },
        {
          method: 'GET',
          path: '/v1/users/allUsersTenant', //?tenantId = {tenantId}
          options: {
            description: 'Returns all users of the platform',
            notes: 'notes for later',
            tags: ['api'],
            validate : {
              query : Joi.object({
                tenantId : Joi.string()
                    .required()
              })
            },
            handler: getUsersByTenantIdHandler
          }
        },
        {
          method: 'GET',
          path: '/v1/users/user', //?email = {email}
          options: {
            description: 'Returns all users of the platform',
            notes: 'notes for later',
            tags: ['api'],
            validate : {
              query : Joi.object({
                email : Joi.string()
                    .required()
              })
            },
            handler: getUserHandler
          }
        },
        {
          method: 'GET',
          path: '/v1/users/assets', //?username = {username}
          options: {
            description: 'Returns all assets where user is shareholder',
            notes: 'notes for later',
            tags: ['api'],
            validate : {
              query : Joi.object({
                username : Joi.string()
                    .required()
              })
            },
            handler: getOwnersAssetHandler
          }
        },
        {
          method: 'POST',
          path: '/v1/users/signUp',
          options: {
            description: 'Registers an user for the first time',
            notes: 'notes for later',
            tags: ['api'],
            validate: {
              payload: Joi.object({
                email: Joi.string()
                  .email()
                  .required(),
                username : Joi.string()
                    .required(),
                password: Joi.string()
                    .required(),
                tenantId : Joi.string()
                    .required()
              })
            },
            handler: signUpHandler
          }
        },
      ]);
    },
  };

  const userService = new UsersService();
  const users_assets_service = new Users_Assets();

  const getAllUsersHandler = async (request : Request, h : ResponseToolkit) => {
    const users = await userService.getAllUsers();

    return h.response({users}).code(200);
  }

  const getUsersByTenantIdHandler = async (request : Request, h : ResponseToolkit) => {
    const { tenantId } = request.query as any;
    const users = await userService.getUsersByTenantId(tenantId as string);

    return h.response({users}).code(200);
  }

  const getUserHandler = async (request : Request, h : ResponseToolkit) => {
    const { email } = request.query;
    const user = await userService.getUser(email as string);

    return h.response({user}).code(200);
  }

  const signUpHandler = async (request: Request, h: ResponseToolkit) => {
    const {email, username, password, tenantId} = request.payload as any;
    const user = await userService.signUp(email as string, username as string, password as string, tenantId as string);

    return h.response({user}).code(201);
  }

  const getOwnersAssetHandler = async (request: Request, h: ResponseToolkit) => {
    const { username } = request.query;
    const assets = await users_assets_service.getOwnersAsset(username);

    return h.response({assets}).code(200);
  }


export default {
    plugin,
    options
} as PluginObject;