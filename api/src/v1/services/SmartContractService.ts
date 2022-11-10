import {contract, web3, networkId} from "./1.ContractProvider";
import executeTransaction from "../utils/ExeTrnx";
import {TransactionReceipt} from "web3-core";


class SmartContractData {

    getDecimals = async() : Promise<number> => {
        try {
            const decimals = await contract.methods.getDecimals().call();
    
            return decimals;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    pause = async(signerAddress : string, signerPrivateKey : string) : Promise<TransactionReceipt> => {
        try {
            const tx = await contract.methods.pause();
            const transactionReceipt = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);
    
            return transactionReceipt;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

    unpause = async(signerAddress : string, signerPrivateKey : string) : Promise<TransactionReceipt> => {
        try {
            const tx = await contract.methods.unpause();
            const transactionReceipt = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);
    
            return transactionReceipt;
            
        } catch (error) {
            console.error(error); throw error;    
        }
    }

    isPaused = async() : Promise<boolean> => {
        try {
            const result = await contract.methods.paused().call();
    
            return result;
            
        } catch (error) {
            console.error(error); throw error;
        }
    }

}

export default SmartContractData;