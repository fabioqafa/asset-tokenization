import {contract, web3, networkId} from "./1.ContractProvider";
import executeTransaction from "../utils/ExeTrnx";
import {TransactionReceipt} from "web3-core";


class SmartContractData {

    getDecimals = async() : Promise<number> => {
        const decimals = await contract.methods.getDecimals().call();

        return decimals;
    }

    pause = async(signerAddress : string, signerPrivateKey : string) : Promise<TransactionReceipt> => {
        const tx = await contract.methods.pause();
        const transactionReceipt = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);

        return transactionReceipt;
    }

    unpause = async(signerAddress : string, signerPrivateKey : string) : Promise<TransactionReceipt> => {
        const tx = await contract.methods.unpause();
        const transactionReceipt = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);

        return transactionReceipt;
    }

    isPaused = async() : Promise<boolean> => {
        const result = await contract.methods.paused().call();

        return result;
    }

}

export default SmartContractData;