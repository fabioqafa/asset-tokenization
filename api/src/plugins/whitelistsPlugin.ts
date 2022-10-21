import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import Whitelist from "../services/WhitelistsService";
import Joi from "joi";
import { PluginObject } from '@hapi/glue';

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/whitelist',
    register: async function (server: Server) {
      server.route([
        {
          method: 'POST',
          path: '/whitelist/{address}/addToWhitelist',
          options: {
            description: 'Add an account to whitelist',
            notes: 'Returns a transaction hash',
            tags: ['api'],
            validate : {
                params : Joi.object({
                    address: Joi.string()
                        .required()
                        .description("Address to be whitelisted")
                }),
                payload : Joi.object({
                    signerAddress: Joi.string()
                        .required()
                        .description("Address that is executing the transaction"),
                    signerPrivateKey: Joi.string()
                        .required()
                        .description("Private key to sign the transaction")
                })
            },
            handler: addToWhitelistHandler
          }
        },
        {
            method: 'POST',
            path: '/whitelist/{address}/removeFromWhitelist',
            options: {
              description: 'Remove an account to whitelist',
              notes: 'Returns a transaction hash',
              tags: ['api'],
              validate : {
                params : Joi.object({
                    address: Joi.string()
                        .required()
                        .description("Address to be whitelisted")
                }),
                  payload : Joi.object({
                      signerAddress: Joi.string()
                          .required()
                          .description("Address that is executing the transaction"),
                      signerPrivateKey: Joi.string()
                          .required()
                          .description("Private key to sign the transaction")
                  })
              },
              handler: removeFromWhitelistHandler
            }
          },
      ]);
    },
  };

const whitelist = new Whitelist();

const addToWhitelistHandler = async (request : Request, h : ResponseToolkit) => {
    const {address} = request.params;
    const {signerAddress, signerPrivateKey} = request.payload as any;
    const transactionHash = await whitelist.addToWhitelist(address as string, signerAddress as string, signerPrivateKey as string);
    return h.response({transactionHash}).code(200);
}

const removeFromWhitelistHandler = async (request : Request, h : ResponseToolkit) => {
    const {address} = request.params;
    const {signerAddress, signerPrivateKey} = request.payload as any;
    const transactionHash = await whitelist.removeFromWhitelist(address as string, signerAddress as string, signerPrivateKey as string);

    return h.response({transactionHash}).code(200);
}

export default {
    plugin,
    options
} as PluginObject;