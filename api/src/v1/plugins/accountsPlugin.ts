import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';
import AccountsService from '../services/AccountsService';

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/accounts',
    register: async function (server: Server) {
      server.route([
        {
          method: 'POST',
          path: '/v1/accounts/newAccount',
          options: {
            description: 'Creates an account for the user',
            notes: 'Account in blockchain',
            tags: ['api'],
            
            handler: createAccountHandler
          }
        },
        {
          method: 'GET',
          path: '/v1/accounts/{address}/tokens',
          options: {
            description: 'Account Balance',
            notes: 'Shows the balance of the account',
            tags: ['api'],
            validate: {
              params: Joi.object({
                address: Joi.string()
                  .required()
                  .description('Address of account'),
              }),
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
          path: '/v1/accounts/{address}/checkRole',
          options: {
            description: 'Checks address role',
            notes: 'Address and role should be of string type',
            tags: ['api'],
            validate: {
              params: Joi.object({
                address: Joi.string()
                  .required()
                  .description('Address of account')
              }),
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
          path: '/v1/accounts/{address}/checkWhitelist',
          options: {
            description: 'Checks address whitelist status',
            notes: 'Address should be of string type',
            tags: ['api'],
            validate: {
              params: Joi.object({
                address: Joi.string()
                  .required()
                  .description('Address of account')
              })
            },
            handler: isWhitelistedHandler
          }
        }
      ]);
    },
  };


  const accountsService = new AccountsService();

  const createAccountHandler = async (request: Request, h: ResponseToolkit) => {
    const accountData = await accountsService.createAccount();

    return h.response(accountData).code(200);
  }

  const getBalanceHandler = async (request: Request, h: ResponseToolkit) => {
    const {address} = request.params;
    const {token_id} = request.query;
    const balance = await accountsService.getBalance(token_id, address);

    return h.response({address, token_id, balance}).code(200);
  }

  const hasRoleHandler = async (request: Request, h: ResponseToolkit) => {
    const {address} = request.params;
    const {role} = request.query;
    const hasRole = await accountsService.hasRole(role as string, address);

    return h.response({address, role, hasRole});
  }

  const isWhitelistedHandler = async (request: Request, h: ResponseToolkit) => {
    const {address} =  request.params;
    const isWhitelisted = await accountsService.isWhitelisted(address);

    return h.response({address, isWhitelisted});
  }


  
  export default {
    plugin,
    options
  } as PluginObject;