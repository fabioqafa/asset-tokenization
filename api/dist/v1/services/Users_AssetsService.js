"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
class Users_Assets {
    getAssetOwners = async (tokenId) => {
        try {
            const assetOwners = await server_1.prisma.users_Assets.findMany({
                where: {
                    asset: {
                        tokenId
                    }
                },
                select: {
                    purchasedAt: true,
                    asset: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            tenantId: true,
                        }
                    }
                }
            });
            return assetOwners;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    getOwnersAsset = async (username) => {
        try {
            const ownersAsset = await server_1.prisma.users_Assets.findMany({
                where: {
                    user: {
                        username
                    }
                },
                select: {
                    purchasedAt: true,
                    asset: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            tenantId: true
                        }
                    }
                }
            });
            return ownersAsset;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
    addShareholders = async (userId, assetId) => {
        try {
            const result = await server_1.prisma.users_Assets.create({
                data: {
                    userId,
                    assetId
                }
            });
            return result;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    };
}
exports.default = Users_Assets;
//# sourceMappingURL=Users_AssetsService.js.map