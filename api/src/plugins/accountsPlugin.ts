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
          path: '/accounts/newAccount',
          options: {
            description: 'Creates an account for the user',
            notes: 'Account in blockchain',
            tags: ['api'],
            
            handler: createAccountHandler
          }
        },
        {
          method: 'GET',
          path: '/accounts/{address}/balance/{id}',
          options: {
            description: 'Account Balance',
            notes: 'Shows the balance of the account',
            tags: ['api'],
            validate: {
              params: Joi.object({
                address: Joi.string()
                  .required()
                  .description('Address of account'),
                id: Joi.number()
                    .required()
                    .description('Asset id')
              })
            },
            handler: getBalanceHandler
          }
        },
        {
          method: 'GET',
          path: '/accounts/{address}/checkRole/{role}',
          options: {
            description: 'Checks address role',
            notes: 'Address and role should be of string type',
            tags: ['api'],
            validate: {
              params: Joi.object({
                address: Joi.string()
                  .required()
                  .description('Address of account'),
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
    const {id, address} = request.params;
    const balance = await accountsService.getBalance(id, address);

    return h.response({address, balance, id}).code(200);
  }

  const hasRoleHandler = async (request: Request, h: ResponseToolkit) => {
    const {role, address} = request.params;
    const hasRole = await accountsService.hasRole(role, address);

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