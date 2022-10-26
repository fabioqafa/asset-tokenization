import TokenManagementService from '../services/TokenManagementService';
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/tokenmanagement',
    register: async function (server: Server) {
      server.route([
        {
          method: 'POST',
          path: '/v1/tokenmanagement/issueTokens',
          options: {
            description: 'Issue tokens',
            notes: 'notes',
            tags: ['api'],
            validate : {
                payload : Joi.object({
                    id : Joi.number()
                        .required(),
                    amount : Joi.number()
                        .required(),
                    issuerAddress : Joi.string()
                        .required()
                        .description("Signer of the transaction"),
                    issuerPrivateKey : Joi.string()
                        .required()
                        .description("Private key to sign the transaction")
                })
            },
            handler: issueTokensHandler
          }
        },
        {
            method: 'POST',
            path: '/v1/tokenmanagement/transferTokens',
            options: {
              description: 'Transfer tokens',
              notes: 'notes',
              tags: ['api'],
              validate : {
                  payload : Joi.object({
                        from : Joi.string()
                            .required(),
                        to : Joi.string()
                            .required(),
                        id : Joi.number()
                            .required(),
                        amount : Joi.number()
                            .required(),
                        signerAddress : Joi.string()
                            .required()
                            .description("Signer of the transaction"),
                        signerPrivateKey : Joi.string()
                            .required()
                            .description("Private key to sign the transaction")
                  })
              },
              handler: transferTokensHandler
            }
          }
      ]);
    },
  };

const tokenManagementService = new TokenManagementService();

const issueTokensHandler = async (request : Request, h : ResponseToolkit) => {
    const {id, amount, issuerAddress, issuerPrivateKey} = request.payload as any;
    const transactionReceipt = await tokenManagementService.issueTokens(id as number, amount as number, issuerAddress as string, issuerPrivateKey as string);

    return h.response({transactionReceipt}).code(200);
}

const transferTokensHandler = async (request : Request, h : ResponseToolkit) => {
    const {from, to, id, amount, signerAddress, signerPrivateKey} = request.payload as any;
    const transactionReceipt = await tokenManagementService.transferTokens(from as string, to as string, id as number, amount as number, signerAddress as string, signerPrivateKey as string);

    return h.response({transactionReceipt}).code(200);
}

export default {
    plugin,
    options
} as PluginObject;