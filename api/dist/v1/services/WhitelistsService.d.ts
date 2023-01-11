import { TransactionReceipt } from "web3-core";
declare class Whitelist {
    addToWhitelist: (address: string, signerAddress: string, signerPrivateKey: string) => Promise<TransactionReceipt>;
    removeFromWhitelist: (address: string, signerAddress: string, signerPrivateKey: string) => Promise<TransactionReceipt>;
}
export default Whitelist;
//# sourceMappingURL=WhitelistsService.d.ts.map