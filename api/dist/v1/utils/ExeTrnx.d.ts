import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { TransactionReceipt } from "web3-core";
declare const executeTransaction: (tx: any, web3: Web3, contract: Contract, networkId: number, signerAddress: string, signerPrivateKey: string) => Promise<TransactionReceipt>;
export default executeTransaction;
//# sourceMappingURL=ExeTrnx.d.ts.map