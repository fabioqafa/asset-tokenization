import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';
import AccountsService from '../services/AccountsService';
import AccountKeysService from '../services/AccountKeysService';

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/accounts',
    register: async function (server: Server) {
      server.route([
        {
          method: 'GET',
          path: '/accounts/tokens',
          options: {
            description: 'Account Balance',
            notes: 'Shows the balance of the account',
            tags: ['api'],
            validate: {
              query: Joi.object({
                token_id: Joi.number()
                  .required()
                  .description('Token id')
              })
            },
            handler: getBalanceHandler
          }
        },
        {
          method: 'GET',
          path: '/accounts/checkRole',
          options: {
            description: 'Checks address role',
            notes: 'Address and role should be of string type',
            tags: ['api'],
            validate: {
              query : Joi.object({
                role: Joi.string()
                  .required()
                  .description('Role on smart contract'),
              })
            },
            handler: hasRoleHandler
          }
        },
        {
          method: 'GET',
          path: '/accounts/checkWhitelist',
          options: {
            description: 'Checks address whitelist status',
            notes: 'Address should be of string type',
            tags: ['api'],
            
            handler: isWhitelistedHandler
          }
        },
        // {
        //   method: 'POST',
        //   path: '/accounts/newAccount',
        //   options: {
        //     description: 'Creates an account for the user',
        //     notes: 'Account in blockchain',
        //     tags: ['api'],
            
        //     handler: createAccountHandler
        //   }
        // },
      ]);
    },
  };


  const accountsService = new AccountsService();
  const accountKeysService = new AccountKeysService();

  const createAccountHandler = async (request: Request, h: ResponseToolkit) => {
    const accountData = await accountsService.createAccount();

    return h.response(accountData).code(200);
  }

  const getBalanceHandler = async (request: Request, h: ResponseToolkit) => {
    const {username} =  request.auth.artifacts.decoded as any;
    const keys = await accountKeysService.getUserAccountKeys(username as string) as any;
    const address : string = keys.publicKey;
    const {token_id} = request.query;
    const balance = await accountsService.getBalance(token_id, address);

    return h.response({address, token_id, balance}).code(200);
  }

  const hasRoleHandler = async (request: Request, h: ResponseToolkit) => {
    const { username } = request.auth.artifacts.decoded as any;
    const keys = await accountKeysService.getUserAccountKeys(username as string) as any;
    const address : string = keys.publicKey;
    const {role} = request.query;
    const hasRole = await accountsService.hasRole(role as string, address);

    return h.response({address, role, hasRole}).code(200);
  }

  const isWhitelistedHandler = async (request: Request, h: ResponseToolkit) => {
    const {username} =  request.auth.artifacts.decoded as any;
    const keys = await accountKeysService.getUserAccountKeys(username as string) as any;
    const address : string = keys.publicKey;
    const isWhitelisted = await accountsService.isWhitelisted(address);

    return h.response({address, isWhitelisted}).code(200);
  }


  
  export default {
    plugin,
    options
  } as PluginObject;

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWlucmVtYXgiLCJwYXNzd29yZCI6IjEyMzQiLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNjY3Mzk2OTg5LCJleHAiOjE2Njc0MDA1ODl9._jBtepGikqV27u519QA0W-D6ntLDUAq35zQ-i8LtfsU