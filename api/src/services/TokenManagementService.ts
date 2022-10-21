import {web3, contract, networkId} from "./1.ContractProvider";
import executeTransaction from "../utils/ExeTrnx";

class TokenManagementService {

    issueTokens = async(id: number, amount: number, signerAddress : string, signerPrivateKey : string) : Promise<string> => {
        const tx = await contract.methods.mint(id, amount, "0x00");
        const transactionHash = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);

        return transactionHash;
    }

    transferTokens = async(from : string, to : string, id: number, amount: number, signerAddress : string, signerPrivateKey : string) : Promise<string> => {
        const tx = await contract.methods.safeTransferFrom(from, to, id, amount, "0x00");
        const transactionHash = await executeTransaction(tx, web3, contract, networkId, signerAddress, signerPrivateKey);

        return transactionHash;
    }
}

export default TokenManagementService;