import { Account } from "web3-core";
declare class AccountsService {
    createAccount: () => Promise<Account>;
    getBalance: (id: number, address: string) => Promise<number>;
    hasRole: (role: string, address: string) => Promise<boolean>;
    isWhitelisted: (address: string) => Promise<boolean>;
}
export default AccountsService;
//# sourceMappingURL=AccountsService.d.ts.map