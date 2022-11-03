import SmartContractData from '../services/SmartContractService';
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';
import AccountKeysService from '../services/AccountKeysService';

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/smartcontractdata',
    register: async function (server: Server) {
      server.route([
        {
          method: 'GET',
          path: '/smartcontractdata/decimals',
          options: {
            description: 'Returns the number of decimals in the smart contract',
            notes: 'notes',
            tags: ['api'],
            
            handler: getDecimalsHandler
          }
        },
        {
          method: 'POST',
          path: '/smartcontractdata/pause',
          options: {
            description: 'Pauses smart contract',
            notes: 'notes',
            tags: ['api'],
            
            handler: pauseHandler
          }
        },
        {
            method: 'POST',
            path: '/smartcontractdata/unpause',
            options: {
              description: 'Unpauses smart contract',
              notes: 'notes',
              tags: ['api'],
              
              handler: unpauseHandler
            }
          },
          {
            method: 'GET',
            path: '/smartcontractdata/status',
            options: {
              description: 'Returns smart contract pause state',
              notes: 'notes',
              tags: ['api'],
              
              handler: isPausedHandler
            }
          }
      ]);
    },
  };

const smartContractData = new SmartContractData();
const accountKeysService = new AccountKeysService();

const getDecimalsHandler = async (request : Request, h : ResponseToolkit) => {
    const decimals = await smartContractData.getDecimals();

    return h.response({decimals}).code(200);
}

const pauseHandler = async (request : Request, h : ResponseToolkit) => {
    const { username } = request.auth.artifacts.decoded as any;
    const keys = await accountKeysService.getUserAccountKeys(username as string);

    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    
    const transactionReceipt= await smartContractData.pause(signerAddress, signerPrivateKey);

    return h.response({transactionReceipt}).code(200);
}

const unpauseHandler = async (request : Request, h : ResponseToolkit) => {
    const { username } = request.auth.artifacts.decoded as any;
    const keys = await accountKeysService.getUserAccountKeys(username as string);

    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    const transactionReceipt = await smartContractData.unpause(signerAddress, signerPrivateKey);

    return h.response({transactionReceipt}).code(200);
}

const isPausedHandler = async (request : Request, h : ResponseToolkit) => {
    const isPaused = await smartContractData.isPaused();

    return h.response({status : {isPaused} }).code(200);
}

export default {
    plugin,
    options
} as PluginObject;