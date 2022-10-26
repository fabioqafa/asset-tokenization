import {contract} from "./1.ContractProvider";

class AssetsManagementService {
    
    totalSupply = async (id: number) : Promise<number> => {
        const totalSupply = await contract.methods.totalSupply(id).call();

        return totalSupply;
    }

    exists = async (id: number) : Promise<boolean> => {
        const result = await contract.methods.exists(id).call();

        return result;
    }
}

export default AssetsManagementService;