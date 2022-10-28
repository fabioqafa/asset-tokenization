import { prisma } from "../../server";

class Users_Assets {

    

    getAssetOwners = async(tokenId : number) : Promise<any> => {
        const assetOwners = await prisma.users_Assets.findMany({
            where : {
                asset : {
                    tokenId
                }
            },
            select : {
                purchasedAt : true,
                asset : true,
                user : {
                    select : {
                        username: true,
                        email : true,
                        tenantId : true,
                    }
                }
            }
        })
    
        return assetOwners;
    }
    
    getOwnersAsset = async(username : string) : Promise<any> => {
        const ownersAsset = await prisma.users_Assets.findMany({
            where : {
                user : {
                    username
                }
            },
            select : {
                userId : true,
                purchasedAt : true,
                user : {
                    select : {
                        username : true,
                        tenantId : true
                    }
                },
                asset : true
            }
        });
    
        return ownersAsset;
    }

    addShareholders = async(userId : string, assetId : string) : Promise<any> => {
        const result = await prisma.users_Assets.create({
            data: {
                userId,
                assetId
            }
        })

        return result;
    }
    
}

export default Users_Assets;