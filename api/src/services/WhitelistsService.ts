import executeTransaction from "../utils/ExeTrnx";
import {web3, contract, networkId} from "../services/ContractProvider";

class Whitelist {
    
    addToWhitelist = async(address: string, signerAddress :string ,signerPrivateKey: string) : Promise<string> => {
        const tx = await contract.methods.addToWhitelist(address);
        const transactionHash = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);

        return transactionHash;
    }

    removeFromWhitelist = async(address: string, signerAddress : string, signerPrivateKey: string) : Promise<string> => {
        const tx = await contract.methods.removeFromWhitelist(address);
        const transactionHash = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);

        return transactionHash;
    }

}

export default Whitelist;