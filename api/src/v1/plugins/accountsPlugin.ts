import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';
import AccountsService from '../services/AccountsService';

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/v1/accounts',
    register: async function (server: Server) {
      server.route([
        {
          method: 'GET',
          path: '/accounts/{address}/tokens',
          options: {
            description: 'Account balance',
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
          path: '/accounts/{address}/checkRole',
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
          path: '/accounts/{address}/checkWhitelist',
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
        },
        {
          method: 'POST',
          path: '/accounts',
          options: {
            description: 'Creates an account for the user',
            notes: 'Account in blockchain',
            tags: ['api'],
            
            handler: createAccountHandler
          }
        },
      ]);
    },
  };


  const accountsService = new AccountsService();

  const createAccountHandler = async (request: Request, h: ResponseToolkit) => {
    const account = await accountsService.createAccount();

    return h.response({account}).code(200);
  }

  const getBalanceHandler = async (request: Request, h: ResponseToolkit) => {
    const {address} = request.params;
    const {token_id} = request.query;
    const balance = await accountsService.getBalance(token_id, address);

    return h.response({balanceData : {address, token_id, balance}}).code(200);
  }

  const hasRoleHandler = async (request: Request, h: ResponseToolkit) => {
    const {address} = request.params;
    const {role} = request.query;
    const hasRole = await accountsService.hasRole(role as string, address);

    return h.response({data: {address, role, hasRole}}).code(200);
  }

  const isWhitelistedHandler = async (request: Request, h: ResponseToolkit) => {
    const {address} =  request.params;
    const isWhitelisted = await accountsService.isWhitelisted(address);

    return h.response({data: {address, isWhitelisted}}).code(200);
  }


  
  export default {
    plugin,
    options
  } as PluginObject;