
import { prisma } from "../../server";
import { AccountKeys } from "@prisma/client";

class AccountKeysService {

    getAllAccountKeys = async() : Promise<any[]> => { 
        const accountKeys = await prisma.accountKeys.findMany({
            select : {
                id : true,
                publicKey : true,
                privateKey : true,
                createdAt : true,
                user : {
                    select : {
                        id : true,
                        username : true,
                        email : true
                    }
                }
            }
        }); 
    
        return accountKeys;
    }
    
    getUserAccountKeys = async(username : string) : Promise<AccountKeys[]> => { //one-to-one relation between tables accountkeys and users
        const accountKeys = await prisma.accountKeys.findMany({
            where : {
                user : {
                    username
                }
            }
        })
    
        return accountKeys
    }
    
    createAccountKey = async(publicKey : string, privateKey : string, userId : string) : Promise<AccountKeys> => {
        const newKeys = await prisma.accountKeys.create({
            data : {
                publicKey,
                privateKey,
                userId
            }
        })

        return newKeys;
    }

}

export default AccountKeysService;