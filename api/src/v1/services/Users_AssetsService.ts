import { prisma } from "../../server";

class Users_Assets {

    

    getAssetOwners = async(tokenId : number) : Promise<any> => {
        try {
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
                            id : true,
                            username: true,
                            email : true,
                            tenantId : true,
                        }
                    }
                }
            })
        
            return assetOwners;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
    
    getOwnersAsset = async(username : string) : Promise<any> => {
        try {
            const ownersAsset = await prisma.users_Assets.findMany({
                where : {
                    user : {
                        username
                    }
                },
                select : {
                    purchasedAt : true,
                    asset : true,
                    user : {
                        select : {
                            id: true,
                            username : true,
                            tenantId : true
                        }
                    }
                }
            });
        
            return ownersAsset;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    addShareholders = async(userId : string, assetId : string) : Promise<any> => {
        try {
            const result = await prisma.users_Assets.create({
                data: {
                    userId,
                    assetId
                }
            })
    
            return result;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
    
}

export default Users_Assets;