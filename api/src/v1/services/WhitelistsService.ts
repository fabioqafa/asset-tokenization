import executeTransaction from "../utils/ExeTrnx";
import {web3, contract, networkId} from "./1.ContractProvider";
import {TransactionReceipt} from "web3-core";

class Whitelist {
    
    addToWhitelist = async(address: string, signerAddress :string ,signerPrivateKey: string) : Promise<TransactionReceipt> => {
        try {
            const tx = await contract.methods.addToWhitelist(address);
            const transactionReceipt = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);
    
            return transactionReceipt;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    removeFromWhitelist = async(address: string, signerAddress : string, signerPrivateKey: string) : Promise<TransactionReceipt> => {
        try {
            const tx = await contract.methods.removeFromWhitelist(address);
            const transactionReceipt = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);
    
            return transactionReceipt;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

}

export default Whitelist;