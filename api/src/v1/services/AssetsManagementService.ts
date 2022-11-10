import { contract } from "./1.ContractProvider";
import { prisma } from "../../server";
import { Assets } from "@prisma/client";

class AssetsManagementService {

    getAllAssets = async() : Promise<any[]> => {
        try {
            const assets = await prisma.assets.findMany({
                select : {
                    id : true,
                    tokenId : true,
                    tokenSymbol : true,
                    address : true,
                    flatnr : true,
                    floor : true,
                    aptnr : true,
                    createdAt : true,
                    tenantId : true,
                    tenant : {
                        select : {
                            name : true
                        }
                    }
                }
            });
        
            return assets;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
    
    getTenantsAssets = async(tenantId : string) : Promise<Assets[]> => {
        try {
            const assets = await prisma.assets.findMany({
                where : {
                    tenantId
                }
            });
        
            return assets;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
    
    totalSupply = async (id: number) : Promise<number> => {
        try {
            const totalSupply = await contract.methods.totalSupply(id).call();
    
            return totalSupply;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    exists = async (id: number) : Promise<boolean> => {
        try {
            const result = await contract.methods.exists(id).call();
    
            return result;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }


    createAsset = async(tokenSymbol : string, address: string, flatnr : number, floor : number, aptnr : number, tenantId : string) : Promise<Assets> => {
        
        try {
            const newAsset = await prisma.assets.create({
                data : {
                    tokenSymbol,
                    address,
                    flatnr,
                    floor,
                    aptnr,
                    tenantId
                }
            });
    
            return newAsset;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
}

export default AssetsManagementService;