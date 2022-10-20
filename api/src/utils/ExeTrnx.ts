import Web3 from "web3";
import {Contract} from 'web3-eth-contract';

const executeTransaction = async(tx: any, web3: Web3, contract: Contract, networkId: number, address: string, privateKey: string) : Promise<string> => {
    const gas = await tx.estimateGas({from: address});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: contract.options.address,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: networkId
        },
        privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string);

    return receipt.transactionHash;
}

export default executeTransaction;