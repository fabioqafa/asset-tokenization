import { web3, contract, networkId } from "./ContractProvider";
import {Account} from 'web3-core';

class RolesService {
    getMinterRole = async() : Promise<string> => {
        const minterRole = await contract.methods.MINTER_ROLE().call();

        return minterRole;
    }

    getPauserRole = async() : Promise<string> => {
        const pauserRole = await contract.methods.PAUSER_ROLE().call();

        return pauserRole;
    }

    getAdminRole = async() : Promise<string> => {
        const defaultAdminRole = await contract.methods.DEFAULT_ADMIN_ROLE().call();

        return defaultAdminRole;
    }
}

export default RolesService;