import executeTransaction from "../utils/ExeTrnx";
import { web3, contract, networkId } from "./1.ContractProvider";
import { Account } from "web3-core";
class AccountsService {

    createAccount = async() : Promise<Account> => {
        try {
            const accountData = web3.eth.accounts.create();   
            
            return accountData;

        } catch (error) {
            console.error(error); throw error;
        }
        
    }

    getBalance = async(id : number, address: string) : Promise<number> => {
        try {
            const balance : number = await contract.methods.balanceOf(address, id).call();
            
            return balance;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    hasRole = async(role: string, address: string) : Promise<boolean> => {
        try {
            const result = await contract.methods.hasRole(role, address).call();
    
            return result;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }
    
    isWhitelisted = async(address : string) : Promise<boolean> => {
        try {
            const result = await contract.methods.isWhitelisted(address).call();
    
            return result;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }   

}

export default AccountsService;