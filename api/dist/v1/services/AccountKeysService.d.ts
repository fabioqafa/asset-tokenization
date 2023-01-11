import { AccountKeys } from "@prisma/client";
declare class AccountKeysService {
    getAllAccountKeys: () => Promise<any[]>;
    getUserAccountKeys: (username: string) => Promise<AccountKeys>;
    createAccountKey: (publicKey: string, privateKey: string, userId: string) => Promise<AccountKeys>;
}
export default AccountKeysService;
//# sourceMappingURL=AccountKeysService.d.ts.map