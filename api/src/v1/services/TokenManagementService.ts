import {web3, contract, networkId} from "./1.ContractProvider";
import executeTransaction from "../utils/ExeTrnx";
import {TransactionReceipt} from "web3-core";

class TokenManagementService {

    issueTokens = async(id: number, amount: number, signerAddress : string, signerPrivateKey : string) : Promise<TransactionReceipt> => {
        try {
            const tx = await contract.methods.mint(id, amount, "0x00");
            const transactionReceipt = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);
    
            return transactionReceipt;

        } catch (error) {
            console.error(error); throw error;
        }
        
    }

    transferTokens = async(from : string, to : string, id: number, amount: number, signerAddress : string, signerPrivateKey : string) : Promise<TransactionReceipt> => {
        try {
            const tx = await contract.methods.safeTransferFrom(from, to, id, amount, "0x00");
            const transactionReceipt = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);

            return transactionReceipt;

        } catch(error) {
            console.error(error); throw error;
        }
    }
}

export default TokenManagementService;