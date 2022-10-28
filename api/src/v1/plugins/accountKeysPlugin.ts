import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';
import AccountKeysService from '../services/AccountKeysService';

const options = {
    route: true
  };

  const plugin = {
    name: 'app/accountKeys',
    register: async function (server: Server) {
      server.route([
        {
            method: 'GET',
            path: '/v1/accountKeys/allKeys',
            options: {
              description: 'Returns all the keys',
              notes: 'notes for later',
              tags: ['api'],
  
              handler: getAllAccountKeysHandler
            }
          },
          {
            method: 'GET',
            path: '/v1/accountKeys/userKeys', //?username = {username}
            options: {
              description: 'Returns user keys',
              notes: 'notes for later',
              tags: ['api'],
              validate : {
                query : Joi.object({
                  username : Joi.string()
                      .required()
                })
              },
  
              handler: getUserKeysHandler
            }
          },
          {
            method: 'POST',
            path: '/v1/accountKeys/newKeys',
            options: {
              description: 'Creates new keys',
              notes: 'notes for later',
              tags: ['api'],
              validate : {
                payload : Joi.object({
                  publicKey : Joi.string()
                      .required(),
                  privateKey : Joi.string()
                      .required(),
                  userId : Joi.string()
                      .required()
                })
              },
  
              handler: createAccountKeyHandler
            }
          },
      ])
    }
  }

  const accountKeysService = new AccountKeysService();

  const getAllAccountKeysHandler = async (request: Request, h: ResponseToolkit) => {
    const keys = await accountKeysService.getAllAccountKeys();

    return h.response({keys}).code(200);
  }

  const getUserKeysHandler = async (request: Request, h: ResponseToolkit) => {
    const { username } = request.query;
    const keys = await accountKeysService.getUserAccountKeys(username as string);

    return h.response({keys}).code(200);
  }

  const createAccountKeyHandler = async (request: Request, h: ResponseToolkit) => {
    const { publicKey, privateKey, userId } = request.payload as any;
    const newKeys = await accountKeysService.createAccountKey(publicKey as string, privateKey as string, userId as string);

    return h.response({newKeys}).code(200);
  }

  export default {
    options,
    plugin
  } as PluginObject;