import SmartContractData from '../services/SmartContractService';
import { Server, Request, ResponseToolkit } from '@hapi/hapi';
import { PluginObject } from '@hapi/glue';
import Joi from 'joi';

const options = {
    route: true
  };
  
  const plugin = {
    name: 'app/v1/smartcontractdata',
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
            validate : {
                payload : Joi.object({
                    signerAddress : Joi.string()
                        .required()
                        .description("Signer of the transaction"),
                    signerPrivateKey : Joi.string()
                        .required()
                        .description("Private key to sign the transaction")
                })
            },
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
              validate : {
                  payload : Joi.object({
                      signerAddress : Joi.string()
                          .required()
                          .description("Signer of the transaction"),
                      signerPrivateKey : Joi.string()
                          .required()
                          .description("Private key to sign the transaction")
                  })
              },
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

const getDecimalsHandler = async (request : Request, h : ResponseToolkit) => {
    const decimals = await smartContractData.getDecimals();
    //console.log(request.auth.credentials)
    //console.log(request.auth)

    return h.response({"Smart contract decimals" : decimals}).code(200);
}

const pauseHandler = async (request : Request, h : ResponseToolkit) => {
    const {signerAddress, signerPrivateKey} = request.payload as any;
    const transactionReceipt= await smartContractData.pause(signerAddress, signerPrivateKey);

    return h.response({transactionReceipt}).code(200);
}

const unpauseHandler = async (request : Request, h : ResponseToolkit) => {
    const {signerAddress, signerPrivateKey} = request.payload as any;
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