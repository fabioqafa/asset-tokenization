import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';
import UsersService from '../services/UsersService';
import Users_Assets from '../services/Users_AssetsService';
import AccountKeysService from '../services/AccountKeysService';
import AccountsService from '../services/AccountsService';

const options = {
    route: true
  };
  const plugin = {
    name: 'app/users',
    register: async function (server: Server) {
      server.route([
        {
          method: 'GET',
          path: '/users/allUsers',
          options: {
            description: 'Returns all users of the platform',
            notes: 'notes for later',
            tags: ['api'],
            
            handler: getAllUsersHandler
          }
        },
        {
          method: 'GET',
          path: '/users/allUsersTenant', //?tenantId = {tenantId}
          options: {
            description: 'Returns all users of a tenant',
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
          path: '/users/user', //?email = {email}
          options: {
            description: 'Returns user',
            notes: 'notes for later',
            tags: ['api'],
            
            handler: getUserHandler
          }
        },
        {
          method: 'GET',
          path: '/users/assets',
          options: {
            description: 'Returns all assets where user is shareholder',
            notes: 'notes for later',
            tags: ['api'],
            
            handler: getUsersAssetHandler
          }
        },
        {
          method: 'POST',
          path: '/users/signup',
          options: {
            auth : false,
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
                // tenantId : Joi.string()
                //     .required()
              })
            },
            handler: signUpHandler
          }
        },
        {
          method: 'POST',
          path: '/users/login',
          options: {
            auth : false,
            description: 'User authentication',
            notes: 'notes for later',
            tags: ['api'],
            validate: {
              payload: Joi.object({
                username : Joi.string()
                    .required(),
                password: Joi.string()
                    .required()
              })
            },
            handler: logInHandler
          }
        },
      ]);
    },
  };

  const usersService = new UsersService();
  const users_assets_service = new Users_Assets();
  const accountsService = new AccountsService();
  const accountKeysService = new AccountKeysService();

  const getAllUsersHandler = async (request : Request, h : ResponseToolkit) => {
    const users = await usersService.getAllUsers();

    return h.response({users}).code(200);
  }

  const getUsersByTenantIdHandler = async (request : Request, h : ResponseToolkit) => {
    const { tenantId } = request.query as any;
    const users = await usersService.getUsersByTenantId(tenantId as string);

    return h.response({users}).code(200);
  }

  const getUserHandler = async (request : Request, h : ResponseToolkit) => {
    const {username} =  request.auth.artifacts.decoded as any;
    const user = await usersService.getUser(username as string);

    return h.response({user}).code(200);
  }

  const signUpHandler = async (request: Request, h: ResponseToolkit) => {
    const { email, username, password } = request.payload as any;
    const user = await usersService.signUp(email as string, username as string, password as string, "775b9238-31b8-4fb9-8b24-366720a1954c" as string);
    const {address, privateKey} = await accountsService.createAccount(); //create the keys in the blockchain

    await accountKeysService.createAccountKey(address, privateKey, user.id); //store the keys in database

    return h.response({user, address, privateKey}).code(201);
  }

  const getUsersAssetHandler = async (request: Request, h: ResponseToolkit) => {
    const {username} =  request.auth.artifacts.decoded as any;
    const assets = await users_assets_service.getOwnersAsset(username);

    return h.response({assets}).code(200);
  }

  const logInHandler = async (request : Request, h : ResponseToolkit) => {
    // if (request.pre.apiVersion == 1) {
      const { username, password } = request.payload as any;
      const token = await usersService.logIn(username, password)
      return h.response(token).code(200);
    //}

    // else if (request.pre.apiVersion == 2) {
    //   return "Ok";
    // }
    
  }


export default {
    plugin,
    options
} as PluginObject;