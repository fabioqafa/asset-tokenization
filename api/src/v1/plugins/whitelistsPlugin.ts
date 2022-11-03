import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import Whitelist from "../services/WhitelistsService";
import Joi from "joi";
import { PluginObject } from '@hapi/glue';
import AccountKeysService from "../services/AccountKeysService";

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/whitelist',
    register: async function (server: Server) {
      server.route([
        {
          method: 'POST',
          path: '/whitelist/addToWhitelist',
          options: {
            description: 'Add an account to whitelist',
            notes: 'Returns a transaction hash',
            tags: ['api'],
            validate : {
                payload : Joi.object({
                    user: Joi.string()
                        .required()
                        .description("Address to be whitelisted")
                })
            },
            handler: addToWhitelistHandler
          }
        },
        {
            method: 'POST',
            path: '/whitelist/removeFromWhitelist',
            options: {
              description: 'Remove an account to whitelist',
              notes: 'Returns a transaction hash',
              tags: ['api'],
              validate : {
                payload : Joi.object({
                    user: Joi.string()
                        .required()
                        .description("Address to be removed from whitelist")
                })
              },
              handler: removeFromWhitelistHandler
            }
          },
      ]);
    },
  };

const whitelist = new Whitelist();
const accountKeysService = new AccountKeysService();

const addToWhitelistHandler = async (request : Request, h : ResponseToolkit) => {
    const { user } = request.payload as any;
    const { publicKey } = await accountKeysService.getUserAccountKeys(user as string)
    const { username } = request.auth.artifacts.decoded as any;
    const keys = await accountKeysService.getUserAccountKeys(username as string);

    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;

    const transactionReceipt = await whitelist.addToWhitelist(publicKey as string, signerAddress as string, signerPrivateKey as string);
    return h.response({transactionReceipt}).code(200);
}

const removeFromWhitelistHandler = async (request : Request, h : ResponseToolkit) => {
    const { user } = request.payload as any;
    const { publicKey } = await accountKeysService.getUserAccountKeys(user as string)
    const { username } = request.auth.artifacts.decoded as any;
    const keys = await accountKeysService.getUserAccountKeys(username as string);

    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    const transactionReceipt = await whitelist.removeFromWhitelist(publicKey as string, signerAddress as string, signerPrivateKey as string);

    return h.response({transactionReceipt}).code(200);
}

export default {
    plugin,
    options
} as PluginObject;