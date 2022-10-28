import { contract } from "./1.ContractProvider";
import { prisma } from "../../server";
import { Assets } from "@prisma/client";

class AssetsManagementService {

    getAllAssets = async() : Promise<any[]> => {
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
    }
    
    getTenantsAssets = async(tenantId : string) : Promise<Assets[]> => {
        const assets = await prisma.assets.findMany({
            where : {
                tenantId
            }
        });
    
        return assets;
    }
    
    totalSupply = async (id: number) : Promise<number> => {
        const totalSupply = await contract.methods.totalSupply(id).call();

        return totalSupply;
    }

    exists = async (id: number) : Promise<boolean> => {
        const result = await contract.methods.exists(id).call();

        return result;
    }


    createAsset = async(tokenSymbol : string, address: string, flatnr : number, floor : number, aptnr : number, tenantId : string) : Promise<Assets> => {
        
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
    }
}

export default AssetsManagementService;