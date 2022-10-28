import {prisma} from "../../server";
import { Tenants } from '@prisma/client'

class TenantsService {
    getAllTenants = async() : Promise<Tenants[]> => {
        const tenants = await prisma.tenants.findMany(); 
    
        return tenants;
    }
    
    getTenant = async(name: string) : Promise<Tenants | null> => {
        const tenant = await prisma.tenants.findUnique({
            where : {
                name
            }
        })
    
        return tenant;
    }
    
    createNewTenant = async(name: string) : Promise<Tenants> => {
        const tenant = await prisma.tenants.create({
            data: {
                name
            }
        })
    
        return tenant;
    }

}

export default TenantsService;