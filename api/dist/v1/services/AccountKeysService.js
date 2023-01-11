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
            //First need to get user id from the database
            const user = await server_1.prisma.users.findUnique({
                where: {
                    username
                }
            });
            //We need to insert user id here in order to get its unique keys
            const accountKeys = await server_1.prisma.accountKeys.findUnique({
                where: {
                    userId: user.id
                }
            });
            return accountKeys;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
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