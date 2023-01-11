import { Users } from "@prisma/client";
declare class UsersService {
    getAllUsers: () => Promise<Users[]>;
    getUsersByTenantId: (tenantId: string) => Promise<Users[]>;
    getUser: (username: string) => Promise<Users | null>;
    signUp: (email: string, username: string, password: string, tenantId: string) => Promise<Users>;
    logIn: (username: string, password: string) => Promise<string>;
}
export default UsersService;
//# sourceMappingURL=UsersService.d.ts.map