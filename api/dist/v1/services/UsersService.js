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
const server_1 = require("../../server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
class UsersService {
    getAllUsers = async () => {
        try {
            const users = await server_1.prisma.users.findMany();
            return users;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    getUsersByTenantId = async (tenantId) => {
        try {
            const users = await server_1.prisma.users.findMany({
                where: {
                    tenantId
                }
            });
            return users;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    getUser = async (username) => {
        try {
            const user = await server_1.prisma.users.findUnique({
                where: {
                    username
                }
            });
            return user;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    signUp = async (email, username, password, tenantId) => {
        try {
            const salt = await bcrypt_1.default.genSalt(10);
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            const newUser = await server_1.prisma.users.create({
                data: {
                    email,
                    username,
                    password: hashedPassword,
                    tenantId
                    //roleId : 2 //by default user
                }
            });
            return newUser;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    logIn = async (username, password) => {
        try {
            const token = jwt.sign({ username, password, scope: "admin" }, "1234", { expiresIn: "1h" });
            return token;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
}
exports.default = UsersService;
//# sourceMappingURL=UsersService.js.map