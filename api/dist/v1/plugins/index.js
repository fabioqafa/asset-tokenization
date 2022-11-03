"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inert_1 = __importDefault(require("@hapi/inert"));
const vision_1 = __importDefault(require("@hapi/vision"));
const HapiSwagger = __importStar(require("hapi-swagger"));
const accountKeysPlugin_1 = __importDefault(require("./accountKeysPlugin"));
const accountsPlugin_1 = __importDefault(require("./accountsPlugin"));
const assetsManagementPlugin_1 = __importDefault(require("./assetsManagementPlugin"));
const authPlugin_1 = __importDefault(require("./authPlugin"));
const rolesPlugin_1 = __importDefault(require("./rolesPlugin"));
const smartContractPlugin_1 = __importDefault(require("./smartContractPlugin"));
const tenantsPlugin_1 = __importDefault(require("./tenantsPlugin"));
const tokenManagementPlugin_1 = __importDefault(require("./tokenManagementPlugin"));
const usersPlugin_1 = __importDefault(require("./usersPlugin"));
const whitelistsPlugin_1 = __importDefault(require("./whitelistsPlugin"));
const plugins = [
    inert_1.default,
    vision_1.default,
    {
        plugin: HapiSwagger,
        options: {
            securityDefinitions: {
                'jwt': {
                    'type': 'apiKey',
                    'name': 'Authorization',
                    'in': 'header',
                    'x-keyPrefix': 'Bearer '
                }
            },
            security: [{ jwt: [] }],
        }
    },
    accountsPlugin_1.default,
    rolesPlugin_1.default,
    whitelistsPlugin_1.default,
    smartContractPlugin_1.default,
    tokenManagementPlugin_1.default,
    assetsManagementPlugin_1.default,
    tenantsPlugin_1.default,
    usersPlugin_1.default,
    accountKeysPlugin_1.default,
    authPlugin_1.default
];
exports.default = plugins;
//# sourceMappingURL=index.js.map