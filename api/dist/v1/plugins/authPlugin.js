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
Object.defineProperty(exports, "__esModule", { value: true });
//import { prisma }  from '../../server';
const Bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const validate = async (decoded, request, h) => {
    const user = await prisma.users.findUnique({
        where: {
            username: decoded.username
        }
    });
    if (user) {
        const isValid = await Bcrypt.compare(decoded.password, user.password);
        if (isValid) {
            return { credentials: { user }, isValid };
        }
        else {
            return { credentials: null, isValid };
        }
    }
    else {
        return { credentials: null, isValid: false };
    }
};
const plugin = {
    name: 'app/v1/auth',
    register: async function (server) {
        await server.register({
            plugin: require('hapi-auth-jwt2')
        });
        server.auth.strategy('jwt', 'jwt', { key: "1234", validate });
        server.auth.default('jwt');
    }
};
const options = {
    route: true
};
exports.default = {
    plugin,
    options
};
//# sourceMappingURL=authPlugin.js.map