import { TransactionReceipt } from "web3-core";
declare class SmartContractData {
    getDecimals: () => Promise<number>;
    pause: (signerAddress: string, signerPrivateKey: string) => Promise<TransactionReceipt>;
    unpause: (signerAddress: string, signerPrivateKey: string) => Promise<TransactionReceipt>;
    isPaused: () => Promise<boolean>;
}
export default SmartContractData;
//# sourceMappingURL=SmartContractService.d.ts.map