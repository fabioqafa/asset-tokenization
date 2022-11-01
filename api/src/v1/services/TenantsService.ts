import {prisma} from "../../server";
import { Tenants } from '@prisma/client'

class TenantsService {
    getAllTenants = async() : Promise<Tenants[]> => {
        try {
            const tenants = await prisma.tenants.findMany(); 
        
            return tenants;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
    
    getTenant = async(name: string) : Promise<Tenants | null> => {
        try {
            const tenant = await prisma.tenants.findUnique({
                where : {
                    name
                }
            })
        
            return tenant;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
    
    createNewTenant = async(name: string) : Promise<Tenants> => {
        try {
            const tenant = await prisma.tenants.create({
                data: {
                    name
                }
            })
        
            return tenant;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

}

export default TenantsService;