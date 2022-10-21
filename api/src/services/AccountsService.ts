import executeTransaction from "../utils/ExeTrnx";
import { web3, contract, networkId } from "./ContractProvider";
import {Account} from 'web3-core';

class AccountsService {
    
    createAccount = async() : Promise<Account> => {
        const accountData = web3.eth.accounts.create();   
            
        return accountData;
    }

    getBalance = async(id : number, address: string) : Promise<number> => {
        const balance : number = await contract.methods.balanceOf(address, id).call();
        
        return balance;
    }

    hasRole = async(role: string, address: string) : Promise<boolean> => {
        const result = await contract.methods.hasRole(role, address).call();

        return result;
    }
    
    isWhitelisted = async(address : string) : Promise<boolean> => {
        const result = await contract.methods.isWhitelisted(address).call();

        return result;
    }   

}

export default AccountsService;