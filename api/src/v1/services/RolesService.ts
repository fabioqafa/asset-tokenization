import { web3, contract, networkId } from "./1.ContractProvider";
import {Account} from 'web3-core';

class RolesService {
    getMinterRole = async() : Promise<string> => {
        try {
            const minterRole = await contract.methods.MINTER_ROLE().call();
    
            return minterRole;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    getPauserRole = async() : Promise<string> => {
        try {
            const pauserRole = await contract.methods.PAUSER_ROLE().call();
    
            return pauserRole;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    getAdminRole = async() : Promise<string> => {
        try {
            const defaultAdminRole = await contract.methods.DEFAULT_ADMIN_ROLE().call();
    
            return defaultAdminRole;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
}

export default RolesService;