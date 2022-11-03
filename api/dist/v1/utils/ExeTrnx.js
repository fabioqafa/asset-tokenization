"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const executeTransaction = async (tx, web3, contract, networkId, signerAddress, signerPrivateKey) => {
    try {
        const gas = await tx.estimateGas({ from: signerAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(signerAddress);
        const signedTx = await web3.eth.accounts.signTransaction({
            to: contract.options.address,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: networkId
        }, signerPrivateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return receipt;
    }
    catch (error) {
        console.error(error);
        throw { error: "Smart contract error" };
    }
};
exports.default = executeTransaction;
//# sourceMappingURL=ExeTrnx.js.map