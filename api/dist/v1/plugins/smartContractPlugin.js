"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmartContractService_1 = __importDefault(require("../services/SmartContractService"));
const AccountKeysService_1 = __importDefault(require("../services/AccountKeysService"));
const options = {
    route: true
};
const plugin = {
    name: 'app/smartcontractdata',
    register: async function (server) {
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
const smartContractData = new SmartContractService_1.default();
const accountKeysService = new AccountKeysService_1.default();
const getDecimalsHandler = async (request, h) => {
    const decimals = await smartContractData.getDecimals();
    return h.response({ decimals }).code(200);
};
const pauseHandler = async (request, h) => {
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    const transactionReceipt = await smartContractData.pause(signerAddress, signerPrivateKey);
    return h.response({ transactionReceipt }).code(200);
};
const unpauseHandler = async (request, h) => {
    const { username } = request.auth.artifacts.decoded;
    const keys = await accountKeysService.getUserAccountKeys(username);
    const signerAddress = keys.publicKey;
    const signerPrivateKey = keys.privateKey;
    const transactionReceipt = await smartContractData.unpause(signerAddress, signerPrivateKey);
    return h.response({ transactionReceipt }).code(200);
};
const isPausedHandler = async (request, h) => {
    const isPaused = await smartContractData.isPaused();
    return h.response({ status: { isPaused } }).code(200);
};
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=smartContractPlugin.js.map