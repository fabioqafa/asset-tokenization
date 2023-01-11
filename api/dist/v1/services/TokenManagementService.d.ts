import { TransactionReceipt } from "web3-core";
declare class TokenManagementService {
    issueTokens: (id: number, amount: number, signerAddress: string, signerPrivateKey: string) => Promise<TransactionReceipt>;
    transferTokens: (from: string, to: string, id: number, amount: number, signerAddress: string, signerPrivateKey: string) => Promise<TransactionReceipt>;
}
export default TokenManagementService;
//# sourceMappingURL=TokenManagementService.d.ts.map