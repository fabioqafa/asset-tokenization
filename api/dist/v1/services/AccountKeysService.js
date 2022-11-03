"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
class AccountKeysService {
    getAllAccountKeys = async () => {
        try {
            const accountKeys = await server_1.prisma.accountKeys.findMany({
                select: {
                    id: true,
                    publicKey: true,
                    privateKey: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            });
            return accountKeys;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    getUserAccountKeys = async (username) => {
        try {
            const accountKeys = await server_1.prisma.accountKeys.findMany({
                where: {
                    user: {
                        username
                    }
                }
            });
            return accountKeys;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    getUserFromKeys = async (publicKey) => {
        const userId = await server_1.prisma.accountKeys.findUnique({
            where: {
                publicKey: publicKey
            },
            select: {
                userId: true
            }
        });
        return userId;
    };
    createAccountKey = async (publicKey, privateKey, userId) => {
        try {
            const newKeys = await server_1.prisma.accountKeys.create({
                data: {
                    publicKey,
                    privateKey,
                    userId
                }
            });
            return newKeys;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
}
exports.default = AccountKeysService;
//# sourceMappingURL=AccountKeysService.js.map