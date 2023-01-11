'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const _1_ContractProvider_1 = __importDefault(require("./v1/services/1.ContractProvider"));
const glue_1 = require("@hapi/glue");
const plugins_1 = __importDefault(require("./v1/plugins"));
const client_1 = require("@prisma/client");
const contractProvider = new _1_ContractProvider_1.default();
const manifest = {
    server: {
        port: 3000,
        host: '0.0.0.0',
        router: {
            stripTrailingSlash: true,
        },
        routes: {
            cors: {
                origin: ['*'], // an array of origins or 'ignore'
            },
        },
    },
    register: {
        plugins: plugins_1.default
    },
};
const options = {
    relativeTo: __dirname
};
const init = async () => {
    const server = await (0, glue_1.compose)(manifest, options);
    await server.register({
        plugin: require("hapi-api-version"),
        options: {
            validVersions: [1, 2],
            defaultVersion: 1,
            vendorName: 'assetapi'
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: false,
        },
        handler: (request, h) => {
            return {
                version: request.pre.apiVersion
            };
        }
    });
    await contractProvider.setContractData();
    exports.prisma = new client_1.PrismaClient();
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
//# sourceMappingURL=server.js.map