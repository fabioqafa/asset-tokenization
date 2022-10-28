import { AccountKeys, Assets, PrismaClient, Tenants, Users } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt';

//Users model begin

const getAllUsers = async() : Promise<Users[]> => {
    const users = await prisma.users.findMany();

    return users;
}

const getUsers = async(email : string) : Promise<Users | null> => {
    const user = await prisma.users.findUnique({
        where : {
            email
        }
    })

    return user;
}

const createUser = async(email: string, username : string, password : string, tenantId : string) : Promise<void> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    await prisma.users.create({
        data: {
            email,
            username,
            password: hashedPassword,
            tenantId
        }
    })
}

//Users model end

//AccoutKeys model begin
const getAllAccountKeys = async() : Promise<AccountKeys[]> => { 
    const accountKeys = await prisma.accountKeys.findMany(); 

    return accountKeys;
}

const getUserAccountKeys = async(userId : string) : Promise<AccountKeys[]> => { //one-to-one relation between tables accountkeys and users
    const accountKeys = await prisma.accountKeys.findMany({
        where : {
            userId
        }
    })

    return accountKeys
}

const createAccountKey = async(publicKey : string, privateKey : string, userId : string) : Promise<void> => {
    await prisma.accountKeys.create({
        data : {
            publicKey,
            privateKey,
            userId
        }
    })
}
//AccoutKeys model end

//Tenants model begin

const getAllTenants = async() : Promise<Tenants[]> => {
    const tenants = await prisma.tenants.findMany(); 

    return tenants;
}

const getTenant = async(name: string) : Promise<Tenants | null> => {
    const tenant = await prisma.tenants.findUnique({
        where : {
            name
        }
    })

    return tenant;
}

const createTenant = async(name: string) : Promise<void> => {
    await prisma.tenants.create({
        data: {
            name
        }
    })
}

//Tenants model end

//Assets model begin

const getAllAssets = async() : Promise<Assets[]> => {
    const assets = await prisma.assets.findMany();

    return assets;
}

const getTenantsAssets = async(tenantId : string) : Promise<Assets[]> => {
    const assets = await prisma.assets.findMany({
        where : {
            tenantId
        }
    })

    return assets;
}

const createAsset = async(address: string, flatnr : number, floor : number, aptnr : number, tenantId : string) : Promise<void> => {
    await prisma.assets.create({
        data : {
            address,
            flatnr,
            floor,
            aptnr,
            tenantId
        }
    })

}

//Assets model end

//Users_Assets model begin

const createUserAsset = async(userId : string, assetId : string) => {
    await prisma.users_Assets.create({
        data: {
            userId,
            assetId
        }
    })
}

const getAssetOwners = async(assetId : string) : Promise<any> => {
    const assetOwners = await prisma.users_Assets.findMany({
        where : {
            assetId
        },
        select : {
            purchasedAt : true,
            user : {
                select : {
                    username: true,
                    email : true
                }
            }
        }
    })

    return assetOwners;
}

const getOwnersAsset = async(userId : string) : Promise<any> => {
    const ownersAsset = await prisma.users_Assets.findMany({
        where : {
            userId
        },
        select : {
            purchasedAt : true,
            user : {
                select : {
                    tenantId : true
                }
            },
            asset : true
        }
    })

    return ownersAsset;
} 

//Users_Assets model end


// (async() => {
//     const result = await getOwnersAsset("f57d2669-2172-4ef9-a8e8-2c06cf7ad4ef");
//     console.log(result)       
// }) ()
