import {contract, web3, networkId} from "./1.ContractProvider";
import executeTransaction from "../utils/ExeTrnx";


class SmartContractData {

    getDecimals = async() : Promise<number> => {
        const decimals = await contract.methods.getDecimals().call();

        return decimals;
    }

    pause = async(signerAddress : string, signerPrivateKey : string) : Promise<string> => {
        const tx = await contract.methods.pause();
        const transactionHash = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);

        return transactionHash;
    }

    unpause = async(signerAddress : string, signerPrivateKey : string) : Promise<string> => {
        const tx = await contract.methods.unpause();
        const transactionHash = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);

        return transactionHash;
    }

    isPaused = async() : Promise<boolean> => {
        const result = await contract.methods.paused().call();

        return result;
    }

}

export default SmartContractData;