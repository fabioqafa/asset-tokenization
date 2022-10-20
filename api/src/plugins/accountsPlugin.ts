import { Server, Request, ResponseToolkit, ResponseObject, UserCredentials } from '@hapi/hapi';
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
          method: 'GET',
          path: '/accounts/{id}/{address}/balance',
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
              })
            },
            handler: accountBalanceHandler
          }
        }]);
    },
  };

  const accountBalanceHandler = async (request: Request, h: ResponseToolkit) => {
    const {id, address} = request.params;
    const accountsService = new AccountsService();
    const balance = await accountsService.getBalance(id, address);

    return h.response({address, balance, id}).code(200);
  }
  
  export default {
    plugin,
    options
  } as PluginObject;