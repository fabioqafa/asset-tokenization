import TokenManagementService from '../services/TokenManagementService';
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';
import Users_Assets from '../services/Users_AssetsService';
import AccountKeysService from '../services/AccountKeysService';
import UsersService from '../services/UsersService';
import AssetsManagementService from '../services/AssetsManagementService';
import AccountsService from '../services/AccountsService';

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/tokenmanagement',
    register: async function (server: Server) {
      server.route([
        // {
        //   method: 'POST',
        //   path: '/tokenmanagement/issueTokens',
        //   options: {
        //     description: 'Issue tokens',
        //     notes: 'notes',
        //     tags: ['api'],
        //     validate : {
        //         payload : Joi.object({
        //             id : Joi.number()
        //                 .required(),
        //             amount : Joi.number()
        //                 .required(),
        //             issuerAddress : Joi.string()
        //                 .required()
        //                 .description("Signer of the transaction"),
        //             issuerPrivateKey : Joi.string()
        //                 .required()
        //                 .description("Private key to sign the transaction")
        //         })
        //     },
        //     handler: issueTokensHandler
        //   }
        // },
        {
            method: 'POST',
            path: '/tokenmanagement/transferTokens',
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
                            .required()
                  })
              },
              handler: transferTokensHandler
            }
          }
      ]);
    },
  };

const tokenManagementService = new TokenManagementService();
const accountKeysService = new AccountKeysService();
const accountsService = new AccountsService();
const assetsManagementService = new AssetsManagementService();
const users_assets_service = new Users_Assets();

const issueTokensHandler = async (request : Request, h : ResponseToolkit) => {
        const {id, amount } = request.payload as any;
        const { username } = request.auth.artifacts.decoded as any;

        const keys = await accountKeysService.getUserAccountKeys(username as string);
        const signerAddress = keys.publicKey;
        const signerPrivateKey = keys.privateKey;

        const transactionReceipt = await tokenManagementService.issueTokens(id as number, amount as number, signerAddress as string, signerPrivateKey as string);
    
        return h.response({transactionReceipt}).code(200);
}

const transferTokensHandler = async (request : Request, h : ResponseToolkit) => {
    const {from, to, id, amount } = request.payload as any;
    const addressFrom = (await accountKeysService.getUserAccountKeys(from as string)).publicKey;
    
    const addressTo = (await accountKeysService.getUserAccountKeys(to as string)).publicKey;
    
    const { username } = request.auth.artifacts.decoded as any;

    const signerKeys = await accountKeysService.getUserAccountKeys(username as string);
    const signerAddress = signerKeys.publicKey;
    const signerPrivateKey = signerKeys.privateKey;

    const newShareholder = (await accountKeysService.getUserFromKeys(addressTo)); //userId of the shareholder to be added
    
    const asset = await assetsManagementService.getAsset(id);

    if ( (await accountsService.getBalance(asset.tokenId, addressTo)) == 0 ) {
      await users_assets_service.addShareholder(newShareholder.userId, asset.id); //if receiver isn't already a shareholder of this asset(his balance on blockchain is 0), add him as one.
    }

    const transactionReceipt = await tokenManagementService.transferTokens(addressFrom as string, addressTo as string, id as number, amount as number, signerAddress as string, signerPrivateKey as string);    

    const oldShareholder = (await accountKeysService.getUserFromKeys(addressFrom)); //userId of the shareholder that is sending tokens

    if( (await accountsService.getBalance(asset.tokenId, addressFrom)) == 0 && (oldShareholder.userId !== "2ed0b5d2-e3e8-4f78-bb83-c2fa6d59c51e") ) { //if user is adminremax then don't remove it as a shareholder because he alredy is not
      await users_assets_service.removeShareholder(oldShareholder.userId, asset.id); //remove sender as a shareholder if he transfers all of his tokens
    }

    return h.response({transactionReceipt}).code(200);
}

export default {
    plugin,
    options
} as PluginObject;