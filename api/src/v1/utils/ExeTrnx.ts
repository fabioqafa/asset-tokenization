import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {TransactionReceipt} from "web3-core";

const executeTransaction = async(tx: any, web3: Web3, contract: Contract, networkId: number, signerAddress: string, signerPrivateKey: string) : Promise<TransactionReceipt> => {
    try {const gas = await tx.estimateGas({from: signerAddress});
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(signerAddress);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contract.options.address,
                data,
                gas,
                gasPrice,
                nonce,
                chainId: networkId
            },
            signerPrivateKey
        );
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string);

        return receipt;
    } catch (err) {console.log(err); return err;}
}

export default executeTransaction;