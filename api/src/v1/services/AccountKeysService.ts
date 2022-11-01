
import { prisma } from "../../server";
import { AccountKeys } from "@prisma/client";

class AccountKeysService {

    getAllAccountKeys = async() : Promise<any[]> => { 

        try {
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
        
        } catch (error) {console.error(error); throw error;}
        
    }
    
    getUserAccountKeys = async(username : string) : Promise<AccountKeys[]> => { //one-to-one relation between tables accountkeys and users
        
        try {
            const accountKeys = await prisma.accountKeys.findMany({
                where : {
                    user : {
                        username
                    }
                }
            })
        
            return accountKeys;

        } catch (error) {console.error(error); throw error;}
        
    }
    
    createAccountKey = async(publicKey : string, privateKey : string, userId : string) : Promise<AccountKeys> => {
        
        try {
            const newKeys = await prisma.accountKeys.create({
                data : {
                    publicKey,
                    privateKey,
                    userId
                }
            })

            return newKeys;

        } catch (error) {console.error(error); throw error;}

    } 

}

export default AccountKeysService;